import { DropdownList } from "../DropdownList.js";
import { getAutoCompleteData } from "../../util/util.js";

export class AutoCompleteList extends DropdownList {
  #autoCompleteDOM;
  #suggestions;

  constructor() {
    super();
    this.#suggestions = [];
    this.dropdownClassName = "search__auto-complete";
  }

  get template() {
    return this.#getAutoCompleteTemplate();
  }

  #getAutoCompleteTemplate() {
    return `
        <div class="search__auto-complete">
            ${this.getDropdownListTemplate(this.#suggestions)}
        </div>
    `;
  }

  activate() {
    this.#autoCompleteDOM = document.querySelector(".search__auto-complete");
  }

  async updateAutoCompleteList(prefix) {
    this.#suggestions = await getAutoCompleteData(prefix);
    this.#autoCompleteDOM.innerHTML = this.getDropdownListTemplate(this.#suggestions);
  }

  open() {
    this.#autoCompleteDOM.classList.add("search__auto-complete--opened");
  }
}
