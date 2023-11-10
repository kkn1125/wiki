import Page from "@/entity/page";
import Navigator from "@/module/navigator";
import { TITLE_3 } from "@/util/global";
import { classes, timeFormat } from "@/util/tool";

export const wiki = new Page("wiki", "/wiki/");
wiki.created_at = new Date(2023, 10, 8);
wiki.content = () => {
  const page = +location.hash?.slice(1) || 1;
  return Page.Layout`

<div class="section">
    <h3 class="${classes(TITLE_3)}">Categories</h3>
    <div class="keyword-container">
      ${[...new Set(wiki.wikis)]
        .map((child) => `<div class='category-badge'>${child.category}</div>`)
        .join("")}
    </div>
    <!-- Add more categories here -->
</div>
<div class="section">
    <h3 class="${classes(TITLE_3)}">Recently Registered Wikis</h3>
    <ul>
        ${wiki.wikis
          .slice(0, 5)
          .map(
            (child) =>
              `<li>
            <a href='javascript:void(0)' ${Navigator.htmlTo(
              child.parent.path + child.path
            )}>${child.name}</a>, ${child.author}, ${timeFormat(
                "YYYY-MM-dd HH:mm",
                child.created_at
              )}
          </li>`
          )
          .join("")}
    </ul>
</div>
<div class="section">
    <h3 class="${classes(TITLE_3)}">All Wikis</h3>
    <ul>
        ${wiki.wikis
          .slice((page - 1) * 5, page * 5)
          .map(
            (child) =>
              `<li>
              <a href='javascript:void(0)' ${Navigator.htmlTo(
                child.parent.path + child.path
              )}>${child.name}</a>, ${child.author}, ${timeFormat(
                "YYYY-MM-dd HH:mm",
                child.created_at
              )}
            </li>`
          )
          .join("")}
        <!-- Display paginated list of wikis here -->
    </ul>
    <div class="pagination">
        ${new Array(Math.ceil(wiki.wikis.length / 5))
          .fill(null)
          .map(
            (child, index) =>
              `<button data-page="${index + 1}" ${Navigator.htmlTo(
                `#${index + 1}`
              )}>${index + 1}</button>`
          )
          .join("")}
    </div>
</div>
`.trim();
};
