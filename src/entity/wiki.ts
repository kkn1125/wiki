import cc from "@/assets/svg/cc";
import { Link, OriginPost } from "@/types";
import { TITLE_2, TITLE_4 } from "@/util/global";
import { classes, getLocaleTime, htmlTo, timeFormat } from "@/util/tool";
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItMultimdTable from "markdown-it-multimd-table";
import Page from "@/entity/page";
import OriginalPost from "./origin.post";

const mdParser = new MarkdownIt();

// mdParser.use(markdownCustomBlock, {
//   img(raw) {
//     console.log(123);
//     const [index, alt, width, url] = raw.split("#");
//     return `<figure id="fig${index}">
//   <img width='${width}' src="${url}"/>
//   <figcaption>Fig ${index}: ${alt}</figcaption>
// </figure>`;
//   },
// });
mdParser.renderer.rules.image = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];
  token.attrSet("loading", "lazy");
  return `<figure class='img-data d-flex flex-column'>
  ${slf.renderToken(tokens, idx, options)}
  <figcaption>${tokens[0].content}</figcaption>
</figure>`;
};

mdParser.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: "{",
  rightDelimiter: "}",
  allowedAttributes: [], // empty array = all attributes are allowed
});
mdParser.use(markdownItMultimdTable, {
  multiline: false,
  rowspan: true,
  colspan: true,
  headerless: false,
  multibody: true,
  aotolabel: true,
});

export default class Wiki extends Page {
  category: string = "";
  tags: string[] = [];
  cover: string = "";
  parent!: Page;
  links: Link[] = [];

  constructor(name: string, path: string);
  constructor(name: string, path: string, category: string, tags: string[]);
  constructor(
    nameOrWiki: string,
    path?: string,
    category?: string,
    tags?: string[]
  ) {
    super(nameOrWiki, path);
    category && (this.category = category);
    tags && (this.tags = tags);
  }

  setParent(parent: Page) {
    this.parent = parent;
  }

  addTag(tag: string) {
    this.tags.push(tag);
  }
  addLink(link: Link) {
    this.links.push(link);
  }

  setCategory(category: string) {
    this.category = category;
  }

  setCover(cover: string) {
    this.cover = cover;
  }

  static Layout(this: Wiki, contents: TemplateStringsArray, ...rest: any[]) {
    const contentList = [...contents];
    const restList = [...rest];

    let temp = "";
    while (contentList.length > 0 || restList.length > 0) {
      temp += contentList.shift() || "";
      temp += restList.shift() || "";
    }

    return `
    <main class="main-content">
      <!-- Top Fade Out Effect -->
      <div class="fade-out-top"></div>
      <div class="wiki-book scrollable-content">
        <div class="section">
          <h2 class="${classes(TITLE_2)}">${this.name}</h2>
          <p>Author: ${this.author}</p>
          <p>Creation Time: ${getLocaleTime(this.created_at)}</p>
          <p class="keyword-container align-items-center">
            category <span class="category-badge">${this.category}</span>
          </p>
          <p class="keyword-container align-items-center">
            tags
            ${this.tags
              .map((tag) => `<span class="category-badge">${tag}</span>`)
              .join("")}
          </p>
        </div>
        <div class="section wiki-content">
        ${mdParser.render(temp)}
        </div>
        <div class="section">
          <h4 class="${classes(TITLE_4)}">Attached Links</h4>
          <ul>
              ${this.links
                .map(
                  (link) =>
                    `<li>
                  <a href='${link.path}' ${
                      link.target && `target="${link.target}"`
                    }>${link.name}</a>
                </li>`
                )
                .join("")}
              <!-- Add your links here -->
          </ul>
        </div>
        <div class="section">
          ${cc}
        </div>

      </div>
      <div id="toc"></div>
      <!-- Bottom Fade Out Effect -->
      <div class="fade-out-bottom"></div>
    </main>`;
  }

  static convertNewPage(originWiki: OriginPost, path: string) {
    const orginalWiki = new OriginalPost(originWiki);
    const wiki = new Wiki(orginalWiki.title, path);
    wiki.category = orginalWiki.categories.pop();
    wiki.tags = orginalWiki.tags;
    wiki.cover = "";
    wiki.links = (orginalWiki.ref.map(({ name, link }) => ({
      name,
      path: link,
      taget: "_blank",
    })) || []) as unknown as Link[];
    wiki.content = () =>
      Wiki.Layout.bind(wiki)`${orginalWiki.content.join("")}`;
    wiki.published = orginalWiki.published;
    wiki.name = orginalWiki.title;
    wiki.path = path;
    wiki.created_at = new Date(orginalWiki.wrote);
    wiki.updated_at = new Date(orginalWiki.modified);
    wiki.author = orginalWiki.authors.pop();
    return wiki;
  }

  static ListItemComponent(child: Wiki) {
    if (child !== null) {
      return `<div clickable ${htmlTo(
        child.parent.path + child.path
      )} class="wiki-entry">
        <div class="wiki-title fw-700">${child.name}</div>
        <p class="wiki-author">작성자: ${child.author}</p>
        <p class="wiki-time">작성시간: ${timeFormat(
          "YYYY-MM-dd HH:mm",
          child.created_at
        )}</p>
      </div>`;
    } else {
      return `<div clickable class="wiki-entry">
        <div dummy class="wiki-title fw-700"></div>
        <p dummy class="wiki-author"></p>
        <p dummy class="wiki-time"></p>
      </div>`;
    }
  }
}
