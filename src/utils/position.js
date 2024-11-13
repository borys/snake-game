"use strict";

export class Position {
  row;
  col;

  /**
   * Creates object
   * @param {number} row row number
   * @param {number} col column number
   */
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  /**
   * Compares positions p and q
   * @param {Position} p first Position object to compare
   * @param {Position} q second Position object to compare
   * @returns true when both args has same row and col
   */
  static isEqual(p, q) {
    return p.row === q.row && p.col === q.col;
  }
}
