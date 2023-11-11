import Page from "@/entity/page";
import { TITLE_2, TITLE_3 } from "@/util/global";
import { classes, htmlTo } from "@/util/tool";

export const notFoundPage = new Page("404", "/404/");
notFoundPage.created_at = new Date(2023, 10, 8);
notFoundPage.content = () => Page.Layout`
<div class="section">
    <h3 class="${classes(TITLE_3, "text-error")}">Not Found</h3>
    <p>
      존재하지 않는 페이지입니다.
    </p>
    <button class="btn btn-error py-1 px-2" ${htmlTo("/")}>home</button>
</div>
`;
