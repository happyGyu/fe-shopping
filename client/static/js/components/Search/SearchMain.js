import { RecentSearchList } from "./RecentSearchList.js";
import { AutoCompleteList } from "./AutoComplete.js";
import { debounce } from "../../util.js";
import { autoCompleteDelay, AUTO_COMPLETE, RECENT_SEARCH } from "../../constant.js";

export class SearchMain {
  #searchMainDOM;
  #searchInputDOM;
  #recentSearchDOM;
  #recentSearch;
  #autoComplete;
  #currentDropdown;

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
    this.#addKeyDownEvent();
  }

  #cacheDOM() {
    this.#searchMainDOM = document.querySelector(".search__main");
    this.#searchInputDOM = document.querySelector(".search__input-textbox");
    this.#recentSearchDOM = document.querySelector(".search__recent");
  }

  #addSearchMainFocusEvent() {
    this.#searchMainDOM.addEventListener("focusin", () => {
      this.#openOneDropdown(RECENT_SEARCH);
    });
  }

  #addSubmitEvent() {
    const form = document.querySelector(".search");
    form.addEventListener("submit", (e) => this.#handleSubmitEvent(e));
  }

  #handleSubmitEvent(event) {
    event.preventDefault();
    const newSearchData = this.#searchInputDOM.value;
    if (!newSearchData) return;
    this.#recentSearch.handleNewRecentSearchData(newSearchData);
    this.#searchInputDOM.value = "";
  }

  #addRecentSearchClickEvent() {
    this.#recentSearchDOM.addEventListener("click", (e) => {
      this.#recentSearch.close();
      this.#searchInputDOM.value = this.#recentSearch.getClickedItemText(e);
    });
  }

  #addKeyDownEvent() {
    this.#searchInputDOM.addEventListener("keydown", (e) => this.#handleKeyDownEvent(e));
  }

  #handleKeyDownEvent(event) {
    if (["ArrowUp", "ArrowDown"].includes(event.key)) {
      this.#currentDropdown.handleArrowKeyDown(event.key);
      this.#searchInputDOM.value = this.#currentDropdown.keyboardFocusedItem.innerText;
    } else {
      debounce(() => {
        this.#handleTypingEvent();
      }, autoCompleteDelay)();
    }
  }

  #handleTypingEvent() {
    const typedKeyword = this.#searchInputDOM.value;
    if (typedKeyword === "") {
      this.#openOneDropdown(RECENT_SEARCH);
    } else {
      this.#openOneDropdown(AUTO_COMPLETE);
      this.#autoComplete.updateAutoCompleteList(typedKeyword);
    }
  }

  #openOneDropdown(subject) {
    if (subject === RECENT_SEARCH) {
      this.#recentSearch.open();
      this.#autoComplete.close();
      this.#currentDropdown = this.#recentSearch;
    } else if (subject === AUTO_COMPLETE) {
      this.#recentSearch.close();
      this.#autoComplete.open();
      this.#currentDropdown = this.#autoComplete;
    }
  }
}
