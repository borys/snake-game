import { Position } from "./Position.js";

describe("Position", () => {
  it("should create position object", () => {
    const position = new Position(1, 2);

    expect(position).toEqual({ row: 1, col: 2 });
  });
});
