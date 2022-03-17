class SearchBar {
  #inputDom;

  constructor() {
    this.searchKeyword;
  }

  getInputboxTemplate() {
    return `
        <div class="search__bar">
            <input class="search__bar-input" type="text" placeholder="찾고 싶은 상품을 검색해보세요!"/>
            <a class="search__bar-voice-btn"></a>
            <button class="search__input-send-btn" type="submit"><span class="search-icon"></span></button>
        </div>
    `;
  }

  activateInput() {
    this.#inputDom = document.querySelector(".search__input-textbox");
  }

  changeSearchKeyword(searchKeyword) {
    this.searchKeyword = searchKeyword;
    this.#inputTextboxDom.value = searchKeyword;
  }
}
