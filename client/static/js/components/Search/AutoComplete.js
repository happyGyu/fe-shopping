import { DropdownList } from "../DropdownList.js";
import { getAutoCompleteData } from "../../util.js";

export class AutoCompleteList extends DropdownList {
  #autoCompleteDOM;
  #autoCompleteData;

  constructor() {
    super();
    this.cssClassName = "search__auto-complete";
    this.#autoCompleteData = [];
  }

  get template() {
    return this.#getAutoCompleteTemplate();
  }

  #getAutoCompleteTemplate() {
    return `
        <div class="search__auto-complete">
            ${this.getDropdownListTemplate(this.#autoCompleteData)}
        </div>
    `;
  }

  activate() {
    this.#autoCompleteDOM = document.querySelector(".search__auto-complete");
  }

  async updateAutoCompleteList(prefix) {
    this.#autoCompleteData = await getAutoCompleteData(prefix);
    this.#autoCompleteDOM.innerHTML = this.getDropdownListTemplate(this.#autoCompleteData);
  }

  open() {
    this.#autoCompleteDOM.classList.add("search__auto-complete--opened");
  }

  close() {
    this.#autoCompleteDOM.classList.remove("search__auto-complete--opened");
  }
}
