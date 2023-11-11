import { htmlTo } from "./tool";

export const APP = document.querySelector<HTMLDivElement>(
  "#app"
) as HTMLDivElement;
export function globalRemoteController() {
  return `<div class="button-container">
  <div data-btn-path="/" class="panel-item round-button" ${htmlTo(
    "/"
  )}>home</div>
  <div data-btn-path="/wiki/" class="panel-item round-button" ${htmlTo(
    "/wiki/"
  )}>wiki</div>
  <div data-btn-path="/about/" class="panel-item round-button" ${htmlTo(
    "/about/"
  )}>about</div>
</div>`;
}
