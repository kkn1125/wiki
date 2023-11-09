import Page from "./page";

export default class Wiki extends Page {
  category: string = "";
  tags: string[] = [];
  cover: string = "";
  parent!: Page;

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

  setCategory(category: string) {
    this.category = category;
  }

  setCover(cover: string) {
    this.cover = cover;
  }
}
