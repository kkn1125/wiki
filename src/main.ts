import "@/assets/global.scss";
import Navigator from "./module/navigator";
import Router from "./module/router";
import { home } from "./pages/home";
import { notFoundPage } from "./pages/notfound";
import { about } from "./pages/about";

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
router.route(about);
router.route(notFoundPage);
console.log(router);

const navigator = new Navigator(router);

window.wiki = {
  navigator,
  router,
};
