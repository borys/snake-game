import { GameMenu } from "../ui/GameMenu.js";
import { GameState } from "./GameState.js";
import { MainMenuState } from "./MainMenuState.js";

export class GameOverMenuState extends GameState {
  #gameOverMenu = null;

  constructor(gameManager, gameController) {
    super(gameManager);

    const gameOverMenuTemplate = document.getElementById("gameOverMenu");
    if (!(gameOverMenuTemplate instanceof HTMLTemplateElement)) {
      throw new Error("Incorrect template");
    }

    this.#gameOverMenu = new GameMenu(
      gameManager.rootElement,
      gameOverMenuTemplate
    );
    this.#gameOverMenu.fillOutputsData({ points: gameController.points });
    this.#gameOverMenu.onItemEnter(() => {
      gameController.destroy();

      const mainMenuState = new MainMenuState(gameManager);
      gameManager.changeState(mainMenuState);
    });
  }

  handleKeyboard(key) {
    this.#gameOverMenu.handleKeyboard(key);
  }

  destroy() {
    this.#gameOverMenu.destroy();
    this.#gameOverMenu = null;
  }
}
