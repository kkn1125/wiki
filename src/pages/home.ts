import Page from "@/entity/page";
import Placeholder from "@/entity/placeholder";
import { BTN_PRI_5, TITLE_1, TITLE_2, TITLE_3, WIKI } from "@/util/global";
import { classes, getLocaleTime } from "@/util/tool";

export const home = new Page("home", "/");
home.created_at = new Date(2023, 10, 8);
home.content = () =>
  Page.Layout`
<div class="section">
  <h1 class="${classes(TITLE_1)}">
    <span class="${classes("capitailze")}">wiki</span>
    <span class="${classes()}">mson</span>
  </h1>
</div>
${new Placeholder(0, 300).toHTML()}

<div class="section">
  <h2 class="${classes(TITLE_2)}">Most Recent Wiki</h2>
  ${home.router.pathManager
    .get("/wiki")
    ?.wikis.slice(0, 5)
    .map(
      (child) =>
        `<div>
      <p>Title: ${child.name}</p>
      <p>Author: ${child.author}</p>
      <p>Creation Time: ${getLocaleTime(child.created_at)}</p>
    </div>`
    )}
</div>
<div class="section">
  <h2 class="${classes(TITLE_2)}">Keywords</h2>
  <div class="keyword-container">
      <!-- Keywords will be dynamically added here -->
  </div>
</div>
<div class="section">
  <h2 class="${classes(TITLE_2)}">Wiki Page Info</h2>
  <p>Current Version: ${WIKI.VERSION}</p>
  <p>Author: ${WIKI.AUTHOR}</p>
  <p>Purpose: This is a personal wiki page.</p>
</div>
`.trim();
