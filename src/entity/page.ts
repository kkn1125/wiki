import Wiki from "@/entity/wiki";
import BasePage from "@entity/base.page";

export default class Page extends BasePage {
  content: () => string = () => "";
  wikis: Wiki[] = [];

  useRerender: boolean = false;
  pageProps: { [k: string]: any } = {};
  beforePageProps: { [k: string]: any } = {};
  propsChanged: boolean = false;
  propsCallbackList: Function[] = [];

  props(predicate: Function) {
    this.propsCallbackList.push(predicate.bind(this));
  }

  callingProps() {
    this.propsCallbackList.forEach((cb) => {
      Object.assign(this.pageProps, cb());

      if (!this.isSame(this.beforePageProps, this.pageProps)) {
        this.propsChanged = true;
      } else {
        this.propsChanged = false;
      }

      Object.assign(this.beforePageProps, cb());
    });
  }

  isSame(obj1: Object, obj2: Object) {
    return [...Object.entries(obj1)].every(([k, v]) =>
      v instanceof Object ? this.isSame(obj1[k], obj2[k]) : obj2[k] === v
    );
  }

  addWiki(wiki: Wiki) {
    if (this.wikis.find((child) => child === wiki))
      throw new Error("duplicate wiki page.");
    wiki.setParent(this);
    this.wikis.push(wiki);
  }

  renderContent() {
    return this.content();
  }

  render() {
    this.callingProps();
    return this.renderContent();
  }
}
