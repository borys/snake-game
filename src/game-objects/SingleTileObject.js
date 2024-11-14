"use strict";

import { Position } from "../utils/position.js";
import { GameObject } from "../core/GameObject.js";

export class SingleTileObject extends GameObject {
  /** @type {HTMLElement | null} */
  #elementRef = null;
  /** @type {Position | null} */
  position = null;
  /** @type {string} */
  #className = "";
  get className() {
    return this.#className;
  }

  /**
   * Creates object
   * @param {string} className name used as tile class
   */
  constructor(className) {
    super();
    this.#className = className;
  }

  /**
   * Check if position is occupied by this tile
   * @param {Position} position given position
   * @returns array with this element when collided, empty array in other case
   */
  checkCollision(position) {
    return Position.isEqual(this.position, position) ? [this] : [];
  }

  createView(position) {
    if (this.#elementRef) {
      throw new Error("View already created");
    }

    this.position = position ?? this.position;

    if (!this.position) {
      throw new Error("Position not set");
    }

    this.#elementRef = this._drawContext.createTile(
      this.position,
      1,
      1,
      this.#className,
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
