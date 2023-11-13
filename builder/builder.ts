import Wiki from "@/entity/wiki";
import Router from "@/module/router";
import { about } from "@/pages/about";
import { home } from "@/pages/home";
import { OsBase } from "@/pages/migration/Os.Base";
import OsAdvancedComputerArchitecture from "@/pages/migration/OsAdvancedComputerArchitecture";
import OsAvoidWastingMemory from "@/pages/migration/OsAvoidWastingMemory";
import OsClassicalSynchronizationProblem01 from "@/pages/migration/OsClassicalSynchronizationProblem01";
import OsClassicalSynchronizationProblem02 from "@/pages/migration/OsClassicalSynchronizationProblem02";
import { notFoundPage } from "@/pages/notfound";
import { search } from "@/pages/search";
import { wiki } from "@/pages/wiki";
import { Alu } from "@/pages/wikis/Alu";
import { Api } from "@/pages/wikis/Api";
import { Bfs } from "@/pages/wikis/BFS";
import { BinarySearch } from "@/pages/wikis/BinarySearch";
import { JavascriptClass } from "@/pages/wikis/JavascriptClass";
import { WebRTC } from "@/pages/wikis/WebRTC";
import fs from "fs";
import path from "path";

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
// wiki.addWiki();

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

router.routeList().forEach((paths) => {
  fs.mkdirSync(path.join(path.resolve(), "/dist", paths), {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(path.resolve(), "/dist", paths, "/index.html"),
    fs.readFileSync(path.join(path.resolve(), "/dist", "index.html"))
  );
});
