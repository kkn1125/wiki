export default class Placeholder {
  static id: number = 0;
  id: number = 0;
  image: HTMLImageElement;
  width: number = 0;
  height: number = 0;
  src: string = "";
  alt: string = "";
  type: string = "";

  constructor(width: number, height: number, alt?: string) {
    this.id = Placeholder.id++;
    this.image = new Image(width, height);
    this.image.alt = alt || "";
    this.width = this.image.width;
    this.height = this.image.height;

    if (width > 0) {
      this.image.width = width;
      this.image.dataset.type = "fixed";
      this.type = "fixed";
    } else {
      this.image.style.width = "100%";
    }
    this.image.height = height;
    alt && (this.alt = alt);
    this.image.src = Placeholder.getImageUrl.call(this);
  }

  static getImageUrl(this: Placeholder | HTMLImageElement) {
    const sizeText = `${this.width} ✕ ${this.height}`;
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const { actualBoundingBoxAscent } = ctx.measureText(sizeText);

    canvas.width = this.width;
    canvas.height = this.height;

    ctx.fillStyle = "#56565656";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.width = canvas.width;
    this.height = canvas.height;

    ctx.font = `bold ${
      (Math.min(this.width, this.height) / 100) * 1.25
    }rem sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(
      sizeText,
      canvas.width / 2,
      canvas.height / 2 + actualBoundingBoxAscent * 2
    );
    ctx.save();
    canvas.remove();

    const url = canvas.toDataURL("image/png");

    if (this instanceof HTMLImageElement) {
      this.title = `placeholder (${this.width}x${this.height})`;
      if (this.getAttribute("data-type") !== "fixed") {
        this.src = url;
      }
    }
    return url;
  }

  toHTML() {
    const div = document.createElement("div");
    div.id = "img-" + this.id;
    // div.id = this.id;
    div.append(this.image);
    const imageHTML = div.outerHTML;
    return imageHTML;
  }
}
// new ResizeObserver(window.placeholder.get(${this.id}).handleResize.bind(window.placeholder.get(${this.id}))).observe(this)
