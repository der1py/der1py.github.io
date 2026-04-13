export class InputHandler {
  constructor() {
    this.keys = {};
    this.isMouseDown = false;
    this.prevKeys = {};
    this.prevMouseDown = false;
    window.addEventListener("keydown", e => this.keys[e.key] = true);
    window.addEventListener("keyup", e => this.keys[e.key] = false);

    window.addEventListener("mousedown", () => {
      this.isMouseDown = true;
    });

    window.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });
  }

  isKeyPressed(key) {
    return this.keys[key];
  }

  isKeyJustPressed(key) {
    return this.keys[key] && !this.prevKeys[key];
  }

  isMouseJustPressed() {
    return this.isMouseDown && !this.prevMouseDown;
  }

  isMousePressed() {
    return this.isMouseDown;
  }

  update() {
    this.prevKeys = { ...this.keys };
    this.prevMouseDown = this.isMouseDown;
  }
}
