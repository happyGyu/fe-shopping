import { DropdownList } from "../DropdownList.js";
import { initialSearchCategory } from "../../constant.js";

export class SearchCategory extends DropdownList{
    constructor(categoryData) {
        super();
        this.categoryData = categoryData;
        this.selectedSearchCategory = initialSearchCategory; 
    }

    get template() {
        return this.getSearchCategoryTemplate()
    }

    getSearchCategoryTemplate() {
        return `
            <div class="search__category">
                ${this.getCurrentTemplate()}
                ${this.getDropdownListTemplate(this.categoryData)}
            </div>
        `
    }

    getCurrentTemplate() {
        return `
            <div class="search__category--current">
                <span class="search__category--current-text">${this.selectedSearchCategory}</span>
                <button class="search__category-current-btn"></button>
            </div>
        `
    }
}