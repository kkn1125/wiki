export default class Pointer {
  private pointer: {
    x: number;
    y: number;
  } = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  cursorOn: boolean = false;

  clickable: boolean = false;

  accelerator: number = 2;
  speed: number = 1;
  lineWidth: number = 1;
  sizeInrease: boolean = false;

  click: boolean = false;

  constructor(
    private readonly canvas = document.querySelector(
      "#mouse-layer"
    ) as HTMLCanvasElement,
    private readonly ctx = canvas.getContext("2d")
  ) {
    const body = document.querySelector("body");
    if (body) {
      body.classList.add("none-cursor");
    }

    window.addEventListener("mousemove", this.handleMouseMovement.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));
    window.addEventListener("load", this.loadAnimation.bind(this));
    document.addEventListener("mouseenter", this.focusInCursor.bind(this));
    document.addEventListener("mouseleave", this.focusOutCursor.bind(this));
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  private handleMouseDown(e: MouseEvent) {
    this.click = true;
  }
  private handleMouseUp(e: MouseEvent) {
    this.click = false;
  }

  private focusInCursor() {
    // console.log("focus in");
    this.cursorOn = true;
  }
  private focusOutCursor() {
    // console.log("focus out");
    this.cursorOn = false;
  }

  private loadAnimation() {
    this.handleResize.call(this);
    this.draw.call(this);
  }

  private handleMouseMovement(e: MouseEvent) {
    this.pointer.x = e.clientX;
    this.pointer.y = e.clientY;
    if (!this.cursorOn) {
      this.cursorOn = true;
    }
    const target = e.target as HTMLElement;
    // console.log(target.tagName === "BUTTON");
    // console.log(target.tagName === "A");
    // console.log(target.hasAttribute("clickable"));
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.hasAttribute("onclick") ||
      target.hasAttribute("clickable") ||
      target.closest("[clickable]")
    ) {
      this.clickable = true;
    } else {
      this.clickable = false;
    }
  }

  private handleResize() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private draw() {
    function animate(this: Pointer, time: number) {
      this.clear();
      if (this.cursorOn) {
        // this.ctx.fillRect(this.pointer.x, this.pointer.y, 30, 30);

        this.ctx.reset();

        this.ctx.beginPath();
        this.ctx.arc(this.pointer.x, this.pointer.y, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(
          this.pointer.x,
          this.pointer.y,
          this.lineWidth > 3 ? this.lineWidth : 3,
          0,
          Math.PI * 2
        );

        if (this.clickable) {
          this.ctx.fillStyle = "#4651e9";
        }
        if (this.click) {
          this.ctx.fillStyle = "#da446b";
        }
        if (!this.clickable && !this.click) {
          this.ctx.fillStyle = "#000";
        }

        this.ctx.fill();

        /* line */
        this.ctx.beginPath();
        this.ctx.arc(this.pointer.x, this.pointer.y, 31, 0, Math.PI * 2);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.pointer.x, this.pointer.y, 29, 0, Math.PI * 2);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.pointer.x, this.pointer.y, 30, 0, Math.PI * 2);
        if (this.clickable) {
          // this.ctx.lineWidth = 5;
          this.ctx.strokeStyle = "#4651e9";
          this.sizeInrease = true;
          // if (!this.ctx.lineWidth) {
          //   this.ctx.lineWidth = 1;
          // }
        } else {
          this.sizeInrease = false;
          // this.ctx.strokeStyle = "#56565656";
        }
        if (this.click) {
          this.ctx.strokeStyle = "#da446b";
          this.increase(5);
        } else {
          this.decrease(1);
        }

        if (this.sizeInrease) {
          this.increase(5);
        } else {
          this.decrease(1);
        }
        if (this.click) {
          this.ctx.lineWidth = this.lineWidth;
        }
        // console.log(this.ctx.lineWidth, this.lineWidth);

        if (!this.clickable && !this.click) {
          this.ctx.strokeStyle = "#000000";
        }
        this.ctx.stroke();

        this.ctx.save();
      }

      requestAnimationFrame(animate.bind(this));
    }
    animate.call(this, 0);
  }

  increase(limit: number) {
    if (this.lineWidth < limit) {
      // console.log(this.lineWidth, this.accelerator, limit);
      this.lineWidth += (this.accelerator * this.speed) / (limit * 0.5);
    }
  }
  decrease(limit: number) {
    if (this.lineWidth > limit) {
      // console.log(this.lineWidth, this.accelerator, limit);
      this.lineWidth -= limit / (this.accelerator * this.speed);
    }
  }
}
