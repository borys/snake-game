"use strict";

import { Position } from "../utils/position.js";
import { ContainerObject } from "./ContainerObject.js";
import { SingleTileObject } from "./SingleTileObject.js";

export class GameMap extends ContainerObject {
  static wallClassName = "game-object-wall";

  /**
   * Add wall to map
   * @param {Position} position position of the wall
   */
  addWall(position) {
    const newWall = new SingleTileObject(GameMap.wallClassName);
    newWall.position = position;
    super.add(newWall);
  }
}
