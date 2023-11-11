import Page from "@/entity/page";
import Router from "./router";
import Wiki from "@/entity/wiki";
import { cleanSlash, getLocaleTime, htmlTo } from "@/util/tool";
import { APP } from "@/util/elements";
import Prism from "prismjs";
import Placeholder from "@/entity/placeholder";

export default class Navigator {
  router: Router;
  history: Page[] = [];
  currentPage!: Page;

  private initialEventListeners() {
    let oldPushState = window.history.pushState;
    window.history.pushState = function pushState(...args) {
      let ret = oldPushState.apply(this, args);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };
    let oldReplaceState = window.history.replaceState;
    window.history.replaceState = function replaceState(...args) {
      let ret = oldReplaceState.apply(this, args);
      window.dispatchEvent(new Event("replacestate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };
    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("locationchange"));
    });
  }

  constructor(router: Router) {
    this.router = router;

    this.initialEventListeners();
    this.detectPathAndReplaceCurrentPage();

    /* location change event */
    window.addEventListener(
      "locationchange",
      this.detectPathAndReplaceCurrentPage.bind(this)
    );

    window.addEventListener("keydown", this.handleExitResults.bind(this));

    /* 검색창 포커스 시 이미 검색한 키워드로 다시 결과창 출력 */
    window.addEventListener("focusin", this.handleFocusSearchInput.bind(this));

    /* 검색창, 결과창 외 클릭 시 결과창 닫기 */
    /* focusout은 사라진 후 링크 클릭되서 시간차로 오작동 */
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));

    /* 검색창 기능 */
    window.addEventListener("keyup", this.handleDisplayResult.bind(this));

    // this.detectHash();
    // window.addEventListener("hashchange", this.detectHash.bind(this));
  }

  private handleExitResults(e: KeyboardEvent) {
    const key = e.key;
    if (key === "Escape") {
      const wikiInput = document.querySelector(
        "#searchWiki"
      ) as HTMLInputElement;
      const results = document.querySelector("#searchResults");
      if (results) {
        wikiInput.blur();
        results.innerHTML = "";
      }
    }
  }

  private handleMouseDown(e: MouseEvent) {
    const inputOrResult = e.target as HTMLInputElement | HTMLDivElement;
    if (
      !(
        inputOrResult.closest("#searchWiki") ||
        inputOrResult.closest("#searchResults")
      )
    ) {
      const results = document.querySelector("#searchResults");
      if (results) results.innerHTML = "";
    }
  }

  // private handleFocusSearchInputOut(e: FocusEvent) {
  //   const target = e.target as HTMLInputElement;
  //   if (target.id === "searchWiki") {
  //     const result = document.querySelector("#searchResults");
  //     if (result) {
  //       result.innerHTML = "";
  //     }
  //   }
  // }

  private handleFocusSearchInput(e: FocusEvent) {
    const target = e.target as HTMLInputElement;
    if (target.id === "searchWiki") {
      this.handleDisplayResult(e as unknown as KeyboardEvent);
    }
  }

  private handleDisplayResult(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    if (target && target.id === "searchWiki") {
      const value = target.value;
      const result = document.querySelector("#searchResults");
      const wiki = this.router.pathManager.get("/wiki/");
      if (wiki) {
        const list = wiki.wikis.filter(
          (child) =>
            value &&
            (child.name.includes(value) ||
              child.path.includes(value) ||
              child.content().includes(value) ||
              child.category.includes(value))
        );
        if (result) {
          result.innerHTML =
            `<span>results: (${list.length})</span>` +
            list
              .map(
                (li) => `
            <span>
            <a href="javascript:void(0);" ${htmlTo(li.parent.path + li.path)}>
              <span>
                ${li.name}
              </span>,
              <span>
                ${li.author}
              </span>,
              <span>
                ${getLocaleTime(li.created_at)}
              </span>
            </a>
            </span>`
              )
              .join("");
        }
      }
    }
  }

  // detectHash() {
  //   const page = +location.hash.slice(1) || 1;
  //   // this.autoRender();
  // }

  to(path: string) {
    window.history.pushState(
      {},
      "",
      cleanSlash(process.env.NODE_ENV === "development" ? path : "/wiki" + path)
    );
  }

  detectPathAndReplaceCurrentPage() {
    const page = this.findPage(
      location.pathname.slice(process.env.NODE_ENV === "development" ? 0 : 5)
    );
    // console.log(page, location.pathname.slice(import.meta.env.DEV ? 0 : 5));
    if (page) {
      this.stackHistory(page);
      this.swapPage(page);

      document
        .querySelectorAll(`[data-btn-path]`)
        .forEach((el) => el.classList.remove("current-page"));
      const pagePath = page instanceof Wiki ? page.parent.path : page.path;
      const btn = document.querySelector(`[data-btn-path="${pagePath}"]`);
      if (btn) {
        btn.classList.add("current-page");
      }
    } else {
      this.stackHistory(this.router.notFoundPage);
      this.swapPage(this.router.notFoundPage);
      // console.log(
      //   "페이지 없음",
      //   location.pathname.slice(import.meta.env.DEV ? 0 : 5)
      // );
    }
  }

  findPage(name: string): Page | null;
  findPage(path: string): Page | null;
  findPage(key: string): Page | null {
    const isPath = key.startsWith("/");
    const page = this.router[isPath ? "pathManager" : "nameManager"].get(key);
    if (page) {
      return page;
    } else if (key.startsWith("/wiki/")) {
      const path = key.slice(5);
      const wiki = this.router.pathManager.get("/wiki/");
      if (wiki) {
        const wikiPage = wiki.wikis.find((child) => child.path === path);
        if (wikiPage) {
          return wikiPage;
        }
      }
    }
    return null;
  }

  setCurrentPage(currentPage: Page) {
    this.currentPage = currentPage;
  }

  stackHistory(page: Page) {
    this.history.push(page);
  }

  swapPage(page: Page) {
    this.setCurrentPage(page);
    this.autoRender();
  }

  autoRender() {
    if (this.currentPage) {
      if (this.currentPage instanceof Wiki) {
        if (this.currentPage.parent) {
          const page = this.router.renderByPath(
            this.currentPage.parent.path + this.currentPage.path
          );
          this.renderView(page);
        }
      } else {
        const page = this.router.renderByPath(this.currentPage.path);
        this.renderView(page);
      }
    } else {
      const page = this.router.renderByName("404");
      this.renderView(page);
    }
  }

  renderView(page: Page) {
    this.clearApp();
    const { body } = new DOMParser().parseFromString(
      page.render() + page.global,
      "text/html"
    );
    APP.append(...[...body.children]);
    document.querySelectorAll("img").forEach((img) => {
      new ResizeObserver(Placeholder.getImageUrl.bind(img)).observe(img);
    });
    Prism.highlightAll();
  }

  private clearApp() {
    APP.innerHTML = "";
  }
}
