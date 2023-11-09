import Wiki from "@/entity/wiki";
import { TITLE_2, WIKI } from "@/util/global";
import { classes } from "@/util/tool";

export const test = new Wiki("테스트 포스팅", "/test");
test.category = "test";
test.addTag("test1");
test.addTag("test2");
test.created_at = new Date(2023, 10, 9);
test.content = () =>
  Wiki.Layout`
<div class="section">
  <h2 class="${classes(TITLE_2)}">Test Wiki</h2>
  <p>Name: ${WIKI.AUTHOR}</p>
  <p>Email: ${WIKI.EMAIL}</p>
</div>
<div class="section">
  <h2 class="${classes(TITLE_2)}">Purpose</h2>
  <p>This wiki page is created for the purpose of providing information and assistance on various topics, including web development, UI/UX design, and more. Feel free to explore the content and reach out if you have any questions or feedback.</p>
</div>
`.trim();
