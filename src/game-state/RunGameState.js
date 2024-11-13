import { GameController } from "../GameController.js";
import { GameOverMenuState } from "./GameOverMenuState.js";
import { GameState } from "./GameState.js";
import { PauseMenuState } from "./PauseMenuState.js";

export class RunGameState extends GameState {
  /** @type {GameController} */
  #gameController;

  constructor(gameManager, gameMapName) {
    super(gameManager);
    this.#gameController = new GameController(gameManager.rootElement);

    this.#gameController.onPause(() => {
      const gameRunState = new PauseMenuState(
        gameManager,
        this.#gameController,
      );
      gameManager.changeState(gameRunState);
    });
    this.#gameController.onGameOver(() => {
      const gameRunState = new GameOverMenuState(
        gameManager,
        this.#gameController,
      );
      gameManager.changeState(gameRunState);
    });

    this.#gameController.newGame(gameMapName);
  }

  handleKeyboard(key) {
    this.#gameController.handleKeyboard(key);
  }

  destroy() {}
}
