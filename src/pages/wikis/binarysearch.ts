import Wiki from "@/entity/wiki";
import { TITLE_2, TITLE_3, TITLE_4 } from "@/util/global";
import { classes } from "@/util/tool";

export const BinarySearch = new Wiki(
  "이진 탐색 (Binary Search",
  "/binarysearch"
);
BinarySearch.category = "algorithm";
BinarySearch.addTag("binarysearch");
// BinarySearch.addLink({
//   name: "test1",
//   path: "https://www.naver.com",
//   target: "_blank",
// });
BinarySearch.created_at = new Date(2023, 10, 9);
BinarySearch.content = () =>
  Wiki.Layout.bind(BinarySearch)`
<div class="section">
  <h3 class="${classes(TITLE_3)}">Content</h3>
  <figure class="img-data d-flex flex-column">
    <img src="https://kkn1125.github.io/wikimson/src/images/algorithm/binary-search.png" alt="ex" />
    <figcaption>re</figcaption>
  </figure>
  <p>This is the content of the wiki detail page. It can be quite long, and you can scroll to read more.</p>
  <p>More content goes here...</p>
  <!-- Add your content here -->
</div>
`.trim();
