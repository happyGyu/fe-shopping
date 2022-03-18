import { RecentSearchList } from "./RecentSearchList.js";

export class SearchMain {
  #searchMainDOM;
  #searchInputDOM;
  #recentSearchDOM;
  #recentSearch;

  constructor() {
    this.#recentSearch = new RecentSearchList();
  }

  get template() {
    return this.#getSearchMainTemplate();
  }

  #getSearchMainTemplate() {
    return `
      <div class="search__main">
        ${this.#getInputboxTemplate()}
        ${this.#recentSearch.template}  
      </div>
    `;
  }

  #getInputboxTemplate() {
    return `
      <div class="search__input">
        <input class="search__input-textbox" type="text" placeholder="찾고 싶은 상품을 검색해보세요!"/>
        <a class="search__input-voice-btn"></a>
        <button class="search__input-send-btn" type="submit"><span class="search-icon"></span></button>
      </div>
    `;
  }

  activate() {
    this.#searchMainDOM = document.querySelector(".search__main");
    this.#searchInputDOM = document.querySelector(".search__input-textbox");
    this.#recentSearchDOM = document.querySelector(".search__recent");
    this.#addSearchMainFocusEvent();
    this.#addSubmitEvent();
    this.#addRecentSearchClickEvent();
    this.#recentSearch.activate();
  }

  #addSearchMainFocusEvent() {
    this.#searchMainDOM.addEventListener("focusin", (e) => this.#recentSearch.open(e));
  }

  #addSubmitEvent() {
    const form = document.querySelector(".search");
    form.addEventListener("submit", (e) => this.#handleSubmitEvent(e));
  }

  #handleSubmitEvent(event) {
    event.preventDefault();
    const newSearchData = this.#searchInputDOM.value;
    this.#recentSearch.handleNewRecentSearchData(newSearchData);
    event.target.querySelector("input").value = "";
  }

  #addRecentSearchClickEvent() {
    this.#recentSearchDOM.addEventListener("click", (e) => {
      this.#searchInputDOM.value = this.#recentSearch.handleListClickEvent(e);
      this.#recentSearch.close();
    });
  }
}
