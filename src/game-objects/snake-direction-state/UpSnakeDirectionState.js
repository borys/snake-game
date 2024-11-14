import { Position } from "../../core/Position.js";
import { Snake } from "../Snake.js";
import { SnakeDirectionState } from "./SnakeDirectionState.js";
import { SnakeDirectionStateFactory } from "./SnakeDirectionStateFactory.js";

export class UpSnakeDirectionState extends SnakeDirectionState {
  get isHorizontal() {
    return false;
  }
  get isVertical() {
    return true;
  }

  /**
   * Create new object
   * @param {Snake} snake state owner
   */
  constructor(snake) {
    super(snake);
  }

  /**
   * Calculates new position based on previous positions and movement direction
   * @param {Position} param0 current position
   * @returns new position based on previous position and direction
   */
  nextPosition({ row, col }) {
    return new Position(row - 1, col);
  }

  /**
   * Change direction if allowed
   * @param {'UP' | 'DOWN' | 'LEFT' | 'RIGHT'} newDirection direction
   */
  changeDirection(newDirection) {
    const newDirectionState = SnakeDirectionStateFactory.getSnakeDirection(
      this._snake,
      newDirection,
    );
    if (newDirectionState.isHorizontal) {
      this._snake.changeDirectionState(newDirectionState);
    }
  }
}
