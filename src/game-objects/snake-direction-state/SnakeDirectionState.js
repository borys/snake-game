"use strict";

import { Position } from "../../utils/position.js";
import { Snake } from "../Snake.js";

export class SnakeDirectionState {
  _snake;

  /**
   * True for horizontal directions
   * @abstract
   * @returns {boolean} true means that is horizontal direction
   */
  get isHorizontal() {
    throw new Error("isHorizontal should be overridden");
  }

  /**
   * True for vertical directions
   * @abstract
   * @returns {boolean} true means that is vertical direction
   */
  get isVertical() {
    throw new Error("isVertical should be overripen");
  }

  /**
   * Creates SnakeDirectionState connected with Snake
   * @param {Snake} snake owner of the state
   */
  constructor(snake) {
    this._snake = snake;
  }

  /**
   * Calculates new position based on previous positions and movement direction
   * @abstract
   * @param {Position} currentPosition current position
   * @returns { Position } new position based on previous position and direction
   */
  // eslint-disable-next-line no-unused-vars
  nextPosition(currentPosition) {
    throw new Error("nextPosition should be overridden");
  }

  /**
   * Change direction if allowed
   * @abstract
   * @param {'UP' | 'DOWN' | 'LEFT' | 'RIGHT'} newDirection direction
   */
  // eslint-disable-next-line no-unused-vars
  changeDirection(newDirection) {
    throw new Error("changeDirection should be overridden");
  }
}
