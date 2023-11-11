/* custom wiki module */
import Navigator from "./module/navigator";
import Router from "./module/router";
import { home } from "./pages/home";
import { notFoundPage } from "./pages/notfound";
import { about } from "./pages/about";
import { wiki } from "./pages/wiki";
import { WebRTC } from "./pages/wikis/WebRTC";
import { BinarySearch } from "./pages/wikis/BinarySearch";

/* prismjs styles */
import "prismjs/plugins/line-numbers/prism-line-numbers.min.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight.min.css";

/* prismjs language pack */
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
import { search } from "./pages/search";
import { Bfs } from "./pages/wikis/BFS";
import { Api } from "./pages/wikis/Api";
import { Alu } from "./pages/wikis/Alu";
import { OsBase } from "./pages/migration/Os.Base";
import OsAdvancedComputerArchitecture from "./pages/migration/OsAdvancedComputerArchitecture";
import Wiki from "./entity/wiki";
import OriginalPost from "./entity/origin.post";
import OsAvoidWastingMemory from "./pages/migration/OsAvoidWastingMemory";
import OsClassicalSynchronizationProblem01 from "./pages/migration/OsClassicalSynchronizationProblem01";

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
router.route(search);
router.route(wiki);
router.route(about);
router.route(notFoundPage);

// wiki
wiki.addWiki(WebRTC);
wiki.addWiki(BinarySearch);
wiki.addWiki(Bfs);
wiki.addWiki(Api);
wiki.addWiki(Alu);
wiki.addWiki(OsBase);
// wiki.addWiki();
wiki.addWiki(
  new OriginalPost(
    OsAdvancedComputerArchitecture as unknown as OriginalPost
  ).convertNewPage("/os-advanced-computer-architecture/")
);
wiki.addWiki(
  new OriginalPost(
    OsAvoidWastingMemory as unknown as OriginalPost
  ).convertNewPage("/os-avoid-wasting-memory/")
);
wiki.addWiki(
  new OriginalPost(
    OsClassicalSynchronizationProblem01 as unknown as OriginalPost
  ).convertNewPage("/os-classical-synchronization-problem01/")
);

const navigator = new Navigator(router);

window.wiki = {
  navigator,
  router,
};
