import fs from "fs";
import path from "path";
import { wiki } from "@/pages/wiki";
import Router from "@/module/router";
import { about } from "@/pages/about";
import { home } from "@/pages/home";
import { notFoundPage } from "@/pages/notfound";
import { search } from "@/pages/search";
import { Api } from "@/pages/wikis/Api";
import { Bfs } from "@/pages/wikis/BFS";
import { BinarySearch } from "@/pages/wikis/BinarySearch";
import { WebRTC } from "@/pages/wikis/WebRTC";
import OriginalPost from "@/entity/origin.post";
import { OsBase } from "@/pages/migration/Os.Base";
import OsAdvancedComputerArchitecture from "@/pages/migration/OsAdvancedComputerArchitecture";
import OsAvoidWastingMemory from "@/pages/migration/OsAvoidWastingMemory";
import OsClassicalSynchronizationProblem01 from "@/pages/migration/OsClassicalSynchronizationProblem01";
import { Alu } from "@/pages/wikis/Alu";

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

router.routeList().forEach((paths) => {
  fs.mkdirSync(path.join(path.resolve(), "/dist", paths), {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(path.resolve(), "/dist", paths, "/index.html"),
    fs.readFileSync(path.join(path.resolve(), "/dist", "index.html"))
  );
});
