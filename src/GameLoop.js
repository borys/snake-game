"use strict";

import { GameLoopController } from "./GameLoopController.js";

export class GameLoop {
  /** @type {number | null} */
  #gameLoop = null;

  /**
   * Start game
   * @param {number} speed how often in ms need to be refreshed
   * @param {GameLoopController} gameController snake object
   */
  startGame(speed, gameController) {
    if (this.isGameRunning()) {
      throw new Error("Game already started");
    }

    // use window for correct typings
    this.#gameLoop = window.setInterval(() => {
      gameController.animate();
      gameController.checkCollision();

      if (this.isGameRunning()) {
        gameController.updateView();
      }
    }, speed);
  }

  stopGame() {
    clearInterval(this.#gameLoop);
    this.#gameLoop = null;
  }

  isGameRunning() {
    return this.#gameLoop !== null;
  }
}
