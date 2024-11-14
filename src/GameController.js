"use strict";
import { DrawContext } from "./core/DrawContext.js";
import { GameLoop } from "./core/GameLoop.js";
import { GameScene } from "./core/GameScene.js";
import { GameMap } from "./game-objects/GameMap.js";
import { GameMapFactory } from "./game-objects/GameMapFactory.js";
import { SingleTileObject } from "./game-objects/SingleTileObject.js";
import { Snake } from "./game-objects/Snake.js";
import { Position } from "./utils/position.js";

export class GameController {
  sizeInTiles = {
    rows: 50,
    cols: 50,
  };

  points = 0;

  /** @type {DrawContext | null} */
  drawContext = null;
  /** @type {GameMapFactory | null} */
  gameMapFactory = null;
  /** @type {GameScene | null} */
  gameScene = null;
  /** @type {GameMap | null} */
  gameMap = null;
  /** @type {Snake | null} */
  snake = null;
  /** @type {SingleTileObject | null} */
  bonus = null;

  #handlePause;
  onPause(cb) {
    this.#handlePause = cb;
  }

  #handleGameOver;
  onGameOver(cb) {
    this.#handleGameOver = cb;
  }

  applyGameRules(gameLoop) {
    gameLoop.onSnakeHeadCollision(([gameObject]) => {
      // TODO maybe use visitor pattern here? (rather than type check)
      if (gameObject.className === this.bonus.className) {
        this.snake.grow();
        const newPosition = this.randPosition();
        this.bonus.position = newPosition;
        this.points += 100;
      } else if (
        gameObject.className === GameMap.wallClassName ||
        gameObject.className === Snake.segmentClassName
      ) {
        gameLoop.stopGame();
        this.#handleGameOver?.();
      }
    });

    gameLoop.onSnakeHeadOutsideMap(() => {
      const snakeHead = this.snake.getHead();

      const newPosition = {
        row:
          (snakeHead.position.row + this.sizeInTiles.rows) %
          this.sizeInTiles.rows,
        col:
          (snakeHead.position.col + this.sizeInTiles.cols) %
          this.sizeInTiles.cols,
      };

      this.snake.setHeadPosition(newPosition);
    });
  }

  constructor(rootElement) {
    this.init(rootElement);
  }

  init(rootElement) {
    if (this.drawContext) {
      throw new Error("Game is already initialized - use destroy()");
    }

    this.drawContext = new DrawContext(
      rootElement,
      this.sizeInTiles.rows,
      this.sizeInTiles.cols,
    );

    this.gameScene = new GameScene();
    this.gameScene.setDrawContext(this.drawContext);

    this.gameMapFactory = new GameMapFactory(this.drawContext);

    this.gameLoop = new GameLoop();
    this.applyGameRules(this.gameLoop);
  }

  handleKeyboard(key) {
    switch (key) {
      case "ArrowUp":
      case "w":
      case "W":
        this.snake.changeDirection("UP");
        break;
      case "ArrowDown":
      case "s":
      case "S":
        this.snake.changeDirection("DOWN");
        break;
      case "ArrowRight":
      case "d":
      case "D":
        this.snake.changeDirection("RIGHT");
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        this.snake.changeDirection("LEFT");
        break;
      case "Escape":
      case "q":
      case "Q":
        this.gameLoop.stopGame();
        this.#handlePause?.(this);
        break;
    }
  }

  randPosition() {
    const { rows, cols } = this.sizeInTiles;

    let newPosition;

    do {
      newPosition = new Position(
        Math.floor(Math.random() * rows),
        Math.floor(Math.random() * cols),
      );
    } while (this.gameScene.checkCollision(newPosition).length);

    return newPosition;
  }

  resumeGame() {
    if (!this.gameLoop || !this.gameScene || !this.snake) {
      throw Error("Can't resume");
    }

    this.gameLoop.startGame(100, this.gameScene, this.snake);
  }

  /**
   * Start new game with selected map
   * @param {'level_01' | 'level_02'} gameMapName level name
   */
  newGame(gameMapName) {
    this.gameMap = this.gameMapFactory.getGameMap(gameMapName);
    this.gameScene.add(this.gameMap);

    this.snake = new Snake();
    this.gameScene.add(this.snake);

    this.bonus = new SingleTileObject("game-object-bonus");
    this.bonus.position = this.randPosition();
    this.gameScene.add(this.bonus);

    this.gameScene.setDrawContext(this.drawContext);
    this.gameScene.createView();
    this.gameLoop.startGame(100, this.gameScene, this.snake);
  }

  destroy() {
    this.gameLoop?.stopGame();
    this.gameScene?.destroy();

    this.gameLoop = null;
    this.gameScene = null;
    this.gameMapFactory = null;
    this.gameMap = null;
    this.bonus = null;
    this.snake = null;
    this.drawContext = null;

    this.points = 0;
  }
}
