import Page from "@/entity/page";
import { TITLE_2 } from "@/util/global";
import { classes } from "@/util/tool";

export const search = new Page("search", "/search/");
search.created_at = new Date("2023-11-10 15:52:39");
search.content = () =>
  Page.Layout`
<div class="section">
  <h2 class="${classes(TITLE_2)}">Search Wikis</h2>
  <input type="text" id="searchWiki" placeholder="Search Wikis">
  <div class="search-results" id="searchResults">
      <!-- Search results will be displayed here -->
  </div>
</div>
`.trim();
