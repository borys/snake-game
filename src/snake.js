"use strict";

import { GameManager } from "./GameManager.js";

const rootElement = document.getElementById("snakeGame");
const gameManager = new GameManager(rootElement);
document.addEventListener("keydown", (ev) => {
  gameManager.handleKeyboard(ev.key);
});
