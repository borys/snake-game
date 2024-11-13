"use strict";

import { Position } from "../utils/position.js";
import { GameObject } from "./GameObject.js";

export class GameScene extends GameObject {
  /** @type {GameObject[]} */
  #children = [];

  setDrawContext(drawContext) {
    super.setDrawContext(drawContext);
    this.#children.forEach((wall) => wall.setDrawContext(drawContext));
  }

  checkCollision(position) {
    return this.#children.flatMap((obj) => obj.checkCollision(position));
  }

  createView() {
    this.#children.forEach((child) => child.createView());
  }

  updateView() {
    return this.#children.forEach((obj) => obj.updateView());
  }

  /**
   * Check if given position is outside map
   * @param {Position} position given position
   * @returns true when given position is outside map
   */
  isOutsideMap(position) {
    return (
      position.row >= this._drawContext.sizeInTiles.rows ||
      position.row < 0 ||
      position.col >= this._drawContext.sizeInTiles.cols ||
      position.col < 0
    );
  }

  /**
   * Add object to scene
   * @param {GameObject} gameObject object added to scene
   */
  add(gameObject) {
    this.#children = [...this.#children, gameObject];
  }

  destroy() {
    return this.#children.forEach((obj) => obj.destroy());
  }
}
