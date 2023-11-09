import "@/assets/global.scss";
import Navigator from "./module/navigator";
import Router from "./module/router";
import { home } from "./pages/home";
import { notFoundPage } from "./pages/notfound";
import { about } from "./pages/about";
import { wiki } from "./pages/wiki";
import { test } from "./pages/wikis/test";

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
wiki.addWiki(test);

const navigator = new Navigator(router);

window.wiki = {
  navigator,
  router,
};
