import { DropdownList } from "../DropdownList.js";
import { initialSearchCategory } from "../../constant.js";

export class SearchCategory extends DropdownList{
    #searchCategoryDOM;
    #categoryData;
    #selectedSearchCategory;

    constructor(categoryData) {
        super();
        this.#categoryData = categoryData;
        this.#selectedSearchCategory = initialSearchCategory; 
    }

    get template() {
        return this.#getSearchCategoryTemplate()
    }

    #getSearchCategoryTemplate() {
        return `
            <div class="search__category">
                ${this.#getCurrentTemplate()}
                ${this.getDropdownListTemplate(this.#categoryData)}
            </div>
        `
    }

    #getCurrentTemplate() {
        return `
            <div class="search__category--current">
                <span class="search__category--current-text">${this.#selectedSearchCategory}</span>
                <span class="search__category--current-btn"></span>
            </div>
        `;
    }

    activate() {
        this.#searchCategoryDOM = document.querySelector('.search__category');
        this.#activateCurrentCategory();
        this.#searchCategoryDOM.addEventListener('click', (event) => {
            this.#searchCategoryDOM.querySelector('.search__category--current-text').innerText = this.handleClickEvent(event)
        })
    }

    #activateCurrentCategory() {
        const currentCategory = document.querySelector('.search__category--current')
        currentCategory.addEventListener('click', (e) => this.#toggleCategoryListOpen(e)); 
    }

    #toggleCategoryListOpen() {
        const categoryList = this.#searchCategoryDOM.querySelector('.dropdown-list');
        categoryList.classList.toggle('dropdown-list--opened')
    }
}