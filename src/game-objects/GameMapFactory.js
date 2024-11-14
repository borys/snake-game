import { DrawContext } from "../core/DrawContext.js";
import { Position } from "../utils/position.js";
import { ContainerObject } from "./ContainerObject.js";
import { SingleTileObject } from "./SingleTileObject.js";

export class GameMapFactory {
  /**
   * @protected
   * @type {DrawContext}
   */
  _drawContext;

  static wallClassName = "game-object-wall";

  /**
   * Creates factory
   * @param {DrawContext} drawContext drawContext will be passed to created objects
   */
  constructor(drawContext) {
    this._drawContext = drawContext;
  }

  getWall(position) {
    return new SingleTileObject(GameMapFactory.wallClassName, position);
  }

  /**
   * Factory method returning GameMap with chosen level
   * @param {'level_01' | 'level_02'} gameMapName name of the map to generate
   * @returns new GameMap representing level
   */
  getGameMap(gameMapName) {
    const sizeInTiles = this._drawContext.sizeInTiles;
    const gameMap = new ContainerObject();
    gameMap.setDrawContext(this._drawContext);
    const lastColumn = sizeInTiles.cols - 1;
    const lastRow = sizeInTiles.rows - 1;

    switch (gameMapName) {
      case "level_01": {
        for (let c = 0; c < sizeInTiles.cols; c++) {
          const newTopWall = this.getWall(new Position(0, c));
          gameMap.add(newTopWall);

          const newBottomWall = this.getWall(new Position(lastRow, c));
          gameMap.add(newBottomWall);
        }

        break;
      }
      case "level_02": {
        for (let c = 0; c < sizeInTiles.cols; c++) {
          const newTopWall = this.getWall(new Position(0, c));
          gameMap.add(newTopWall);

          const newBottomWall = this.getWall(new Position(lastRow, c));
          gameMap.add(newBottomWall);
        }

        for (let r = 1; r < sizeInTiles.rows - 1; r++) {
          const newLeftWall = this.getWall(new Position(r, 0));
          gameMap.add(newLeftWall);

          const newRightWall = this.getWall(new Position(r, lastColumn));
          gameMap.add(newRightWall);
        }

        break;
      }
    }

    return gameMap;
  }
}
