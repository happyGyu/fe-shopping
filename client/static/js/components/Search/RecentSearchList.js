import { DropdownList } from "../DropdownList.js";

export class RecentSearchList extends DropdownList {
  #recentSearchDOM;
  #recentSearchListDOM;
  #deleteBtnDOM;
  #recentSearchData;

  constructor() {
    super();
    this.#recentSearchData = this.#getRecentSearchData();
    this.cssClassName = "search__recent";
  }

  #getRecentSearchData() {
    return JSON.parse(localStorage.getItem("recentSearch") || "[]");
  }

  get template() {
    return this.#getRecentSearchTemplate();
  }

  #getRecentSearchTemplate() {
    return `
      <div class="search__recent">
        ${this.#getRecentSearchTitleTemplate()}
        ${this.getDropdownListTemplate(this.#recentSearchData)}
        ${this.#getRecentSearchUtilTemplate()}
      </div> 
    `;
  }

  #getRecentSearchTitleTemplate() {
    return `<div class="search__recent-title">최근 검색어</div>`;
  }

  #getRecentSearchUtilTemplate() {
    return `
      <div class="search__recent-util">
        <button class="search__recent-util--delete-all" type="button">전체삭제</button>
        <button class="search__recent-util--off" type="button">최근검색어끄기</button>
      </div>
    `;
  }

  activate() {
    this.#cacheDOM();
    this.#addDeleteBtnEvent();
  }

  #cacheDOM() {
    this.#recentSearchDOM = document.querySelector(".search__recent");
    this.#recentSearchListDOM = document.querySelector(".search__recent-list");
    this.#deleteBtnDOM = document.querySelector(".search__recent-util--delete-all");
  }

  #addDeleteBtnEvent() {
    this.#deleteBtnDOM.addEventListener("click", (e) => this.#deleteAll(e));
  }

  #deleteAll() {
    localStorage.removeItem("recentSearch");
    this.#recentSearchData = [];
    this.#recentSearchListDOM.innerHTML = "";
    this.keyboardFocusedItem = null;
  }

  handleNewRecentSearchData(newData) {
    this.#updateRecentSearchData(newData);
    this.#writeOnRecentSearchList(newData);
  }

  #updateRecentSearchData(newData) {
    this.#recentSearchData.push(newData);
    localStorage.setItem("recentSearch", JSON.stringify(this.#recentSearchData));
  }

  #writeOnRecentSearchList(newText) {
    this.#recentSearchListDOM.insertAdjacentHTML("beforeend", this.getItemTemplate(newText));
  }

  open() {
    this.#recentSearchDOM.classList.add("search__recent--opened");
  }

  close() {
    this.#recentSearchDOM.classList.remove("search__recent--opened");
  }
}
