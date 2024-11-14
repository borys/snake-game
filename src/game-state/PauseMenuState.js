import { GameMenu } from "../ui/GameMenu.js";
import { GameState } from "./GameState.js";
import { MainMenuState } from "./MainMenuState.js";
import { ResumeGameState } from "./ResumeGameState.js";

export class PauseMenuState extends GameState {
  /** @type {GameMenu} */
  #pauseMenu;

  constructor(gameManager, gameController) {
    super(gameManager);

    const pauseMenuTemplate = document.getElementById("pauseMenu");
    if (!(pauseMenuTemplate instanceof HTMLTemplateElement)) {
      throw new Error("Incorrect template");
    }

    this.#pauseMenu = new GameMenu(gameManager.rootElement, pauseMenuTemplate);
    this.#pauseMenu.fillOutputsData({ points: gameController.points });
    this.#pauseMenu.onItemEnter((key) => {
      if (key === "resume") {
        const resumeGameState = new ResumeGameState(
          gameManager,
          gameController
        );
        gameManager.changeState(resumeGameState);
      } else if (key === "exit") {
        gameController.destroy();
        const mainMenuState = new MainMenuState(gameManager);
        gameManager.changeState(mainMenuState);
      }
    });
  }

  handleKeyboard(key) {
    this.#pauseMenu.handleKeyboard(key);
  }

  destroy() {
    this.#pauseMenu.destroy();
    this.#pauseMenu = null;
  }
}
