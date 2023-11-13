import Router from "@/module/router";
import { WIKI } from "@/util/global";

export default class BasePage {
  published: boolean;
  name: string;
  path: string;
  global: string = "";
  created_at!: Date;
  updated_at!: Date;
  author: string = WIKI.AUTHOR as string;
  router!: Router;

  constructor(name: BasePage);
  constructor(name: string, path: string);
  constructor(nameOrPage: string | BasePage, path?: string) {
    if (nameOrPage instanceof BasePage) {
      this.name = nameOrPage.name;
      this.path = nameOrPage.path;
    } else {
      this.name = nameOrPage;
      this.path = path;
    }

    /* global buttom remote controller */
    // this.setGlobal(globalRemoteController());
  }

  setGlobal(content: string) {
    this.global = content;
  }

  static Layout(contents: TemplateStringsArray, ...rest: any[]) {
    const contentList = [...contents];
    const restList = [...rest];

    let temp = "";
    while (contentList.length > 0 || restList.length > 0) {
      temp += contentList.shift() || "";
      temp += restList.shift() || "";
    }

    return `
    <main class="main-content">
      <!-- Top Fade Out Effect -->
      <div class="fade-out-top"></div>
      <div class="wiki-book">
        ${temp}
        <div class="mb-10"></div>
      </div>
      <!-- Bottom Fade Out Effect -->
      <div class="fade-out-bottom"></div>
    </main>`;
  }
}
