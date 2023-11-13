import Page from "./entity/page";
import Wiki from "./entity/wiki";
import Navigator from "./module/navigator";
import Router from "./module/router";

declare global {
  interface Window {
    wiki: {
      navigator: Navigator;
      router: Router;
    };
  }
}

declare interface OriginPost {
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
}

type Link = {
  name: string;
  path: string;
  target: string;
};

type OriginLink = {
  name: string;
  link: string;
};