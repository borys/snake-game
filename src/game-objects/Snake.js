"use strict";

import { Position } from "../core/Position.js";
import { SnakeDirectionState } from "./snake-direction-state/SnakeDirectionState.js";
import { UpSnakeDirectionState } from "./snake-direction-state/UpSnakeDirectionState.js";
import { ContainerObject } from "../core/ContainerObject.js";
import { SnakeSegmentFactory } from "./SnakeSegmentFactory.js";
import { SnakeDirectionStateFactory } from "./snake-direction-state/SnakeDirectionStateFactory.js";

// TODO should also extends SnakeDirectionState
export class Snake extends ContainerObject {
  #gameObjectFactory = null;
  #growCounter = 0;
  /** @type {SnakeDirectionState | null} */
  #directionState = null;
  /** @type {"UP" | "DOWN" | "LEFT" | "RIGHT" | null} */
  #nextDirection = null;

  /**
   * Creates snake
   * @param {SnakeSegmentFactory} snakeSegmentFactory game object factory
   * @param {Position[]} initSegmentPositions init snake segments position
   * @param {"UP" | "DOWN" | "LEFT" | "RIGHT"} initDirection init move direction
   */
  constructor(snakeSegmentFactory, initSegmentPositions, initDirection) {
    super();
    this.#gameObjectFactory = snakeSegmentFactory;

    this.#directionState = SnakeDirectionStateFactory.getSnakeDirection(
      this,
      initDirection,
    );

    this._children = initSegmentPositions.map((position) => {
      return snakeSegmentFactory.getSnakeSegment(position);
    });
  }

  grow() {
    this.#growCounter++;
  }

  /**
   * Calculate new position based on movement direction
   * @param {Position} currentPosition current element position
   * @returns calculated new position
   */
  #nextPosition(currentPosition) {
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
    return this._children.at(-1);
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

    const newPosition = this.#nextPosition(oldHead.position);

    let newHead, body;
    if (this.#growCounter > 0) {
      newHead = this.#gameObjectFactory.getSnakeSegment(newPosition);
      newHead.setDrawContext(this._drawContext);
      newHead.createView();

      body = [...this._children];
      this.#growCounter--;
    } else {
      [newHead, ...body] = this._children;
      newHead.position = newPosition;
    }

    this._children = [...body, newHead];
  }

  destroy() {
    this.#growCounter = 0;
    this.#directionState = new UpSnakeDirectionState(this);
    this.#nextDirection = null;

    super.destroy();
  }
}
