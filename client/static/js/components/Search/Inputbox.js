class Inputbox {
  #inputTextboxDom;

  constructor() {
    this.searchKeyword;
  }

  getInputboxTemplate() {
    return `
        <div class="search__input">
            <input class="search__input-textbox" type="text" placeholder="찾고 싶은 상품을 검색해보세요!"/>
            <a class="search__input-voice-btn"></a>
            <button class="search__input-send-btn" type="submit"><span class="search-icon"></span></button>
        </div>
    `;
  }

  activateInputTextbox() {
    this.#inputTextboxDom = document.querySelector(".search__input-textbox");
  }

  changeSearchKeyword(searchKeyword) {
    this.searchKeyword = searchKeyword;
    this.#inputTextboxDom.value = searchKeyword;
  }
}
