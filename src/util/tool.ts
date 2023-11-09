import Navigator from "@/module/navigator";

export function classes(classNames?: string[]): string;
export function classes(a: string, ...classNames: string[]): string;
export function classes(a: string[], ...classNames: string[]): string;
export function classes(
  a?: string | string[],
  ...classNames: string[]
): string {
  if (a) {
    return ([] as string[]).concat(a, classNames).join(" ");
  } else {
    return [].join(" ");
  }
}
export function globalRemoteController() {
  return `<div class="button-container">
  <div class="panel-item round-button" ${Navigator.htmlTo("/")}>home</div>
  <div class="panel-item round-button" ${Navigator.htmlTo("/wiki")}>wiki</div>
  <div class="panel-item round-button" ${Navigator.htmlTo("/about")}>about</div>
</div>`;
}
export function getLocaleTime(time: Date) {
  return time.toLocaleString("ko", { hour12: true });
}
