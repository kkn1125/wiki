import Page from "@/entity/page";
import { BTN_ERROR_5, BTN_PRI_5, TITLE_1, TITLE_2 } from "@/util/global";
import { classes } from "@/util/tool";

export const notFoundPage = new Page("404", "/404");
notFoundPage.created_at = new Date(2023, 10, 8);
notFoundPage.content = () => Page.Layout`
<main>
  <h1 class="${classes(TITLE_2)}">Not Found</h1>

  <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem. Hic sunt molestias maiores ab ipsam quae debitis, rem incidunt magni quam fugit, assumenda, ad repellendus quis autem ipsum sit?</div>
  
  <button class="${classes(
    BTN_ERROR_5
  )}" onclick="window.wiki.navigator.to('/')">home</button>
</main>
`;
