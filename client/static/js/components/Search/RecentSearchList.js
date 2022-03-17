import { DropdownList } from "../DropdownList.js";

export class RecentSearchList extends DropdownList {
  getTemplate(recentSearchData) {
    return `
      <div class="search__recent">
        ${this.getTitleTemplate()}
        ${this.getDropdownListTemplate(recentSearchData)}
        ${this.getUtilBarTemplate()}
      </div>
    `;
  }

  getTitleTemplate() {
    return `<div class="search__recent-title">최근 검색어</div>`;
  }

  getUtilBarTemplate() {
    return `
      <div class="search__recent-util">
        <button class="search__recent-util--delete-all" type="button">전체삭제</button>
        <button class="search__recent-util--off" type="button">최근검색어끄기</button>
      </div>
    `;
  }
}
