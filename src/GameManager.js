import { GameState } from "./game-state/GameState.js";
import { MainMenuState } from "./game-state/MainMenuState.js";

export class GameManager extends GameState {
  #gameState;
  rootElement;

  constructor(rootElement) {
    super(null);

    this.rootElement = rootElement;
    this.#gameState = new MainMenuState(this);
  }

  handleKeyboard(key) {
    this.#gameState.handleKeyboard(key);
  }

  changeState(newState) {
    this.#gameState.destroy();
    this.#gameState = newState;
  }
}
