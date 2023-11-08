import Page from "@/entity/page";
import { notFoundPage } from "@/pages/notfound";
import { APP } from "@/util/global";

export default class Router {
  pathManager: Map<string, Page> = new Map();
  nameManager: Map<string, Page> = new Map();
  notFoundPage: Page = notFoundPage;

  constructor() {
    this.route(this.notFoundPage);
  }

  route(page: Page) {
    this.pathManager.set(page.path, page);
    this.nameManager.set(page.name, page);
  }

  renderByName(name: string) {
    const page = this.nameManager.get(name);
    if (page) {
      this.clearApp();
      APP.innerHTML = page.render();
    } else {
      APP.innerHTML = this.notFoundPage.render();
    }
  }
  renderByPath(path: string) {
    const page = this.pathManager.get(path);
    if (page) {
      this.clearApp();
      APP.innerHTML = page.render();
    } else {
      APP.innerHTML = this.notFoundPage.render();
    }
  }

  private clearApp() {
    APP.innerHTML = "";
  }
}
