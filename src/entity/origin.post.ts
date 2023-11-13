import { OriginLink, OriginPost } from "@/types";

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
  ref: OriginLink[];

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
}
