import { jest } from "@jest/globals";

import { Position } from "../core/Position.js";
import { Snake } from "./Snake.js";
import { SingleTileObject } from "./SingleTileObject.js";

class GameFactoryMock {
  getSnakeSegment(position) {
    const tmp = new SingleTileObject("segment", position);
    tmp.createView = () => {};
    return tmp;
  }
}

describe("Snake", () => {
  let gameFactoryMock;
  let getSnakeSegmentSpy;
  /** @type {Snake | null} */
  let snake = null;
  const initPosition = [new Position(5, 5)];

  beforeEach(() => {
    gameFactoryMock = new GameFactoryMock();
    getSnakeSegmentSpy = jest.spyOn(gameFactoryMock, "getSnakeSegment");

    snake = new Snake(gameFactoryMock, initPosition, "UP");
  });

  it("should set head position", () => {
    const currentPosition = new Position(5, 5);
    snake.setHeadPosition(currentPosition);
    const head = snake.getHead();

    expect(head.position).toEqual(currentPosition);
  });

  it("should move snake on animate", () => {
    getSnakeSegmentSpy.mockClear();

    const currentPosition = new Position(5, 5);
    const expectedPosition = new Position(4, 5);

    snake.setHeadPosition(currentPosition);
    snake.changeDirection("UP");
    snake.animate();
    const head = snake.getHead();

    expect(getSnakeSegmentSpy).not.toHaveBeenCalled();
    expect(head.position).toEqual(expectedPosition);
  });

  it("should grow snake on animate", () => {
    getSnakeSegmentSpy.mockClear();

    snake.grow();
    snake.animate();

    expect(getSnakeSegmentSpy).toHaveBeenCalled();
  });

  it("should change direction from vertical to horizontal", () => {
    getSnakeSegmentSpy.mockClear();

    const currentPosition = new Position(5, 5);
    const expectedPosition = new Position(5, 6);

    snake.setHeadPosition(currentPosition);
    snake.changeDirection("RIGHT");
    snake.animate();
    const head = snake.getHead();

    expect(getSnakeSegmentSpy).not.toHaveBeenCalled();
    expect(head.position).toEqual(expectedPosition);
  });
});
