import Page from "@/entity/page";
import Wiki from "@/entity/wiki";
import { TITLE_1, TITLE_3 } from "@/util/global";
import { classes, htmlTo, timeFormat } from "@/util/tool";

const PAGE_AMOUNT = 5;

export const wiki = new Page("wiki", "/wiki/");
wiki.useRerender = true;
wiki.props(() => {
  return {
    page: +location.hash?.slice(1) || 1,
  };
});
wiki.created_at = new Date(2023, 10, 8);
wiki.content = () => {
  const wikiList = wiki.wikis.toSorted((a, b) =>
    a.created_at < b.created_at ? 1 : -1
  );

  const categories = wiki.wikis.reduce((acc: Wiki[], cur) => {
    if (acc.every((wk) => wk.category !== cur.category)) {
      acc.push(cur);
    }
    return acc.sort((a, b) => a.category.localeCompare(b.category));
  }, []);

  const pageList = wikiList.slice(
    (wiki.pageProps.page - 1) * PAGE_AMOUNT,
    wiki.pageProps.page * PAGE_AMOUNT
  );

  return Page.Layout`
<div class="section">
    <h1 class="${classes(TITLE_1)}">Categories</h1>
    <div class="keyword-container">
      ${categories
        .map((child) => `<div class='category-badge'>${child.category}</div>`)
        .join("")}
    </div>
    <!-- Add more categories here -->
</div>
<div class="section">
    <h3 class="${classes(TITLE_3)}">Recently Registered Wikis</h3>
    ${wikiList
      .slice(0, 5)
      .map((child) => Wiki.ListItemComponent(child))
      .join("")}
   
</div>
<div class="section" re-render>
    <h3 class="${classes(TITLE_3)}">All Wikis</h3>
      ${pageList
        .concat(new Array(PAGE_AMOUNT - pageList.length).fill(null))
        .map((child) => Wiki.ListItemComponent(child))
        .join("")}
        <!-- Display paginated list of wikis here -->
    <div class="pagination">
        ${new Array(Math.ceil(wiki.wikis.length / PAGE_AMOUNT))
          .fill(null)
          .map(
            (child, index) =>
              `<button data-page="${index + 1}" ${htmlTo(`#${index + 1}`)}>${
                index + 1
              }</button>`
          )
          .join("")}
    </div>
</div>
`.trim();
};
