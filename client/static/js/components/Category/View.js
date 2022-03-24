import { CategoryViewModel } from "./viewModel.js";

export class CategoryView {
    constructor() {
        this.setViewModel();
    }

    setViewModel() {
        this.viewModel = new CategoryViewModel();
        this.viewModel.observer.subscribe(this);
    }

    detectChangedState(viewState) {
        switch (viewState.layerDepth) {
            case "main":
                this.renderMainLayer(viewState.mainLayerData);
                break;
            case "sub":
                this.renderSubLayer(viewState.subLayerData);
                break;
            default:
                console.log("This change has nothing to do with me.");
        }
    }

    activate() {
        this.cacheDOM();
        this.activateBtn();
        //this.activateLayer();
    }

    cacheDOM() {
        this.categoryDOM = document.querySelector(".category");
        this.categoryBtnDOM = document.querySelector(".category__btn");
        this.categoryLayerDOM = document.querySelector(".category__layer");
        this.categoryMainLayerDOM = document.querySelector(".category__layer-main");
        this.categoryExtendedLayerDOM = document.querySelector(".category__layer-extended");
    }

    activateBtn() {
        this.categoryBtnDOM.addEventListener("mouseenter", () => this.viewModel.handleBtnMouseEnterEvent());
    }

    renderMainLayer(mainLayerData) {
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

    activateLayer() {
        this.categoryLayerDOM.addEventListener("mousemove", (e) =>
            this.viewModel.handleLayerMouseMoveEvent(e)
        );
    }

    renderExtendedLayer() {}

    getExtendedLayerTemplate(extendedLayerItems) {
        return extendedLayerItems.map((item) => this.getSubCategoryItemTemplate(item)).join("");
    }

    getSubCategoryItemTemplate(item) {
        return `
          <li data-name=${item}>
            ${item}
            <i class= "select-icon"></i>
          </li>
        `;
    }
}
