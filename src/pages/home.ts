import Page from "@/entity/page";
import Placeholder from "@/entity/placeholder";
import { BTN_PRI_5, TITLE_1, TITLE_2, TITLE_3, WIKI } from "@/util/global";
import { classes } from "@/util/tool";

export const home = new Page("home", "/");
home.setGlobal(`
<div class="bottom-panel">
  <div class="panel-item">1</div>
  <div class="panel-item">2</div>
  <div class="panel-item">3</div>
</div>
`);
home.content = `
<main>
  <div class="page-wrap">
    <h1 class="${classes(TITLE_2, "text-gray")}"><span class="${classes(
  "capitailze"
)}">wiki</span><span class="${classes()}">mson</span></h1>
      ${new Placeholder(0, 300).toHTML()}
      ${new Placeholder(300, 300).toHTML()}
    <button class="${classes(
      BTN_PRI_5
    )}" onclick="window.wiki.navigator.to('/about')">about</button>
    <button class="btn btn-5" onclick="window.wiki.navigator.to('/test')">이동 테스트</button>
  </div>
</main>
`.trim();
