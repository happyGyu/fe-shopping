import { CategoryViewModel } from "./viewModel.js";
import { smartLayerDelay } from "../../constant.js";
import { Vector } from "../../common/Vector.js";

export class CategoryView {
    #viewModel;
    #smartLayer;
    #categoryDOM;
    #mainLayerDOM;
    #subLayerDOM;

    constructor() {
        this.#setViewModel();
        this.#smartLayer = { selectedItem: null, refMouseCoord: null, timeoutID: null };
    }

    #setViewModel() {
        this.#viewModel = new CategoryViewModel();
        this.#viewModel.observer.subscribe(this);
    }

    detectChangedState(viewState) {
        switch (viewState.layerDepth) {
            case "none":
                this.#clearLayer();
                break;
            case "main":
                this.#renderMainLayer(viewState.layerData);
                break;
            case "sub":
                this.#renderSubLayer(viewState.layerData, viewState.selectedMenu);
                break;
            default:
                console.log("This change has nothing to do with me.");
        }
    }

    #clearLayer() {
        this.#mainLayerDOM.innerHTML = "";
        this.#subLayerDOM.innerHTML = "";
    }
    
    #renderMainLayer(mainLayerData) {
        const mainLayerTemplate = this.#getMainLayerTemplate(mainLayerData);
        this.#mainLayerDOM.innerHTML = mainLayerTemplate;
    }

    #getMainLayerTemplate(mainLayerData) {
        return `
        <ul class="category__layer-main">
          ${mainLayerData
              .map((mainLayerItemData) => this.#getMainLayerItemTemplate(mainLayerItemData))
              .join("")}
        </ul>
      `;
    }

    #getMainLayerItemTemplate(itemData) {
        return `
        <li data-name=${itemData.name}>
          <img class="menu-icon" src=${itemData.icon} />  
          <span class="menu-name">${itemData.name}</span>
          <img class="icon" />
        </li>
      `;
    }

    #renderSubLayer(subLayerData, selectedMenu) {
        const subLayerTemplate = this.#getSubLayerTemplate(subLayerData);
        this.#subLayerDOM.innerHTML = subLayerTemplate;
        this.#setSubLayerBannerImg(subLayerData.bannerImg);
        this.#toggleSelectedMenu(selectedMenu);
    }

    #getSubLayerTemplate(subLayerData) {
        return `
        <ul class="category__layer-main--${subLayerData.parentMenuName}">
          ${subLayerData.subMenus.map((subMenu) => this.#getSubMenuTemplate(subMenu)).join("")}
        </ul>
      `;
    }

    #getSubMenuTemplate(item) {
        return `
          <li data-name=${item}>
            ${item}
          </li>
        `;
    }

    #setSubLayerBannerImg(bannerImgSrc) {
        this.#subLayerDOM.style.backgroundImage = `url(${bannerImgSrc})`;
    }

    #toggleSelectedMenu(newSelectedName) {
        const prevSelected = this.#mainLayerDOM.querySelector(".selected");
        const newSelected = this.#mainLayerDOM.querySelector(`[data-name='${newSelectedName}']`);
        prevSelected?.classList.toggle("selected");
        newSelected.classList.toggle("selected");
    }

    activate() {
        this.#cacheDOM();
        this.#activateCategory();
        this.#activateMainLayer();
    }

    #cacheDOM() {
        this.#categoryDOM = document.querySelector(".category");
        this.#mainLayerDOM = document.querySelector(".category__layer-main");
        this.#subLayerDOM = document.querySelector(".category__layer-extended");
    }

    #activateCategory() {
        this.#categoryDOM.addEventListener("mouseenter", () =>
            this.#viewModel.handleCategoryMouseEnterEvent()
        );
        this.#categoryDOM.addEventListener("mouseleave", () => 
            this.#viewModel.handleCategoryMouseLeaveEvent()
        );
    }

    #activateMainLayer() {
        this.#mainLayerDOM.addEventListener("mouseout", () => this.#handleLayerMouseOutEvent());
        this.#mainLayerDOM.addEventListener("mousemove", (e) =>
            this.#delayMouseMoveEventSmartly(e, (parent) => this.#viewModel.handleLayerMouseMoveEvent(parent))
        );
    }

    #handleLayerMouseOutEvent() {
        clearTimeout(this.#smartLayer.timeoutID);
        this.#smartLayer.timeoutID = null;
    }

    #delayMouseMoveEventSmartly(event, handlerFunction) {
        const currBelongedItem = event.target;
        if (!this.#isValidItem(currBelongedItem)) return;

        const currBelongedItemName = currBelongedItem.dataset.name;
        const currCoord = [event.clientX, event.clientY];
        const updateLayerDelay = this.#isInLayerTriangle(currCoord) ? smartLayerDelay : 0;

        this.#smartLayer.timeoutID = setTimeout(() => {
            handlerFunction(currBelongedItemName);
        }, updateLayerDelay);

        this.#updateSmartLayer(currBelongedItem, currCoord);
    }

    #isValidItem(currItem) {
        const isListItem = currItem.localName === "li";
        const isChanged = currItem !== this.#smartLayer.selectedItem;
        return isListItem && isChanged;
    }

    #isInLayerTriangle(targetCoord) {
        if (!this.#smartLayer.refMouseCoord) return false;
        const [triangleTopCoord, triangleBottomCoord] = this.#getLayerTriangleCoordinate();
        const referenceCoord = this.#smartLayer.refMouseCoord;

        const vectorToTop = new Vector(triangleTopCoord, referenceCoord);
        const vectorToBottom = new Vector(triangleBottomCoord, referenceCoord);
        const vectorToTarget = new Vector(targetCoord, referenceCoord);

        const topTargetCross = vectorToTop.cross2D(vectorToTarget);
        const targetBottomCross = vectorToTarget.cross2D(vectorToBottom);
        return topTargetCross * targetBottomCross >= 0;
    }

    #getLayerTriangleCoordinate() {
        const mainLayerRect = this.#mainLayerDOM.getBoundingClientRect();
        const triangleTopCoord = [mainLayerRect.right, mainLayerRect.top];
        const triangleBottomCoord = [mainLayerRect.right, mainLayerRect.bottom];
        return [triangleTopCoord, triangleBottomCoord];
    }

    #updateSmartLayer(currItem, currCoord) {
        this.#smartLayer.selectedItem = currItem;
        this.#smartLayer.refMouseCoord = currCoord;
    }
}
