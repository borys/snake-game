"use strict";

import { Position } from "../core/Position.js";
import { ContainerObject } from "../core/ContainerObject.js";

export class GameScene extends ContainerObject {
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
}
