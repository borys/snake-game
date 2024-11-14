"use strict";

/** @import { GameObject } from "./GameObject.js"; */
import { GameController } from "../GameController.js";

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
   * @param {GameController} gameController snake object
   */
  startGame(speed, gameController) {
    if (this.#gameLoop) {
      throw new Error("Game already started");
    }

    this.#gameLoop = setInterval(() => {
      gameController.snake.animate();

      const snakeHead = gameController.snake.getHead();

      if (gameController.isOutsideMap(snakeHead.position)) {
        this.#handleSnakeHeadOutsideMap?.();

        if (this.#gameLoop === null) {
          return;
        }
      }

      const collided = gameController.gameScene
        .checkCollision(snakeHead.position)
        .filter((gameObject) => gameObject !== snakeHead);

      if (collided.length) {
        this.#handleSnakeHeadCollision?.(collided);

        if (this.#gameLoop === null) {
          return;
        }
      }

      gameController.gameScene.updateView();
    }, speed);
  }

  stopGame() {
    clearInterval(this.#gameLoop);
    this.#gameLoop = null;
  }
}
