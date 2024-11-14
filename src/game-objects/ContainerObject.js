import { GameObject } from "../core/GameObject";
import { Position } from "../utils/position";

export class ContainerObject extends GameObject {
  /**
   * @protected
   * @type {GameObject[]}
   */
  _children = [];

  setDrawContext(drawContext) {
    super.setDrawContext(drawContext);
    this._children.forEach((child) => child.setDrawContext(drawContext));
  }

  /**
   * Check if provided position is occupied by container's children
   * @param {Position} position position checked for collision
   * @returns array of collided elements, empty when no collision
   */
  checkCollision(position) {
    return this._children.flatMap((child) => child.checkCollision(position));
  }

  createView() {
    this._children.forEach((child) => child.createView());
  }

  updateView() {
    return this._children.forEach((child) => child.updateView());
  }

  /**
   * Add object to scene
   * @param {GameObject} gameObject object added to scene
   */
  add(gameObject) {
    gameObject.setDrawContext(this._drawContext);
    this._children = [...this._children, gameObject];
  }

  destroy() {
    this._children.forEach((obj) => obj.destroy());
    this._children = [];

    super.destroy();
  }
}
