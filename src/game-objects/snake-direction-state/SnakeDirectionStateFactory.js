import { UpSnakeDirectionState } from "./UpSnakeDirectionState.js";
import { DownSnakeDirectionState } from "./DownSnakeDirectionState.js";
import { LeftSnakeDirectionState } from "./LeftSnakeDirectionState.js";
import { RightSnakeDirectionState } from "./RightSnakeDirectionState.js";
import { Snake } from "../Snake.js";

export class SnakeDirectionStateFactory {
  /**
   * Factory method that returns new direction state
   * @param {Snake} snake object that owns state
   * @param {'UP' | 'DOWN' | 'LEFT' | 'RIGHT'} direction direction
   * @returns new object representing direction state
   */
  static getSnakeDirection(snake, direction) {
    switch (direction) {
      case "UP":
        return new UpSnakeDirectionState(snake);
      case "DOWN":
        return new DownSnakeDirectionState(snake);
      case "LEFT":
        return new LeftSnakeDirectionState(snake);
      case "RIGHT":
        return new RightSnakeDirectionState(snake);
    }
  }
}
