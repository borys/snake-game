"use strict";

import { Position } from "../utils/position.js";
import { DrawContext } from "./DrawContext.js";

/** @abstract */
export class GameObject {
  /**
   * @protected
   * @type {DrawContext}
   */
  _drawContext;

  /**
   * Set drawContext
   * @param {DrawContext} drawContext drawContext used by object
   */
  setDrawContext(drawContext) {
    this._drawContext = drawContext;
  }

  /**
   * Update object - set new position, change color etc.
   * @abstract
   */
  createView() {
    throw new Error("createView should be overridden");
  }

  /**
   * Update object - set new position, change color etc.
   * @abstract
   */
  updateView() {
    throw new Error("updateView should be overridden");
  }

  /**
   * Check if position collide with object
   * return array of elements collided
   * @abstract
   * @param {Position} position given position
   * @returns {GameObject[]} array of collided elements
   */
  // eslint-disable-next-line no-unused-vars
  checkCollision(position) {
    throw new Error("checkCollision should be overridden");
  }

  /**
   * Destroy game object
   * @abstract
   */
  destroy() {
    throw new Error("checkCollision should be overridden");
  }
}
