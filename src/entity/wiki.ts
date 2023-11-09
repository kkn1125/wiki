import { classes, getLocaleTime } from "@/util/tool";
import Page from "./page";
import { TITLE_2, TITLE_4 } from "@/util/global";

type Link = {
  name: string;
  path: string;
  target: string;
};

export default class Wiki extends Page {
  category: string = "";
  tags: string[] = [];
  cover: string = "";
  parent!: Page;
  links: Link[] = [];

  constructor(name: string, path: string);
  constructor(name: string, path: string, category: string, tags: string[]);
  constructor(name: string, path: string, category?: string, tags?: string[]) {
    super(name, path);
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
          <p>tags: 
            <div class="keyword-container">
            ${this.tags
              .map((tag) => `<span class="category-badge">${tag}</span>`)
              .join("")}</p>
            </div>
        </div>
        ${temp}
        <div class="section">
          <h4 class="${classes(TITLE_4)}">Attached Links</h4>
          <ul>
              ${this.links.map(
                (link) =>
                  `<li>
                  <a href='${link.path}' ${
                    link.target && `target="${link.target}"`
                  }>${link.name}</a>
                </li>`
              )}
              <!-- Add your links here -->
          </ul>
        </div>
      </div>
      <!-- Bottom Fade Out Effect -->
      <div class="fade-out-bottom"></div>
    </main>`;
  }
}
