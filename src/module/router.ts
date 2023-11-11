import Page from "@/entity/page";
import { notFoundPage } from "@/pages/notfound";
import { cleanSlash } from "@/util/tool";

export default class Router {
  pathManager: Map<string, Page> = new Map();
  nameManager: Map<string, Page> = new Map();
  notFoundPage: Page = notFoundPage;

  constructor() {
    this.route(this.notFoundPage);
  }

  routeList() {
    const origin = [...this.pathManager.keys()];
    const wikis =
      this.pathManager
        .get("/wiki/")
        ?.wikis.map((wiki) => cleanSlash(wiki.parent.path + wiki.path)) || [];
    return origin.concat(wikis);
  }

  printTree() {
    console.log(this.routeList());
  }

  route(page: Page) {
    page.router = this;
    this.pathManager.set(page.path, page);
    this.nameManager.set(page.name, page);
  }

  renderByName(name: string) {
    const page = this.nameManager.get(name);
    return page;
  }
  renderByPath(path: string) {
    const replacePaths = cleanSlash(path);
    let page: Page | undefined = undefined;

    if (replacePaths.startsWith("/wiki/") && replacePaths !== "/wiki/") {
      const wiki = this.pathManager.get("/wiki/");
      page = wiki?.wikis.find((child) => child.path === replacePaths.slice(5));
    } else {
      page = this.pathManager.get(replacePaths);
    }
    if (page) {
      return page;
    } else {
      return this.notFoundPage;
    }
  }
}
