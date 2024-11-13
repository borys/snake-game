"use strict";

import { Position } from "../utils/position.js";
import { GameObject } from "../core/GameObject.js";

/**
 * Bonus object
 */
export class Bonus extends GameObject {
  /** @type {HTMLElement | null} */
  #elementRef = null;
  /** @type {Position | null} */
  position = null;

  checkCollision(position) {
    return Position.isEqual(this.position, position) ? [this] : [];
  }

  createView(position) {
    if (this.#elementRef) {
      throw new Error("View already created");
    }

    this.position = position ?? this.position;
    this.#elementRef = this._drawContext.createTile(
      this.position,
      1,
      1,
      "game-object-bonus",
    );
  }

  updateView() {
    this._drawContext.setPosition(this.#elementRef, this.position);
  }

  destroy() {
    this._drawContext.removeTile(this.#elementRef);
    this.#elementRef = null;
    this.position = null;
  }
}
