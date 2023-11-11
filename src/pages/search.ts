import Page from "@/entity/page";
import { TITLE_3 } from "@/util/global";
import { classes } from "@/util/tool";

export const search = new Page("search", "/search/");
search.created_at = new Date("2023-11-10 15:52:39");
search.content = () =>
  Page.Layout`
<div class="section">
  <h3 class="${classes(TITLE_3)}">Search Wikis</h3>
  <input type="text" id="searchWiki" placeholder="Search Wikis">
  <div class="search-results" id="searchResults">
      <!-- Search results will be displayed here -->
  </div>
</div>
`.trim();
