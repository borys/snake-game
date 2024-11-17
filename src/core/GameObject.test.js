import { GameObject } from "./GameObject.js";
import { DrawContext } from "./DrawContext.js";
import { Position } from "./Position.js";

class TestClass extends GameObject {
  getDrawContext() {
    return this._drawContext;
  }
}

describe("GameObject", () => {
  it("should set draw context and remove on destroy", () => {
    const testGameObject = new TestClass();
    const mockElement = document.createElement("div");
    const drawContextMock = new DrawContext(mockElement, 10, 10);

    testGameObject.setDrawContext(drawContextMock);
    expect(testGameObject.getDrawContext()).toBe(drawContextMock);

    testGameObject.destroy();
    expect(testGameObject.getDrawContext()).toBe(null);
  });

  it("should throw error when call not implemented abstract method", () => {
    const testGameObject = new TestClass();

    const checkCollision = () =>
      testGameObject.checkCollision(new Position(0, 0));

    expect(checkCollision).toThrow("checkCollision should be overridden");
    expect(testGameObject.updateView).toThrow(
      "updateView should be overridden",
    );
    expect(testGameObject.createView).toThrow(
      "createView should be overridden",
    );
  });
});
