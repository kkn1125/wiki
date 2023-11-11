import BasePage from "@entity/base.page";
import Wiki from "./wiki";
import OriginalPost from "./origin.post";

export default class Page extends BasePage {
  content: () => string = () => "";
  wikis: Wiki[] = [];

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
    return this.renderContent();
  }
}
