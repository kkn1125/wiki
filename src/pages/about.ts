import Page from "@/entity/page";
import {
  BTN_5,
  TITLE_1,
  TITLE_2,
  TITLE_3,
  TITLE_4,
  TITLE_5,
} from "@/util/global";
import { classes } from "@/util/tool";

export const about = new Page("about", "/about");
about.created_at = new Date(2023, 10, 8);
about.content = () =>
  Page.Layout`
<div class="section">
  <h2 class="${classes(TITLE_2)}">About</h2>
  <p>Name: Mark</p>
  <p>Email: mark@example.com</p>
  <p>Phone: +1-123-456-7890</p>
</div>
<div class="section">
  <h2 class="${classes(TITLE_2)}">Purpose</h2>
  <p>This wiki page is created for the purpose of providing information and assistance on various topics, including web development, UI/UX design, and more. Feel free to explore the content and reach out if you have any questions or feedback.</p>
</div>
`.trim();
