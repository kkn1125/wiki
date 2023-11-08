import Page from "@/entity/page";
import { BTN_5, TITLE_1, TITLE_2 } from "@/util/global";
import { classes } from "@/util/tool";

export const about = new Page("about", "/about");

about.content = `
<main>
  <h1 class="${classes(TITLE_2)}">about</h1>

  <button class="${classes(
    BTN_5
  )}" onclick="window.wiki.navigator.to('/')">home</button>
  <button class="${classes(
    BTN_5
  )}" onclick="window.wiki.navigator.to('/test')">이동 테스트</button>
</main>
`.trim();
