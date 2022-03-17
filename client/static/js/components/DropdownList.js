export class DropdownList {
  constructor() {
    this.keyboardFocusedItem;
  }

  getDropdownListTemplate(listData) {
    return `
        <ul class="dropdown-list ">
            ${listData.map((data) => this.getItemTemplate(data)).join("")}
        </ul>
    `;
  }

  getItemTemplate(itemData) {
    return `<li class=dropdown-list__item>${itemData}</li>`;
  }

  toggleFocus(focusSubject, target) {
    target.classList.toggle(`${focusSubject}-focusing`);
  }

  handleMouseMoveEvent(event) {
    const target = event.target.closest("li");
    this.toggleFocus("mouse", target);
  }

  handleKeyDownEvent(event) {
    if (!["ArrowDown, ArrowUp"].includes(event.key)) return;
    handleArrowKey(event.key);
    return this.keyboardFocusedItem;
  }

  handleArrowKey(arrowKey) {
    const newFocusedItem =
      arrowKey === "ArrowDown"
        ? this.keyboardFocusedItem.nextSibling
        : this.keyboardFocusedItem.prevSibling;
    if (!newFocusedItem) return;
    this.toggleFocus("keyboard", this.keyboardFocusedItem);
    this.toggleFocus("keyboard", newFocusedItem);
    this.keyboardFocusedItem = newFocusedItem;
  }
}
