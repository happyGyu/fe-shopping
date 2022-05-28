import { DropdownList } from "../DropdownList.js";
import { initialSearchCategory } from "../../constant.js";

export class SearchCategory extends DropdownList {
  #categoryDOM;
  #currCategoryTextDOM;
  #categoryListDOM;
  #categoryData;
  #selectedSearchCategory;

  constructor(categoryData) {
    super();
    this.cssClassName = "search__category";
    this.#categoryData = categoryData;
    this.#selectedSearchCategory = initialSearchCategory;
  }

  get template() {
    return this.#getSearchCategoryTemplate();
  }

  #getSearchCategoryTemplate() {
    return `
      <div class="search__category">
          ${this.#getCurrentCategoryTemplate()}
          ${this.getDropdownListTemplate(this.#categoryData)}
      </div>
    `;
  }

  #getCurrentCategoryTemplate() {
    return `
      <div class="search__category--current">
          <span class="search__category--current-text">${
            this.#selectedSearchCategory
          }</span>
          <span class="search__category--current-btn"></span>
      </div>
    `;
  }

  activate() {
    this.#cacheDOM();
    this.#addCategoryClickEvent();
    this.#addCategoryItemClickEvent();
  }

  #cacheDOM() {
    this.#categoryDOM = document.querySelector(".search__category");
    this.#currCategoryTextDOM = document.querySelector(".search__category--current-text");
    this.#categoryListDOM = this.#categoryDOM.querySelector(".dropdown-list");
  }

  #addCategoryClickEvent() {
    this.#categoryDOM.addEventListener("click", (e) =>
      this.#toggleCategoryListOpen(e)
    );
  }

  #addCategoryItemClickEvent() {
    this.#categoryListDOM.addEventListener("click", (e) =>
      this.#changeCurrSelectedCategory(e)
    );
  }

  #changeCurrSelectedCategory(event) {
    this.#currCategoryTextDOM.innerText = this.getClickedItemText(event);
  }

  #toggleCategoryListOpen() {
    const categoryList = this.#categoryDOM.querySelector(".dropdown-list");
    categoryList.classList.toggle("search__category-list--opened");
  }
}