"use strict";

import { Position } from "../utils/position.js";
import { GameObject } from "../core/GameObject.js";
import { SingleTileObject } from "./SingleTileObject.js";

export class GameMap extends GameObject {
  static wallClassName = "game-object-wall";
  /** @type {SingleTileObject[]} */
  #walls = [];

  setDrawContext(drawContext) {
    super.setDrawContext(drawContext);
    this.#walls.forEach((wall) => wall.setDrawContext(drawContext));
  }

  /**
   * Check for collision
   * @param {Position} position checked for object collision
   * @returns array of collided elements
   */
  checkCollision(position) {
    return this.#walls.flatMap((wall) => wall.checkCollision(position));
  }

  createView() {
    this.#walls.forEach((wall) => wall.createView());
  }

  updateView() {
    this.#walls.forEach((wall) => wall.updateView());
  }

  /**
   * Add wall to map
   * @param {Position} position position of the wall
   */
  addWall(position) {
    const newWall = new SingleTileObject(GameMap.wallClassName);
    newWall.setDrawContext(this._drawContext);
    newWall.position = position;

    this.#walls = [...this.#walls, newWall];
  }

  destroy() {
    this.#walls.forEach((segment) => segment.destroy());
    this.#walls = [];
  }
}
