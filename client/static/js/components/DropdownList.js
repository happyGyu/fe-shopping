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
    switch (event.key) {

      case "Enter":
        return this.keyboardFocusedItem.innerText;

      case "ArrowDown", "ArrowUp":
        this.handleArrowKey(event.key);
        break;
        
      default:
        console.log('Invalid input.')
    }
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
