import { CategoryViewModel } from "./viewModel.js";
import { cross2D } from "../../util.js";
import { smartLayerDelay } from "../../constant.js";

export class CategoryView {
    constructor() {
        this.setViewModel();
        this.smartLayer = {
            timeoutID: null,
            selectedItem: null,
            refMouseCoord: null,
            triangleTopCoord: null,
            triangleBottomCoord: null,
        };
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
        this.activateCategory();
        this.activateMainLayer();
    }

    cacheDOM() {
        this.categoryDOM = document.querySelector(".category");
        this.btnDOM = document.querySelector(".category__btn");
        this.layerDOM = document.querySelector(".category__layer");
        this.mainLayerDOM = document.querySelector(".category__layer-main");
        this.subLayerDOM = document.querySelector(".category__layer-extended");
    }

    activateCategory() {
        this.categoryDOM.addEventListener("mouseenter", () => this.viewModel.updateMainLayerState());
        this.categoryDOM.addEventListener("mouseleave", () => this.clearLayer());
    }

    clearLayer() {
        this.mainLayerDOM.innerHTML = "";
        this.subLayerDOM.innerHTML = "";
    }

    renderMainLayer(mainLayerData) {
        const mainLayerTemplate = this.getMainLayerTemplate(mainLayerData);
        this.mainLayerDOM.innerHTML = mainLayerTemplate;
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

    activateMainLayer() {
        this.layerDOM.addEventListener("mousemove", (e) => this.handleLayerMouseMoveEvent(e));
        this.layerDOM.addEventListener("mouseout", () => this.handleLayerMouseOutEvent());
    }

    handleLayerMouseOutEvent() {
        clearTimeout(this.smartLayer.timeoutID);
        this.smartLayer.timeoutID = null;
    }

    handleLayerMouseMoveEvent(event) {
        const currItem = event.target;
        if (!this.isValidItem(currItem)) return;
        const currCoord = [event.clientX, event.clientY];
        const currItemName = currItem.dataset.name;
        this.updateSmartLayerCoordinate();
        if (this.isInLayerTriangle(currCoord)) {
            this.smartLayer.timeoutID = setTimeout(() => {
                this.viewModel.updateSubLayerState(currItemName);
            }, smartLayerDelay);
        } else {
            this.viewModel.updateSubLayerState(currItemName);
        }
        this.smartLayer.selectedItem = currItem;
        this.smartLayer.refMouseCoord = currCoord;
    }

    isValidItem(currItem) {
        const isListItem = currItem.localName === "li";
        const isChanged = currItem !== this.smartLayer.selectedItem;
        return isListItem && isChanged;
    }

    isInLayerTriangle(targetCoord) {
        if (!this.smartLayer.refMouseCoord) return false;
        const [targetX, targetY] = targetCoord;
        const [refMouseX, refMouseY] = this.smartLayer.refMouseCoord;
        const [topX, topY] = this.smartLayer.triangleTopCoord;
        const [bottomX, bottomY] = this.smartLayer.triangleBottomCoord;

        const vectorToTop = [topX - refMouseX, topY - refMouseY];
        const vectorToBottom = [bottomX - refMouseX, bottomY - refMouseY];
        const vectorToTarget = [targetX - refMouseX, targetY - refMouseY];

        const topTargetCross = cross2D(vectorToTop, vectorToTarget);
        const targetBottomCross = cross2D(vectorToTarget, vectorToBottom);

        return topTargetCross * targetBottomCross >= 0;
    }

    updateSmartLayerCoordinate() {
        const mainLayerRect = this.mainLayerDOM.getBoundingClientRect();
        this.smartLayer.triangleTopCoord = [mainLayerRect.right, mainLayerRect.top];
        this.smartLayer.triangleBottomCoord = [mainLayerRect.right, mainLayerRect.bottom];
    }

    renderSubLayer(subLayerData) {
        const subLayerTemplate = this.getSubLayerTemplate(subLayerData);
        this.subLayerDOM.innerHTML = subLayerTemplate;
    }

    getSubLayerTemplate(subLayerData) {
        return `
        <ul class="category__layer-main--${subLayerData.parentMenuName}">
          ${subLayerData.subMenus.map((subMenu) => this.getSubMenuTemplate(subMenu)).join("")}
        </ul>
      `;
    }

    getSubMenuTemplate(item) {
        return `
          <li data-name=${item}>
            ${item}
            <i class= "select-icon"></i>
          </li>
        `;
    }
}
