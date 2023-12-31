import Page from "@/entity/page";
import Placeholder from "@/entity/placeholder";
import Wiki from "@/entity/wiki";
import { TITLE_1, TITLE_2, WIKI } from "@/util/global";
import { classes, getLocaleTime, htmlTo, timeFormat } from "@/util/tool";

export const home = new Page("home", "/");
home.created_at = new Date(2023, 10, 8);
home.content = () => {
  const tags = [
    ...new Set(
      home.router.pathManager
        .get("/wiki/")
        ?.wikis.map((wiki) => [wiki.category, ...wiki.tags])
        .flat(1)
    ),
  ];
  return Page.Layout`
<div class="section">
  <h1 class="${classes(TITLE_1)}">
    <span class="${classes("capitailze")}">wiki</span>
  </h1>
  <p>
    기술관련 정보를 정리하는 개인 위키 페이지입니다.
  </p>
  <!--
  ${new Placeholder(0, 300).toHTML()}
  -->
</div>

<div class="section">
  <h2 class="${classes(TITLE_2)}">Most Recent Wiki</h2>
  ${home.router.pathManager
    .get("/wiki/")
    ?.wikis.toSorted((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 5)
    .map((child) => Wiki.ListItemComponent(child))
    .join("<br />")}
</div>
<div class="section">
  <h2 class="${classes(TITLE_2)}">Keywords</h2>
  <div class="keyword-container align-items-center">
      ${tags
        .slice(0)
        .map((str) => `<div class="category-badge">${str}</div>`)
        .join("")}${
    false
      ? `<span title="${tags.slice(10).join(", ")}">+${tags.length - 10}</span>`
      : ""
  }
      <!-- Keywords will be dynamically added here -->
  </div>
</div>
`.trim();
};
