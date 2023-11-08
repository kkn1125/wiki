import Page from "@/entity/page";
import Router from "./router";

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
    window.addEventListener(
      "locationchange",
      this.detectPathAndReplaceCurrentPage.bind(this)
    );
  }

  to(path: string) {
    window.history.pushState({}, "", path);
  }

  detectPathAndReplaceCurrentPage() {
    const page = this.findPage(location.pathname);
    console.log(page, location.pathname);
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
    if (page) return page;
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
      this.router.renderByPath(this.currentPage.path);
    } else {
      this.router.renderByName("404");
    }
  }
}
