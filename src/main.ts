import "@/assets/global.scss";
import "@/assets/xonokai.css";

import Navigator from "./module/navigator";
import Router from "./module/router";
import { home } from "./pages/home";
import { notFoundPage } from "./pages/notfound";
import { about } from "./pages/about";
import { wiki } from "./pages/wiki";
import { WebRTC } from "./pages/wikis/WebRTC";
import { BinarySearch } from "./pages/wikis/BinarySearch";

import "prismjs/plugins/line-numbers/prism-line-numbers.min.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight.min.css";
// import "prismjs/plugins/autoloader/prism-autoloader";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";

import Prism from "prismjs";

Prism.manual = true;

declare global {
  interface Window {
    wiki: {
      navigator: Navigator;
      router: Router;
    };
  }
}

const router = new Router();
router.route(home);
router.route(wiki);
router.route(about);
router.route(notFoundPage);

// wiki
wiki.addWiki(WebRTC);
wiki.addWiki(BinarySearch);

router.printTree();

const navigator = new Navigator(router);

window.wiki = {
  navigator,
  router,
};
