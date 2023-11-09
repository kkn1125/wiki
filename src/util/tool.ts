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
  <div data-btn-path="/" class="panel-item round-button" ${Navigator.htmlTo(
    "/"
  )}>home</div>
  <div data-btn-path="/wiki/" class="panel-item round-button" ${Navigator.htmlTo(
    "/wiki/"
  )}>wiki</div>
  <div data-btn-path="/about/" class="panel-item round-button" ${Navigator.htmlTo(
    "/about/"
  )}>about</div>
</div>`;
}
export function getLocaleTime(time: Date) {
  return time.toLocaleString("ko", { hour12: true });
}
export const toParsedHTML = (html: string) => html;

export const cleanSlash = (paths: string) => paths.replace(/\/+/g, "/");

export const codeblock = (type: string, code: string = "", filename?: string) =>
  //data-src="${filename}"

  `<pre class="language-${type}" ${filename ? `data-src="${filename}"` : ""}>
<code>${toParsedHTML(code)}</code>
</pre>`.trim();
