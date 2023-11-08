export default class BasePage {
  name: string;
  path: string;
  global: string = "";

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }

  setGlobal(content: string) {
    this.global = content;
  }
}
