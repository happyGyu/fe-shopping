export class DropdownList {
  constructor() {
    this.keyboardFocusedItem;
  }

  getDropdownListTemplate(listData) {
    return `
        <ul class="dropdown-list ${this.cssClassName}-list">
            ${listData.map((data) => this.getItemTemplate(data)).join("")}
        </ul>
    `;
  }

  getItemTemplate(itemData) {
    return `<li class="dropdown-list__item ${this.cssClassName}-item"><a>${itemData}</a></li>`;
  }

  getClickedText(event) {
    const target = event.target.closest("a");
    return target.innerText;
  }

  handleKeyDownEvent(event) {
    if (["ArrowUp", "ArrowDown"].includes(event.key)) {
      this.handleArrowKey(event.key);
    }
  }

  handleArrowKey(arrowKey) {
    if (this.keyboardFocusedItem) {
      this.moveKeyBoardFocus(arrowKey);
    } else {
      this.focusFirstItem();
    }
  }

  moveKeyBoardFocus(arrowKey) {
    const newFocusedItem = this.getNewFocusedItem(arrowKey);
    if (!newFocusedItem) return;
    this.toggleKeyboardFocus(this.keyboardFocusedItem);
    this.toggleKeyboardFocus(newFocusedItem);
    this.keyboardFocusedItem = newFocusedItem;
  }

  getNewFocusedItem(arrowKey) {
    const newFocusedItem = arrowKey === "ArrowDown"
      ? this.keyboardFocusedItem.nextElementSibling
      : this.keyboardFocusedItem.previousElementSibling;
    return newFocusedItem;
  }

  focusFirstItem() {
    this.keyboardFocusedItem = document.querySelector(`.${this.cssClassName}-item`);
    this.toggleKeyboardFocus(this.keyboardFocusedItem);
  }

  toggleKeyboardFocus(target) {
    target.classList.toggle("keyboard-focusing");
  }
}
