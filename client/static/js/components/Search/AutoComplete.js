import { DropdownList } from "../DropdownList.js";
import { getAutoCompleteSuggestions } from "../../util.js";

export class AutoCompleteList extends DropdownList {
  #autoCompleteDOM;
  #autoCompleteSuggestions;

  constructor() {
    super();
    this.cssClassName = "search__auto-complete";
    this.#autoCompleteSuggestions = [];
  }

  get template() {
    return this.#getAutoCompleteTemplate();
  }

  #getAutoCompleteTemplate() {
    return `
        <div class="search__auto-complete">
            ${this.getDropdownListTemplate(this.#autoCompleteSuggestions)}
        </div>
    `;
  }

  activate() {
    this.#cacheDOM();
  }

  #cacheDOM() {
    this.#autoCompleteDOM = document.querySelector(".search__auto-complete");
  }

  async updateAutoCompleteList(prefix) {
    this.#autoCompleteSuggestions = await getAutoCompleteSuggestions(prefix);
    this.#autoCompleteDOM.innerHTML = this.getDropdownListTemplate(this.#autoCompleteSuggestions);
    this.keyboardFocusedItem = null;
  }

  open() {
    this.#autoCompleteDOM.classList.add("search__auto-complete--opened");
  }

  close() {
    this.#autoCompleteDOM.classList.remove("search__auto-complete--opened");
    this.keyboardFocusedItem = null;
  }
}
