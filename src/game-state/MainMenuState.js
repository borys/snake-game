"use strict";

import { GameMenu } from "../ui/GameMenu.js";
import { GameState } from "./GameState.js";
import { RunGameState } from "./RunGameState.js";

export class MainMenuState extends GameState {
  #mainMenu;

  constructor(gameManager) {
    super(gameManager);

    const mainMenuTemplate = document.getElementById("mainMenu");
    if (!(mainMenuTemplate instanceof HTMLTemplateElement)) {
      throw new Error("Incorrect template");
    }

    this.#mainMenu = new GameMenu(gameManager.rootElement, mainMenuTemplate);
    this.#mainMenu.onItemEnter((gameMapName) => {
      const nextState = new RunGameState(gameManager, gameMapName);
      gameManager.changeState(nextState);
    });
  }

  handleKeyboard(key) {
    this.#mainMenu.handleKeyboard(key);
  }

  destroy() {
    this.#mainMenu.destroy();
    this.#mainMenu = null;
  }
}
