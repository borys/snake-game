"use strict";

import { Position } from "../utils/position.js";

export class DrawContext {
  /**
   * @type { HTMLElement }
   */
  rootElementRef;

  sizeInTiles = {
    rows: 0,
    cols: 0,
  };

  sizeInPixels = {
    width: 0,
    height: 0,
  };

  #getTileWidth() {
    return this.sizeInPixels.width / this.sizeInTiles.cols;
  }

  #getTileHeight() {
    return this.sizeInPixels.height / this.sizeInTiles.rows;
  }

  #getWidth(cols) {
    return this.#getTileWidth() * cols;
  }

  #getHeight(rows) {
    return this.#getTileHeight() * rows;
  }

  #getLeft(col) {
    return this.#getTileWidth() * col;
  }

  #getTop(row) {
    return this.#getTileHeight() * row;
  }

  /**
   * Create object
   * @param {HTMLElement} rootElementRef element used as canvas
   * @param {number} rows height in rows
   * @param {number} cols width in cols
   */
  constructor(rootElementRef, rows, cols) {
    this.init(rootElementRef, rows, cols);
  }

  /**
   * Init DrawContext
   * @param {HTMLElement} rootElementRef element used as canvas
   * @param {number} rows height
   * @param {number} cols width
   */
  init(rootElementRef, rows, cols) {
    this.rootElementRef = rootElementRef;
    this.rootElementRef.style.position = "relative";
    this.rootElementRef.style.overflow = "hidden";

    const rect = rootElementRef.getBoundingClientRect();

    this.sizeInTiles = { rows, cols };
    this.sizeInPixels = {
      width: rect.width,
      height: rect.height,
    };
  }

  /**
   * Create tile and attach to root element
   * @param {Position} position tile position
   * @param {number} rows tile height in rows
   * @param {number} cols tile width in cols
   * @param {string} className tile css class - may be used for styling
   * @returns created element
   */
  createTile(position, rows, cols, className) {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = `${this.#getWidth(cols)}px`;
    element.style.height = `${this.#getHeight(rows)}px`;
    element.style.top = `${this.#getTop(position.row)}px`;
    element.style.left = `${this.#getLeft(position.col)}px`;
    element.classList.add(className);

    this.rootElementRef.appendChild(element);
    return element;
  }

  /**
   * Removes tiles from root element
   * @param {HTMLElement} element element to remove
   */
  removeTile(element) {
    this.rootElementRef.removeChild(element);
  }

  /**
   * Set position of tile
   * @param {HTMLElement} element tile element
   * @param {Position} position new position
   */
  setPosition(element, position) {
    element.style.top = `${this.#getTop(position.row)}px`;
    element.style.left = `${this.#getLeft(position.col)}px`;
  }
}
