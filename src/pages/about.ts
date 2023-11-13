import Page from "@/entity/page";
import { TITLE_1, TITLE_2, TITLE_3, WIKI } from "@/util/global";
import { classes } from "@/util/tool";

export const about = new Page("about", "/about/");
about.created_at = new Date(2023, 10, 8);
about.content = () =>
  Page.Layout`
<div class="section">
  <h1 class="${classes(TITLE_1)}">About</h1>
  <p>Name: ${WIKI.AUTHOR}</p>
  <a href="mailto:${WIKI.EMAIL}" clickable>Email: ${WIKI.EMAIL}</a>
  <p>Current Version: ${WIKI.VERSION}</p>
</div>
<div class="section">
  <h3 class="${classes(TITLE_3)}">Purpose</h3>
  <p>개인 위키 페이지입니다. 정리하는 모든 정보는 직접 작성되었습니다. 이미지는 직접 제작하는 경우를 제외하고는 캠션으로 출처를 남깁니다.</p>
  <p>위키 페이지의 UI는 ChatGPT로 디자인 되었습니다.</p>
</div>
`.trim();
