import "@/assets/global.scss";
import Navigator from "./module/navigator";
import Router from "./module/router";
import { home } from "./pages/home";
import { notFoundPage } from "./pages/notfound";
import { about } from "./pages/about";
import { wiki } from "./pages/wiki";
import { WebRTC } from "./pages/wikis/WebRTC";
import { BinarySearch } from "./pages/wikis/binarysearch";

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

const navigator = new Navigator(router);

window.wiki = {
  navigator,
  router,
};
