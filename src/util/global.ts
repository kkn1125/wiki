export const APP = document.querySelector<HTMLDivElement>(
  "#app"
) as HTMLDivElement;

export const WIKI = {
  BRAND_NAME: import.meta.env.VITE_BRAND_NAME,
  EMAIL: import.meta.env.VITE_EMAIL,
  VERSION: import.meta.env.VITE_VERSION,
  AUTHOR: import.meta.env.VITE_AUTHOR,
  PUBLISHED: import.meta.env.VITE_PUBLISHED,
};

export const BTN_5 = ["btn", "btn-5"];
export const BTN_PRI_5 = ["btn", "btn-primary", "btn-5"];
export const BTN_INFO_5 = ["btn", "btn-info", "btn-5"];
export const BTN_WARN_5 = ["btn", "btn-warn", "btn-5"];
export const BTN_ERROR_5 = ["btn", "btn-error", "btn-5"];

export const TITLE_1 = ["title", "title-1"];
export const TITLE_2 = ["title", "title-2"];
export const TITLE_3 = ["title", "title-3"];
export const TITLE_4 = ["title", "title-4"];
export const TITLE_5 = ["title", "title-5"];
export const wikiName = import.meta.env.DEV ? "/wiki/" : "/wiki/wiki/";
