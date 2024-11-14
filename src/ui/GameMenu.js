"use strict";

export class GameMenu {
  /** @type {HTMLElement | null} */
  #rootElementRef = null;

  /** @type {HTMLElement | null} */
  #menuElementRef = null;

  /** @type {HTMLElement[]} */
  #items = [];
  #outputs = {};
  #selectedIndex = 0;

  /**
   * Callback called on enter menu item - it takes key to distinguish which item was selected
   * @callback onEnterCallback
   * @param {string} key selected item data key
   */

  /** @type {onEnterCallback} */
  #handleItemEnter;
  /**
   * Register onEnter callback
   * @param {onEnterCallback} cb onEnter handler
   */
  onItemEnter(cb) {
    this.#handleItemEnter = cb;
  }

  /**
   * Create menu using provided template, under root element
   * @param {HTMLElement} rootElementRef element where menu will be attached
   * @param {HTMLTemplateElement} menuTemplateElementRef menu template element
   */
  constructor(rootElementRef, menuTemplateElementRef) {
    this.init(rootElementRef, menuTemplateElementRef);
  }

  /**
   * Create menu using provided template, under root element
   * @param {HTMLElement} rootElementRef element where menu will be attached
   * @param {HTMLTemplateElement} menuTemplateElementRef menu template element
   */
  init(rootElementRef, menuTemplateElementRef) {
    this.#rootElementRef = rootElementRef;

    // clone is DocumentFragment (not Node!)
    const clone = menuTemplateElementRef.content.cloneNode(true);

    // @ts-ignore
    this.#items = Array.from(clone.querySelectorAll("li"));
    this.#changeSelected(0);

    this.#outputs = Object.fromEntries(
      // @ts-ignore
      Array.from(clone.querySelectorAll("output")).map((output) => [
        output.name,
        output,
      ])
    );

    // @ts-ignore
    this.#menuElementRef = clone.firstElementChild;
    this.#rootElementRef.appendChild(clone);
  }

  /**
   * Change selected element
   * @param {number} newIndex new index
   */
  #changeSelected(newIndex) {
    this.#items[this.#selectedIndex].classList.remove("selected");
    this.#selectedIndex = newIndex;
    this.#items[this.#selectedIndex].classList.add("selected");
  }

  /**
   * Select previous element
   */
  #selectPrev() {
    const newIndex =
      (this.#selectedIndex - 1 + this.#items.length) % this.#items.length;
    this.#changeSelected(newIndex);
  }

  /**
   * Select next element
   */
  #selectNext() {
    const newIndex = (this.#selectedIndex + 1) % this.#items.length;
    this.#changeSelected(newIndex);
  }

  /**
   * Get data key from selected menu item
   * @returns return data key of selected item
   */
  #getSelectedItemKey() {
    return this.#items[this.#selectedIndex].dataset["key"];
  }

  /**
   * Fills templates outputs using provided data
   * @param {object} data object where keys are template output fields names
   */
  fillOutputsData(data) {
    Object.entries(data).forEach(([name, value]) => {
      this.#outputs[name].value = value;
    });
  }

  /**
   * Menu keyboard event handler
   * @param {string} key key returned by KeyboardEvent.key
   */
  handleKeyboard(key) {
    switch (key) {
      case "ArrowUp":
      case "W":
      case "w":
        this.#selectPrev();
        break;
      case "ArrowDown":
      case "S":
      case "s":
        this.#selectNext();
        break;
      case "Enter":
      case " ":
        this.#handleItemEnter?.(this.#getSelectedItemKey());
        break;
    }
  }

  /**
   * Removes menu from root and reset inner state
   */
  destroy() {
    this.#rootElementRef?.removeChild(this.#menuElementRef);
    this.#rootElementRef = null;
    this.#menuElementRef = null;
    this.#items = [];
    this.#handleItemEnter = null;
    this.#selectedIndex = null;
  }
}
