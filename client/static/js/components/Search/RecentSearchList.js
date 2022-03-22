import { DropdownList } from "../DropdownList.js";

export class RecentSearchList extends DropdownList {
  #recentSearchDOM;
  #recentSearchListDOM;
  #deleteBtnDOM;
  #onOffBtnDOM;
  #recentSearchContentDOM;
  #recentSearchData;
  #turnedOn;

  constructor() {
    super();
    this.#recentSearchData = this.#getRecentSearchData();
    this.#turnedOn = true;
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
        <div class="search__recent-content">
          ${this.#getRecentSearchContentTemplate()}
        </div>
        ${this.#getRecentSearchUtilTemplate()}
      </div> 
    `;
  }

  #getRecentSearchContentTemplate() {
    return this.#turnedOn ? this.#getTurnedOnTemplate() : this.#getTurnedOffTemplate();
  }

  #getTurnedOnTemplate() {
    return `
      ${this.#getRecentSearchTitleTemplate()}
      ${this.getDropdownListTemplate(this.#recentSearchData)}
    `;
  }

  #getRecentSearchTitleTemplate() {
    return `<div class="search__recent-title">최근 검색어</div>`;
  }

  #getTurnedOffTemplate() {
    return `<div class="search__recent-off-message">최근 검색어 저장 기능이 꺼져 있습니다.</div>`;
  }

  #getRecentSearchUtilTemplate() {
    return `
      <div class="search__recent-util">
        <button class="search__recent-util--delete-all" type="button">전체삭제</button>
        <button class="search__recent-util--onoff on" type="button">최근검색어끄기</button>
      </div>
    `;
  }

  activate() {
    this.#cacheDOM();
    this.#addDeleteBtnEvent();
    this.#addOnOffBtnEvent();
  }

  #cacheDOM() {
    this.#recentSearchDOM = document.querySelector(".search__recent");
    this.#recentSearchListDOM = document.querySelector(".search__recent-list");
    this.#recentSearchContentDOM = document.querySelector(".search__recent-content");
    this.#deleteBtnDOM = document.querySelector(".search__recent-util--delete-all");
    this.#onOffBtnDOM = document.querySelector(".search__recent-util--onoff");
  }

  #addDeleteBtnEvent() {
    this.#deleteBtnDOM.addEventListener("click", () => this.#deleteAll());
  }

  #deleteAll() {
    localStorage.removeItem("recentSearch");
    this.#recentSearchData = [];
    this.#recentSearchListDOM.innerHTML = "";
    this.keyboardFocusedItem = null;
  }

  #addOnOffBtnEvent() {
    this.#onOffBtnDOM.addEventListener("click", () => this.#switchOnOff());
  }

  #switchOnOff() {
    this.#turnedOn = !this.#turnedOn;
    this.#recentSearchContentDOM.innerHTML = this.#getRecentSearchContentTemplate();
    this.#onOffBtnDOM.innerHTML = this.#turnedOn ? "최근검색어끄기" : "최근검색어켜기";
  }

  handleNewRecentSearchData(newData) {
    if (this.#recentSearchData.indexOf(newData) !== -1) return;
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
    this.keyboardFocusedItem = null;
  }
}
