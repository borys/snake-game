import { GameManager } from "../GameManager.js";

export class GameState {
  /** @type { GameManager} */
  _gameManager;

  /**
   * Creates new GameState object
   * @param {GameManager} gameManager state owner
   */
  constructor(gameManager) {
    this._gameManager = gameManager;
  }

  /**
   * Keyboard keypress handler
   * @abstract
   * @param {string} key key returned by KeyboardEvent.key
   */
  // eslint-disable-next-line no-unused-vars
  handleKeyboard(key) {
    throw new Error("Override keyboard handler");
  }

  /**
   * Method that destroy GameState
   * @abstract
   */
  destroy() {
    throw new Error("Override destroy method");
  }
}
