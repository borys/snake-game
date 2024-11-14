import { DrawContext } from "../core/DrawContext.js";
import { Position } from "../utils/position.js";
import { ContainerObject } from "./ContainerObject.js";
import { SingleTileObject } from "./SingleTileObject.js";
import { Snake } from "./Snake.js";

export class GameObjectsFactory {
  static wallClassName = "game-object-wall";
  static bonusClassName = "game-object-bonus";
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

  getGameScene() {
    const scene = new ContainerObject();
    scene.setDrawContext(this._drawContext);

    return scene;
  }

  getSnake() {
    const snake = new Snake();
    snake.setDrawContext(this._drawContext);
    return snake;
  }

  getBonus(position) {
    const bonus = new SingleTileObject("game-object-bonus", position);
    bonus.setDrawContext(this._drawContext);

    return bonus;
  }

  /**
   * Creates new wall
   * @param {Position} position wall position
   * @returns new SingleTileObject representing Wall
   */
  getWall(position) {
    const newWall = new SingleTileObject(
      GameObjectsFactory.wallClassName,
      position,
    );
    newWall.setDrawContext(this._drawContext);

    return newWall;
  }

  /**
   * Factory method returning GameMap with chosen level
   * @param {'level_01' | 'level_02'} gameMapName name of the map to generate
   * @returns new GameMap representing level
   */
  getGameMap(gameMapName) {
    const sizeInTiles = this._drawContext.sizeInTiles;
    const lastColumn = sizeInTiles.cols - 1;
    const lastRow = sizeInTiles.rows - 1;

    const gameMap = new ContainerObject();
    gameMap.setDrawContext(this._drawContext);

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
