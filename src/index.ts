/* custom wiki module */
import Navigator from "./module/navigator";
import Router from "./module/router";
import { about } from "./pages/about";
import { home } from "./pages/home";
import { notFoundPage } from "./pages/notfound";
import { wiki } from "./pages/wiki";
import { BinarySearch } from "./pages/wikis/BinarySearch";
import { WebRTC } from "./pages/wikis/WebRTC";

/* prismjs styles */
import "prismjs/plugins/line-highlight/prism-line-highlight.min.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.css";

/* prismjs language pack */
import "prismjs/components/prism-bash";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";

import Prism from "prismjs";
import { OsBase } from "./pages/migration/Os.Base";
import OsAdvancedComputerArchitecture from "./pages/migration/OsAdvancedComputerArchitecture";
import OsAvoidWastingMemory from "./pages/migration/OsAvoidWastingMemory";
import OsClassicalSynchronizationProblem01 from "./pages/migration/OsClassicalSynchronizationProblem01";
import OsClassicalSynchronizationProblem02 from "./pages/migration/OsClassicalSynchronizationProblem02";
import { search } from "./pages/search";
import { Alu } from "./pages/wikis/Alu";
import { Api } from "./pages/wikis/Api";
import { Bfs } from "./pages/wikis/BFS";
import { JavascriptClass } from "./pages/wikis/JavascriptClass";
import Wiki from "./entity/wiki";
import Pointer from "./module/pointer";

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
wiki.addWiki(JavascriptClass);
wiki.addWiki(OsBase);

// wiki.addWiki(
//   new OriginalPost(OsAdvancedComputerArchitecture).convertNewPage(
//     "/os-advanced-computer-architecture/"
//   )
// );

// wiki.addWiki(
//   new OriginalPost(OsAvoidWastingMemory).convertNewPage(
//     "/os-avoid-wasting-memory/"
//   )
// );

// wiki.addWiki(
//   new OriginalPost(OsClassicalSynchronizationProblem01).convertNewPage(
//     "/os-classical-synchronization-problem01/"
//   )
// );
// wiki.addWiki(
//   new OriginalPost(OsClassicalSynchronizationProblem02).convertNewPage(
//     "/os-classical-synchronization-problem02/"
//   )
// );

wiki.addWiki(
  Wiki.convertNewPage(
    OsAdvancedComputerArchitecture,
    "/os-advanced-computer-architecture/"
  )
);
wiki.addWiki(
  Wiki.convertNewPage(OsAvoidWastingMemory, "/os-avoid-wasting-memory/")
);
wiki.addWiki(
  Wiki.convertNewPage(
    OsClassicalSynchronizationProblem01,
    "/os-classical-synchronization-problem01/"
  )
);
wiki.addWiki(
  Wiki.convertNewPage(
    OsClassicalSynchronizationProblem02,
    "/os-classical-synchronization-problem02/"
  )
);

const navigator = new Navigator(router);

window.wiki = {
  navigator,
  router,
};

// const pointer = new Pointer();
