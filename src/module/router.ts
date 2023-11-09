import Page from "@/entity/page";
import Placeholder from "@/entity/placeholder";
import { notFoundPage } from "@/pages/notfound";
import { APP } from "@/util/global";
import Navigator from "./navigator";
import { globalRemoteController } from "@/util/tool";

export default class Router {
  pathManager: Map<string, Page> = new Map();
  nameManager: Map<string, Page> = new Map();
  notFoundPage: Page = notFoundPage;

  constructor() {
    this.route(this.notFoundPage);
  }

  route(page: Page) {
    page.router = this;
    this.pathManager.set(page.path, page);
    this.nameManager.set(page.name, page);
  }

  renderByName(name: string) {
    const page = this.nameManager.get(name);
    // if (page) {
    //   this.clearApp();
    //   APP.innerHTML = page.render();
    // } else {
    //   APP.innerHTML = this.notFoundPage.render();
    // }
    if (page) {
      this.clearApp();
      const { body } = new DOMParser().parseFromString(
        page.render() + page.global,
        "text/html"
      );
      APP.append(...[...body.children]);
    } else {
      const { body } = new DOMParser().parseFromString(
        this.notFoundPage.render(),
        "text/html"
      );
      APP.append(...[...body.children]);
    }
    document.querySelectorAll("img").forEach((img) => {
      new ResizeObserver(Placeholder.getImageUrl.bind(img)).observe(img);
    });
  }
  renderByPath(path: string) {
    let page: Page | undefined = undefined;
    if (path.startsWith("/wiki") && path !== "/wiki") {
      const wiki = this.pathManager.get("/wiki");
      page = wiki?.wikis.find((child) => child.path === path.slice(5));
      // page = this.pathManager.get(path);
    } else {
      page = this.pathManager.get(path);
    }
    if (page) {
      this.clearApp();
      const { body } = new DOMParser().parseFromString(
        page.render() + page.global,
        "text/html"
      );
      APP.append(...[...body.children]);
    } else {
      const { body } = new DOMParser().parseFromString(
        this.notFoundPage.render(),
        "text/html"
      );
      APP.append(...[...body.children]);
    }
    document.querySelectorAll("img").forEach((img) => {
      new ResizeObserver(Placeholder.getImageUrl.bind(img)).observe(img);
    });
  }

  private clearApp() {
    APP.innerHTML = "";
  }
}
