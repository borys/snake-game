import { jest } from "@jest/globals";

import { ContainerObject } from "./ContainerObject.js";
import { DrawContext } from "./DrawContext.js";
import { GameObject } from "./GameObject.js";
import { Position } from "./Position.js";

class TestGameObject extends GameObject {
  updateView() {}
  createView() {}
}

describe("ContainerObject", () => {
  let probeGameObject;
  let containerObject;
  let setDrawContextSpy;

  beforeEach(() => {
    probeGameObject = new TestGameObject();
    jest.spyOn(probeGameObject, "checkCollision");
    jest.spyOn(probeGameObject, "createView");
    setDrawContextSpy = jest.spyOn(probeGameObject, "setDrawContext");
    jest.spyOn(probeGameObject, "updateView");
    jest.spyOn(probeGameObject, "destroy");

    containerObject = new ContainerObject();
  });

  it("should set draw context when add GameObject", () => {
    containerObject.add(probeGameObject);
    expect(probeGameObject.setDrawContext).toHaveBeenCalled();
  });

  it("should set draw context for children", () => {
    containerObject.add(probeGameObject);
    setDrawContextSpy.mockClear();

    const rootElement = document.createElement("div");
    const drawContext = new DrawContext(rootElement, 10, 10);
    containerObject.setDrawContext(drawContext);

    expect(probeGameObject.setDrawContext).toHaveBeenCalled();
  });

  describe("checkCollision", () => {
    it("should return collided object", () => {
      const expectedCollided = [probeGameObject];
      probeGameObject.checkCollision.mockReturnValue(expectedCollided);

      containerObject.add(probeGameObject);
      const collided = containerObject.checkCollision(new Position(0, 0));

      expect(probeGameObject.checkCollision).toHaveBeenCalled();
      expect(collided).toEqual(expectedCollided);
    });

    it("should return empty array when no collision occurs", () => {
      const expectedCollided = [];
      probeGameObject.checkCollision.mockReturnValue(expectedCollided);

      containerObject.add(probeGameObject);
      const collided = containerObject.checkCollision(new Position(0, 0));

      expect(probeGameObject.checkCollision).toHaveBeenCalled();
      expect(collided).toEqual(expectedCollided);
    });
  });

  it("should create view for children", () => {
    containerObject.add(probeGameObject);
    containerObject.createView(probeGameObject);

    expect(probeGameObject.createView).toHaveBeenCalled();
  });

  it("should update view for children", () => {
    containerObject.add(probeGameObject);
    containerObject.updateView(probeGameObject);

    expect(probeGameObject.updateView).toHaveBeenCalled();
  });

  it("should call destroy on children", () => {
    containerObject.add(probeGameObject);
    containerObject.destroy(probeGameObject);

    expect(probeGameObject.destroy).toHaveBeenCalled();
  });
});
