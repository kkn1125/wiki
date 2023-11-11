import { Link, OriginPost } from "@/types";
import Wiki from "./wiki";

export default class OriginalPost {
  published: boolean;
  title: string;
  modified: string;
  done: boolean;
  tags: string[];
  categories: string[];
  authors: string[];
  wrote: string;
  toc: boolean;
  md: boolean;
  content: string[];
  ref: Link[];

  constructor(private original: OriginPost) {
    const {
      published,
      title,
      modified,
      done,
      tags,
      ref,
      categories,
      authors,
      wrote,
      toc,
      md,
      content,
    } = original;

    published && (this.published = published);
    title && (this.title = title);
    modified && (this.modified = modified);
    done && (this.done = done);
    tags && (this.tags = tags);
    ref && (this.ref = ref);
    categories && (this.categories = categories);
    authors && (this.authors = authors);
    wrote && (this.wrote = wrote);
    toc && (this.toc = toc);
    md && (this.md = md);
    content && (this.content = content);
  }

  convertNewPage(path: string) {
    const wiki = new Wiki(this.title, path);
    wiki.category = this.categories.pop();
    wiki.tags = this.tags;
    wiki.cover = "";
    wiki.links = this.ref || [];
    wiki.content = () => Wiki.Layout.bind(wiki)`${this.content.pop()}`;
    wiki.published = this.published;
    wiki.name = this.title;
    wiki.path = path;
    wiki.created_at = new Date(this.wrote);
    wiki.updated_at = new Date(this.modified);
    wiki.author = this.authors.pop();
    return wiki;
  }
}
