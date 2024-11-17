"use strict";

import { Position } from "../core/Position.js";
import { SingleTileObject } from "./SingleTileObject.js";

/**
 * Factory interface used by snake
 * @interface
 */
export class SnakeSegmentFactory {
  /**
   * Method that creates Snake segment
   * @param {Position} position init segment position
   * @returns {SingleTileObject} tile representing snake segment
   */
  // eslint-disable-next-line no-unused-vars
  getSnakeSegment(position) {
    throw new Error("not implemented");
  }
}
