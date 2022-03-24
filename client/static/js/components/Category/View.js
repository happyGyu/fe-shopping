import { CategoryController } from "./Controller.js";

export class CategoryView {
    constructor() {
        this.controller = new CategoryController();
    }

    activate() {
        this.cacheDOM();
        this.activateCategoryBtn();
    }

    cacheDOM() {
        this.categoryDOM = document.querySelector(".category");
        this.categoryBtnDOM = document.querySelector(".category__btn");
        this.categoryLayerDOM = document.querySelector(".category__layer");
        this.categoryMainLayerDOM = document.querySelector(".category__layer-main");
        this.categoryExtendedLayerDOM = document.querySelector(".category__layer-extended");
    }

    activateCategoryBtn() {
        this.categoryBtnDOM.addEventListener("mouseenter", () => this.renderMainLayer());
    }

    renderMainLayer() {
        const mainLayerData = this.controller.getMainLayerData();
        const mainLayerTemplate = this.getMainLayerTemplate(mainLayerData);
        this.categoryMainLayerDOM.innerHTML = mainLayerTemplate;
    }

    getMainLayerTemplate(mainLayerData) {
        return `
        <ul class="category__layer-main">
          ${mainLayerData
              .map((mainLayerItemData) => this.getMainLayerItemTemplate(mainLayerItemData))
              .join("")}
        </ul>
      `;
    }

    getMainLayerItemTemplate(itemData) {
        return `
        <li data-name=${itemData.name}>
          <img class="menu-icon" src=${itemData.icon} />  
          ${itemData.name}
        </li>
      `;
    }

    getExtendedLayerTemplate(extendedLayerItems) {
        return extendedLayerItems.map((item) => this.getSubCategoryItemTemplate(item)).join("");
    }
}
