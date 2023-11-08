import Page from "@/entity/page";
import { BTN_PRI_5, TITLE_1, TITLE_2 } from "@/util/global";
import { classes } from "@/util/tool";

export const home = new Page("home", "/");

home.content = `
<main>
  <h1 class="${classes(TITLE_2)}">home page</h1>

  <button class="${classes(
    BTN_PRI_5
  )}" onclick="window.wiki.navigator.to('/about')">about</button>
  <button class="btn btn-5" onclick="window.wiki.navigator.to('/test')">이동 테스트</button>
</main>
`.trim();
