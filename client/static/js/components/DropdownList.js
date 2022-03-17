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
    return `<li class="dropdown-list__item ${this.cssClassName}-list__item"><a>${itemData}</a></li>`;
  }

  handleListClickEvent(event) {
    const target = event.target.closest("a");
    return target.innerText;
  }

  handleKeyDownEvent(event) {
    console.log("hi");
    if (!["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return;
    if (event.key === "Enter") {
      return this.handleEnterKey();
    } else if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      this.handleArrowKey(event, key);
    }
  }

  handleEnterKey() {
    return this.keyboardFocusedItem.innerText;
  }

  handleArrowKey(arrowKey) {
    const newFocusedItem =
      arrowKey === "ArrowDown"
        ? this.keyboardFocusedItem.nextSibling
        : this.keyboardFocusedItem.prevSibling;
    if (!newFocusedItem) return;
    this.toggleKeyboardFocus(this.keyboardFocusedItem);
    this.toggleKeyboardFocus(newFocusedItem);
    this.keyboardFocusedItem = newFocusedItem;
  }

  toggleKeyboardFocus(target) {
    target.classList.toggle("keyboard-focusing");
  }
}
