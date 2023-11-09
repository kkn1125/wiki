import Page from "@/entity/page";
import Navigator from "@/module/navigator";
import { TITLE_2 } from "@/util/global";
import { classes } from "@/util/tool";

export const notFoundPage = new Page("404", "/404/");
notFoundPage.created_at = new Date(2023, 10, 8);
notFoundPage.content = () => Page.Layout`
<div class="section">
    <h2 class="${classes(TITLE_2, "text-gray")}">Not Found</h2>
    <p>
      존재하지 않는 페이지입니다.
    </p>
    <button class="btn btn-error py-1 px-2" ${Navigator.htmlTo(
      "/"
    )}>home</button>
</div>
`;
