import { GameController } from "../GameController.js";
import { GameManager } from "../GameManager.js";
import { GameState } from "./GameState.js";

export class ResumeGameState extends GameState {
  /** @type {GameController} */
  #gameController;

  /**
   * Creates new object
   * @param {GameManager} gameManager GameManager for which state belongs
   * @param {GameController} gameController representing current game
   */
  constructor(gameManager, gameController) {
    super(gameManager);

    this.#gameController = gameController;
    this.#gameController.resumeGame();
  }

  handleKeyboard(key) {
    this.#gameController.handleKeyboard(key);
  }

  destroy() {}
}
