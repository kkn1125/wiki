export function classes(classNames: string[]): string;
export function classes(a: string, ...classNames: string[]): string;
export function classes(a: string[], ...classNames: string[]): string;
export function classes(a: string | string[], ...classNames: string[]): string {
  return ([] as string[]).concat(a, classNames).join(" ");
}
