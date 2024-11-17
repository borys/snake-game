import { jest } from "@jest/globals";

import { GameLoop } from "./GameLoop.js";
import { GameLoopController } from "./GameLoopController.js";

/**
 * @implements {GameLoopController}
 */
class MockController {
  updateView() {}
  checkCollision() {}
  animate() {}
}

jest.useFakeTimers();

describe("GameLoop", () => {
  let gameLoop;
  let mockController;
  let animateSpy;
  let checkCollisionSpy;
  let updateViewSpy;

  beforeEach(() => {
    jest.clearAllTimers();

    gameLoop = new GameLoop();
    mockController = new MockController();

    animateSpy = jest.spyOn(mockController, "animate");
    checkCollisionSpy = jest.spyOn(mockController, "checkCollision");
    updateViewSpy = jest.spyOn(mockController, "updateView");
  });

  it("should call animate, checkCollision and updateView when run", () => {
    gameLoop.startGame(100, mockController);
    jest.advanceTimersByTime(100);

    expect(gameLoop.isGameRunning()).toBe(true);
    expect(animateSpy).toHaveBeenCalled();
    expect(updateViewSpy).toHaveBeenCalled();
    expect(checkCollisionSpy).toHaveBeenCalled();
  });

  it("should stop game", () => {
    gameLoop.startGame(100, mockController);

    jest.advanceTimersByTime(100);
    animateSpy.mockClear();
    updateViewSpy.mockClear();
    checkCollisionSpy.mockClear();

    gameLoop.stopGame();
    jest.advanceTimersByTime(100);

    expect(gameLoop.isGameRunning()).toBe(false);
    expect(animateSpy).not.toHaveBeenCalled();
    expect(updateViewSpy).not.toHaveBeenCalled();
    expect(checkCollisionSpy).not.toHaveBeenCalled();
  });
});
