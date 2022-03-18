import { RecentSearchList } from "./RecentSearchList.js";
import { AutoCompleteList } from "./AutoComplete.js";

export class SearchMain {
  #searchMainDOM;
  #searchInputDOM;
  #recentSearchDOM;
  #recentSearch;
  #autoComplete;

  constructor() {
    this.#recentSearch = new RecentSearchList();
    this.#autoComplete = new AutoCompleteList();
  }

  get template() {
    return this.#getSearchMainTemplate();
  }

  #getSearchMainTemplate() {
    return `
      <div class="search__main">
        ${this.#getInputboxTemplate()} 
        ${this.#autoComplete.template}
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
    this.#recentSearch.activate();
    this.#autoComplete.activate();
    this.#cacheDOM();
    this.#addSearchMainFocusEvent();
    this.#addSubmitEvent();
    this.#addRecentSearchClickEvent();
    this.#addTypingEvent();
  }

  #cacheDOM() {
    this.#searchMainDOM = document.querySelector(".search__main");
    this.#searchInputDOM = document.querySelector(".search__input-textbox");
    this.#recentSearchDOM = document.querySelector(".search__recent");
  }

  #addSearchMainFocusEvent() {
    this.#searchMainDOM.addEventListener("focusin", () => {
      this.#autoComplete.close();
      this.#recentSearch.open();
    });
  }

  #addSubmitEvent() {
    const form = document.querySelector(".search");
    form.addEventListener("submit", (e) => this.#handleSubmitEvent(e));
  }

  #handleSubmitEvent(event) {
    event.preventDefault();
    const newSearchData = this.#searchInputDOM.value;
    this.#recentSearch.handleNewRecentSearchData(newSearchData);
    this.#searchInputDOM.value = "";
  }

  #addRecentSearchClickEvent() {
    this.#recentSearchDOM.addEventListener("click", (e) => {
      this.#recentSearch.close();
      this.#searchInputDOM.value = this.#recentSearch.getClickedText(e);
    });
  }

  #addTypingEvent() {
    this.#searchInputDOM.addEventListener("input", (e) => {
      this.#recentSearch.close();
      this.#autoComplete.open();
      const prefix = this.#searchInputDOM.value;
      this.#autoComplete.updateAutoCompleteList(prefix);
    });
  }
}
