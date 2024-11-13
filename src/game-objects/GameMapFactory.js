import { DrawContext } from "../core/DrawContext.js";
import { Position } from "../utils/position.js";
import { GameMap } from "./GameMap.js";

export class GameMapFactory {
  /**
   * @protected
   * @type {DrawContext}
   */
  _drawContext;

  /**
   * Creates factory
   * @param {DrawContext} drawContext drawContext will be passed to created objects
   */
  constructor(drawContext) {
    this._drawContext = drawContext;
  }

  /**
   * Factory method returning GameMap with chosen level
   * @param {'level_01' | 'level_02'} gameMapName name of the map to generate
   * @returns new GameMap representing level
   */
  getGameMap(gameMapName) {
    const sizeInTiles = this._drawContext.sizeInTiles;
    const gameMap = new GameMap();
    gameMap.setDrawContext(this._drawContext);

    switch (gameMapName) {
      case "level_01": {
        const lastRow = sizeInTiles.rows - 1;
        for (let c = 0; c < sizeInTiles.cols; c++) {
          gameMap.addWall(new Position(0, c));
          gameMap.addWall(new Position(lastRow, c));
        }

        break;
      }
      case "level_02": {
        const lastColumn = sizeInTiles.cols - 1;
        const lastRow = sizeInTiles.rows - 1;

        for (let c = 0; c < sizeInTiles.cols; c++) {
          gameMap.addWall(new Position(0, c));
          gameMap.addWall(new Position(lastRow, c));
        }

        for (let r = 1; r < sizeInTiles.rows - 1; r++) {
          gameMap.addWall(new Position(r, 0));
          gameMap.addWall(new Position(r, lastColumn));
        }

        break;
      }
    }

    return gameMap;
  }
}
