"use strict";

import { Position } from "../utils/position.js";
import { GameObject } from "../core/GameObject.js";

export class SnakeSegment extends GameObject {
  /** @type {HTMLElement | null} */
  #elementRef = null;
  /** @type {Position | null} */
  position = null;

  /**
   * Check if position is occupied by this snake segment
   * @param {Position} p given position
   * @returns array with this element when collided, empty array in other case
   */
  checkCollision(p) {
    return Position.isEqual(this.position, p) ? [this] : [];
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
      "game-object-snake",
    );
  }

  updateView() {
    this._drawContext.setPosition(this.#elementRef, this.position);
  }

  destroy() {
    this._drawContext.removeTile(this.#elementRef);
    this.#elementRef = null;
  }
}
