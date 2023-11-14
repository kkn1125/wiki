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

export const figImage = (src: string, caption: string, alt?: string) => {
  return `<figure class='img-data d-flex flex-column'>
    <img
      src='${src}'
      alt='${alt || caption}'
    />
    <figcaption>${caption}</figcaption>
  </figure>`;
};

export const mdImageAuto = (path: string, alt: string) =>
  `![${alt}](${
    process.env.NODE_ENV === "development" ? "" : "/wiki"
  }/images/${path})`;

export const timeFormat = (format: string, time: Date) => {
  const base = new Date(time);
  const year = base.getFullYear();
  const month = base.getMonth() + 1;
  const date = base.getDate();
  const hour = base.getHours();
  const minute = base.getMinutes();
  const second = base.getSeconds();
  const milliseconds = base.getMilliseconds();

  const isOver12 = hour > 12;
  const flagUse12 = format.includes("AP");
  const useHour = !flagUse12 ? hour : isOver12 ? hour - 12 : hour;

  return format.replace(/YYYY|MM|dd|HH|mm|ss|SSS|AP/g, ($1) => {
    switch ($1) {
      case "YYYY":
        return year.toString().padStart(4, "0");
      case "MM":
        return month.toString().padStart(2, "0");
      case "dd":
        return date.toString().padStart(2, "0");
      case "HH":
        return useHour.toString().padStart(2, "0");
      case "mm":
        return minute.toString().padStart(2, "0");
      case "ss":
        return second.toString().padStart(2, "0");
      case "SSS":
        return milliseconds.toString().padStart(3, "0");
      case "AP":
        return isOver12 ? "PM" : "AM";
      default:
        return $1;
    }
  });
};
export function htmlTo(path: string) {
  return `onclick="window.wiki.navigator.to('${path}')"`;
}
