import { jest } from "@jest/globals";

import { DrawContext } from "./DrawContext.js";
import { Position } from "./Position.js";

describe("DrawContext", () => {
  let rootElementMock;
  let drawContext;
  const sizeInPx = {
    width: 100,
    height: 100,
  };
  const sizeInTiles = {
    rows: 10,
    cols: 10,
  };

  beforeEach(() => {
    rootElementMock = document.createElement("div");
    jest.spyOn(rootElementMock, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: sizeInPx.width,
      height: sizeInPx.height,
      toJSON: () => {},
    });
    drawContext = new DrawContext(
      rootElementMock,
      sizeInTiles.rows,
      sizeInTiles.cols,
    );
  });

  it("should create tile", () => {
    const element = drawContext.createTile(new Position(4, 5), 1, 2, "test");

    expect(element.style.top).toBe("40px");
    expect(element.style.left).toBe("50px");
    expect(element.style.height).toBe("10px");
    expect(element.style.width).toBe("20px");
    expect(element.classList).toContain("test");

    expect(rootElementMock.firstElementChild).toBe(element);
  });

  it("should set position", () => {
    const element = drawContext.createTile(new Position(4, 5), 1, 2, "test");

    drawContext.setPosition(element, new Position(0, 1));

    expect(element.style.top).toBe("0px");
    expect(element.style.left).toBe("10px");
  });

  it("should remove tile", () => {
    const element = drawContext.createTile(new Position(4, 5), 1, 2, "test");
    drawContext.removeTile(element);
    expect(rootElementMock.childElementCount).toBe(0);
  });
});
