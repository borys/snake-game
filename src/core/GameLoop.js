"use strict";

/** @import { GameObject } from "./GameObject.js"; */
import { Snake } from "../game-objects/Snake.js";
import { GameScene } from "../game-objects/GameScene.js";

export class GameLoop {
  /** @type {number | null} */
  #gameLoop = null;

  /**
   * Callback
   * @callback onSnakeHeadOutsideMapCallback
   */
  /** @type {onSnakeHeadOutsideMapCallback} */
  #handleSnakeHeadOutsideMap;
  /**
   * Set callback that will be called when head will be outside map
   * @param {onSnakeHeadOutsideMapCallback} cb callback
   */
  onSnakeHeadOutsideMap(cb) {
    this.#handleSnakeHeadOutsideMap = cb;
  }

  /**
   * Callback
   * @callback onSnakeHeadCollisionCallback
   * @param {GameObject[]} array of elements that collided
   */
  /** @type {onSnakeHeadCollisionCallback} */
  #handleSnakeHeadCollision;
  /**
   * Set callback that will be called when collision be detected
   * @param {onSnakeHeadCollisionCallback} cb callback
   */
  onSnakeHeadCollision(cb) {
    this.#handleSnakeHeadCollision = cb;
  }

  /**
   * Start game
   * @param {number} speed how often in ms need to be refreshed
   * @param {GameScene} gameScene snake object
   * @param {Snake} snake snake object
   */
  startGame(speed, gameScene, snake) {
    if (this.#gameLoop) {
      throw new Error("Game already started");
    }

    this.#gameLoop = setInterval(() => {
      snake.animate();

      const snakeHead = snake.getHead();

      if (gameScene.isOutsideMap(snakeHead.position)) {
        this.#handleSnakeHeadOutsideMap?.();

        if (this.#gameLoop === null) {
          return;
        }
      }

      const collided = gameScene
        .checkCollision(snakeHead.position)
        .filter((gameObject) => gameObject !== snakeHead);

      if (collided.length) {
        this.#handleSnakeHeadCollision?.(collided);

        if (this.#gameLoop === null) {
          return;
        }
      }

      gameScene.updateView();
    }, speed);
  }

  stopGame() {
    clearInterval(this.#gameLoop);
    this.#gameLoop = null;
  }
}
