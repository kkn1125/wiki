import Page from "@/entity/page";
import Router from "./router";
import Wiki from "@/entity/wiki";
import { getLocaleTime } from "@/util/tool";

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

    /* 검색창 기능 */
    window.addEventListener("keyup", (e) => {
      const target = e.target as HTMLInputElement;
      if (target && target.id === "searchWiki") {
        const value = target.value;
        const result = document.querySelector("#searchResults");
        const wiki = this.router.pathManager.get("/wiki");
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
            result.innerHTML = list
              .map(
                (li) => `
              <li>
              <a href="${li.parent.path + li.path}">
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
              </li>`
              )
              .join("");
          }
        }
      }
    });

    // this.detectHash();
    // window.addEventListener("hashchange", this.detectHash.bind(this));
  }

  // detectHash() {
  //   const page = +location.hash.slice(1) || 1;
  //   // this.autoRender();
  // }

  to(path: string) {
    window.history.pushState({}, "", path);
  }

  detectPathAndReplaceCurrentPage() {
    const page = this.findPage(location.pathname);
    if (page) {
      this.stackHistory(page);
      this.swapPage(page);
    } else {
      this.stackHistory(this.router.notFoundPage);
      this.swapPage(this.router.notFoundPage);
    }
  }

  findPage(name: string): Page | null;
  findPage(path: string): Page | null;
  findPage(key: string): Page | null {
    const isPath = key.startsWith("/");
    const page = this.router[isPath ? "pathManager" : "nameManager"].get(key);
    if (page) {
      return page;
    } else if (key.startsWith("/wiki")) {
      const path = key.slice(5);
      const wiki = this.router.pathManager.get("/wiki");
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
          this.router.renderByPath(
            this.currentPage.parent.path + this.currentPage.path
          );
        }
      } else {
        this.router.renderByPath(this.currentPage.path);
      }
    } else {
      this.router.renderByName("404");
    }
  }

  static htmlTo(path: string) {
    return `onclick="window.wiki.navigator.to('${path}')"`;
  }
}
