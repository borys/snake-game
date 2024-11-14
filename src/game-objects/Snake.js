"use strict";

import { Position } from "../utils/position.js";
import { GameObject } from "../core/GameObject.js";
import { SnakeDirectionState } from "./snake-direction-state/SnakeDirectionState.js";
import { UpSnakeDirectionState } from "./snake-direction-state/UpSnakeDirectionState.js";
import { SingleTileObject } from "./SingleTileObject.js";

// TODO should also extends SnakeDirectionState
export class Snake extends GameObject {
  static segmentClassName = "game-object-snake";
  /** @type {SingleTileObject[]} */
  #segments = [];
  #growCounter = 0;
  /** @type {SnakeDirectionState} */
  #directionState = new UpSnakeDirectionState(this);
  /** @type {"UP" | "DOWN" | "LEFT" | "RIGHT" | null} */
  #nextDirection = null;

  constructor() {
    super();

    // TODO move to GameController
    this.#segments = [
      new Position(25, 23),
      new Position(25, 24),
      new Position(25, 25),
      new Position(25, 26),
    ].map((position) => {
      const segment = new SingleTileObject(Snake.segmentClassName);
      segment.position = position;
      return segment;
    });
  }

  setDrawContext(drawContext) {
    super.setDrawContext(drawContext);
    this.#segments.forEach((segment) => segment.setDrawContext(drawContext));
  }

  grow() {
    this.#growCounter++;
  }

  /**
   * Calculate new position based on movement direction
   * @param {Position} currentPosition current element position
   * @returns calculated new position
   */
  nextPosition(currentPosition) {
    return this.#directionState.nextPosition(currentPosition);
  }

  /**
   * Conditionally change snake movement direction,
   * some changes are not allowed (will be ignored):
   * - UP <-> DOWN
   * - LEFT <-> RIGHT
   * state changes will be applied on animation phase,
   * in order to prevent from changing to not allowed state
   * f.e. UP -> LEFT -> DOWN
   * @param {"UP" | "DOWN" | "LEFT" | "RIGHT"} nextDirection new movement direction
   */
  changeDirection(nextDirection) {
    this.#nextDirection = nextDirection;
  }

  /**
   * change state connected with movement direction
   * this changes are applied immediately
   * @param {SnakeDirectionState} newDirection new state representing movement direction
   */
  changeDirectionState(newDirection) {
    this.#directionState = newDirection;
  }

  /**
   * Get head segment
   * @returns head segment
   */
  getHead() {
    return this.#segments.at(-1);
  }

  /**
   * Sets new head position
   * @param {Position} position new head position
   */
  setHeadPosition(position) {
    const head = this.getHead();
    head.position = position;
  }

  animate() {
    const oldHead = this.getHead();
    if (this.#nextDirection) {
      this.#directionState.changeDirection(this.#nextDirection);
      this.#nextDirection = null;
    }

    const newPosition = this.nextPosition(oldHead.position);

    let newHead, body;
    if (this.#growCounter > 0) {
      newHead = new SingleTileObject(Snake.segmentClassName);
      newHead.setDrawContext(this._drawContext);
      newHead.position = newPosition;
      newHead.createView();

      body = [...this.#segments];
      this.#growCounter--;
    } else {
      [newHead, ...body] = this.#segments;
      newHead.position = newPosition;
    }

    this.#segments = [...body, newHead];
  }

  /**
   * Check if provided position is occupied by Snake
   * @param {Position} p given position
   * @returns true when snake contains position
   */
  checkCollision(p) {
    return this.#segments.flatMap((segment) => segment.checkCollision(p));
  }

  createView() {
    this.#segments.forEach((segment) => segment.createView());
  }

  updateView() {
    this.#segments.forEach((segment) => {
      segment.updateView();
    });
  }

  destroy() {
    this.#segments.forEach((segment) => segment.destroy());
    this.#growCounter = 0;
    this.#segments = [];
    this.#nextDirection = null;
  }
}
