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
                ${this.#getCurrentTemplate()}
                ${this.getDropdownListTemplate(this.#categoryData)}
            </div>
        `;
  }

  #getCurrentTemplate() {
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
    this.#addCategoryListClickEvent();
    this.#addKeyDownEvent();
  }

  #cacheDOM() {
    this.#categoryDOM = document.querySelector(".search__category");
    this.#currCategoryTextDOM = this.#categoryDOM.querySelector(
      ".search__category--current-text"
    );
    this.#categoryListDOM = this.#categoryDOM.querySelector(".dropdown-list");
  }

  #addCategoryClickEvent() {
    this.#categoryDOM.addEventListener("click", (e) =>
      this.#toggleCategoryListOpen(e)
    );
  }

  #addCategoryListClickEvent() {
    this.#categoryListDOM.addEventListener("click", (e) =>
      this.#changeSelectedCategory(e)
    );
  }

  #addKeyDownEvent() {
    document
      .querySelector(".search__category--current")
      .addEventListener("keydown", () => {
        console.log("hi");
      });
  }

  #changeSelectedCategory(event) {
    this.#currCategoryTextDOM.innerText = this.handleListClickEvent(event);
  }

  #toggleCategoryListOpen() {
    const categoryList = this.#categoryDOM.querySelector(".dropdown-list");
    categoryList.classList.toggle("search__category-list--opened");
  }
}