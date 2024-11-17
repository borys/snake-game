"use strict";
import { DrawContext } from "./core/DrawContext.js";
import { GameLoop } from "./GameLoop.js";
import { GameObjectsFactory } from "./game-objects/GameObjectFactory.js";
import { SingleTileObject } from "./game-objects/SingleTileObject.js";
import { Snake } from "./game-objects/Snake.js";
import { Position } from "./core/Position.js";
import { ContainerObject } from "./core/ContainerObject.js";
import { GameObject } from "./core/GameObject.js";
import { GameLoopController } from "./GameLoopController.js";

/**
 * @implements {GameLoopController}
 */
export class GameController {
  /** @type {DrawContext | null} */
  #drawContext = null;
  /** @type {GameLoop | null} */
  #gameLoop = null;
  /** @type {GameObjectsFactory | null} */
  #gameObjectsFactory = null;
  /** @type {ContainerObject | null} */
  #gameScene = null;
  /** @type {ContainerObject | null} */
  #gameMap = null;
  /** @type {Snake | null} */
  #snake = null;
  /** @type {SingleTileObject | null} */
  #bonus = null;

  sizeInTiles = {
    rows: 50,
    cols: 50,
  };

  points = 0;

  /**
   * Callback
   * @callback onGamePauseCallback
   */
  /** @type {onGamePauseCallback} */
  #handlePause;
  /**
   * Register callback function called on game over
   * @param {onGamePauseCallback} cb callback function
   */
  onPause(cb) {
    this.#handlePause = cb;
  }

  /**
   * Callback
   * @callback onGameOverCallback
   */
  /** @type {onGameOverCallback} */
  #handleGameOver;
  /**
   * Register callback function called on game over
   * @param {onGameOverCallback} cb callback function
   */
  onGameOver(cb) {
    this.#handleGameOver = cb;
  }

  /**
   * Handle collision
   * @param {GameObject[]} param0 array of collided object (should be one)
   */
  #handleSnakeCollision([gameObject]) {
    // TODO maybe use visitor pattern here? (rather than type check)
    if (!(gameObject instanceof SingleTileObject)) {
      throw new Error("#handleSnakeCollision wrong object type");
    }

    switch (gameObject.className) {
      case GameObjectsFactory.bonusClassName: {
        this.#snake.grow();

        const newPosition = this.randPosition();
        this.#bonus.position = newPosition;

        this.points += 100;
        break;
      }
      case GameObjectsFactory.wallClassName:
      case GameObjectsFactory.snakeSegmentClassName: {
        this.gameOver();
      }
    }
  }

  /**
   * Handle case when snake outside
   * @param {SingleTileObject} snakeHead snake head object
   */
  #handleSnakeHeadOutsideMap(snakeHead) {
    const newPosition = {
      row:
        (snakeHead.position.row + this.sizeInTiles.rows) %
        this.sizeInTiles.rows,
      col:
        (snakeHead.position.col + this.sizeInTiles.cols) %
        this.sizeInTiles.cols,
    };

    this.#snake.setHeadPosition(newPosition);
  }

  constructor(rootElement) {
    this.init(rootElement);
  }

  /**
   * Init GameController element
   * @param {HTMLElement} rootElement HTML Element where all GameObject will be attached
   */
  init(rootElement) {
    if (this.#drawContext) {
      throw new Error("Game is already initialized - use destroy()");
    }

    this.#drawContext = new DrawContext(
      rootElement,
      this.sizeInTiles.rows,
      this.sizeInTiles.cols,
    );

    this.#gameObjectsFactory = new GameObjectsFactory(this.#drawContext);

    this.#gameLoop = new GameLoop();
  }

  /**
   * Handle game keys
   * @param {string} key pressed key
   */
  handleKeyboard(key) {
    switch (key) {
      case "ArrowUp":
      case "w":
      case "W":
        this.#snake.changeDirection("UP");
        break;
      case "ArrowDown":
      case "s":
      case "S":
        this.#snake.changeDirection("DOWN");
        break;
      case "ArrowRight":
      case "d":
      case "D":
        this.#snake.changeDirection("RIGHT");
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        this.#snake.changeDirection("LEFT");
        break;
      case "Escape":
      case "q":
      case "Q":
        this.pauseGame();
        break;
    }
  }

  /**
   * Check if given position is outside map
   * @param {Position} position given position
   * @returns true when given position is outside map
   */
  isOutsideMap(position) {
    return (
      position.row >= this.#drawContext.sizeInTiles.rows ||
      position.row < 0 ||
      position.col >= this.#drawContext.sizeInTiles.cols ||
      position.col < 0
    );
  }

  /**
   * Returns random position not occupied by other objects
   * @returns random position
   */
  randPosition() {
    const { rows, cols } = this.sizeInTiles;

    let newPosition;

    do {
      newPosition = new Position(
        Math.floor(Math.random() * rows),
        Math.floor(Math.random() * cols),
      );
    } while (this.#gameScene.checkCollision(newPosition).length);

    return newPosition;
  }

  /**
   * Animate snake
   */
  animate() {
    this.#snake?.animate();

    const snakeHead = this.#snake.getHead();

    if (this.isOutsideMap(snakeHead.position)) {
      this.#handleSnakeHeadOutsideMap(snakeHead);
    }
  }

  /**
   * Update view for scene
   */
  updateView() {
    this.#gameScene.updateView();
  }

  /**
   * Checks collision between snake head and other game objects
   */
  checkCollision() {
    const snakeHead = this.#snake.getHead();

    const collided = this.#gameScene
      .checkCollision(snakeHead.position)
      .filter((gameObject) => gameObject !== snakeHead);

    if (collided.length) {
      this.#handleSnakeCollision(collided);
    }
  }

  /**
   * Pause game
   */
  pauseGame() {
    this.#gameLoop.stopGame();
    this.#handlePause?.();
  }

  /**
   * Resume to existing game after pausing
   */
  resumeGame() {
    if (!this.#gameLoop || !this.#gameScene || !this.#snake) {
      throw Error("Can't resume");
    }

    this.#gameLoop.startGame(100, this);
  }

  /**
   * Finish game
   */
  gameOver() {
    this.#gameLoop.stopGame();
    this.#handleGameOver?.();
  }

  /**
   * Start new game with selected map
   * @param {'level_01' | 'level_02'} gameMapName level name
   */
  newGame(gameMapName) {
    this.#gameScene = this.#gameObjectsFactory.getGameScene();

    this.#gameMap = this.#gameObjectsFactory.getGameMap(gameMapName);
    this.#gameScene.add(this.#gameMap);

    this.#snake = this.#gameObjectsFactory.getSnake();
    this.#gameScene.add(this.#snake);

    this.#bonus = this.#gameObjectsFactory.getBonus(this.randPosition());
    this.#gameScene.add(this.#bonus);

    this.#gameScene.createView();

    this.#gameLoop.startGame(100, this);
  }

  destroy() {
    this.#gameLoop?.stopGame();
    this.#gameScene?.destroy();

    this.#gameLoop = null;
    this.#gameScene = null;
    this.#gameObjectsFactory = null;
    this.#gameMap = null;
    this.#bonus = null;
    this.#snake = null;
    this.#drawContext = null;

    this.points = 0;
  }
}
