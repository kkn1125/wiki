import Router from "@/module/router";
import { WIKI } from "@/util/global";
import { globalRemoteController } from "@/util/tool";

export default class BasePage {
  name: string;
  path: string;
  global: string = "";
  created_at!: Date;
  author: string = WIKI.AUTHOR as string;
  router!: Router;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;

    this.setGlobal(globalRemoteController());
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
      </div>
      <!-- Bottom Fade Out Effect -->
      <div class="fade-out-bottom"></div>
    </main>`;
  }
}
