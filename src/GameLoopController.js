"use strict";

/**
 * @interface
 */
export class GameLoopController {
  animate() {
    throw new Error("not implemented");
  }

  checkCollision() {
    throw new Error("not implemented");
  }

  updateView() {
    throw new Error("not implemented");
  }
}
