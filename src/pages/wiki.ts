import Page from "@/entity/page";
import {
  BTN_5,
  TITLE_1,
  TITLE_2,
  TITLE_3,
  TITLE_4,
  TITLE_5,
} from "@/util/global";
import { classes, getLocaleTime } from "@/util/tool";

export const wiki = new Page("wiki", "/wiki");
wiki.created_at = new Date(2023, 10, 8);
wiki.content = () =>
  Page.Layout`
<div class="section">
    <h2 class="${classes(TITLE_2, "text-gray")}">Search Wikis</h2>
    <input type="text" id="searchWiki" placeholder="Search Wikis">
    <div class="search-results" id="searchResults">
        <!-- Search results will be displayed here -->
    </div>
</div>
<div class="section">
    <h2 class="${classes(TITLE_2, "text-gray")}">Categories</h2>
    ${[...new Set(wiki.wikis)].map(
      (child) => `<div class='category-badge'>${child.category}</div>`
    )}
    <!-- Add more categories here -->
</div>
<div class="section">
    <h2 class="${classes(TITLE_2, "text-gray")}">Recently Registered Wikis</h2>
    <ul>
        ${wiki.wikis.map(
          (child) =>
            `<li>
            <a href='${child.parent.path + child.path}'>${child.name}</a>, ${
              child.author
            }, ${getLocaleTime(child.created_at)}
          </li>`
        )}
    </ul>
</div>
<div class="section">
    <h2 class="${classes(TITLE_2, "text-gray")}">All Wikis</h2>
    <ul>
        ${wiki.wikis.map(
          (child) =>
            `<li>
              <a href='${child.parent.path + child.path}'>${child.name}</a>, ${
              child.author
            }, ${getLocaleTime(child.created_at)}
            </li>`
        )}
        <!-- Display paginated list of wikis here -->
    </ul>
    <div class="pagination">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
    </div>
</div>
`.trim();
