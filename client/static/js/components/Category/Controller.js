import { CategoryModel } from "./Model.js";
import { CategoryView } from "./View.js";
import { cross2D } from "../../util.js";
import { smartLayerDelay } from "../../constant.js";

export class CategoryController {
  #model;
  #view;
  #smartLayer = {
    timeoutID: null,
    selectedItem: null,
    refMouseCoord: null,
    triangleTopCoord: null,
    triangleBottomCoord: null,
  };

  constructor() {
    this.#model = new CategoryModel();
    this.#view = new CategoryView();
  }

  activate() {
    this.#model.activate();
    this.#cacheDOM();
    this.#addMouseEvents();
  }

  #cacheDOM() {
    this.categoryDOM = document.querySelector(".category");
    this.categoryBtnDOM = document.querySelector(".category__btn");
    this.categoryLayerDOM = document.querySelector(".category__layer");
    this.categoryMainLayerDOM = document.querySelector(".category__layer-main");
    this.categoryExtendedLayerDOM = document.querySelector(".category__layer-extended");
  }

  #addMouseEvents() {
    this.#addCategoryEnterEvent();
    this.#addCategoryLeaveEvent();
    this.#addMainLayerMoveEvent();
    this.#addMainLayerOutEvent();
  }

  #addCategoryEnterEvent() {
    this.categoryDOM.addEventListener("mouseenter", () => this.#renderMainLayer());
  }

  #renderMainLayer() {
    const mainLayerData = this.#model.itemNameStore;
    const mainLayerTemplate = this.#view.getMainLayerTemplate(mainLayerData);
    this.categoryMainLayerDOM.innerHTML = mainLayerTemplate;
  }

  #addCategoryLeaveEvent() {
    this.categoryDOM.addEventListener("mouseleave", () => this.#clearLayer());
  }

  #clearLayer() {
    this.categoryMainLayerDOM.innerHTML = "";
    this.categoryExtendedLayerDOM.innerHTML = "";
  }

  #addMainLayerMoveEvent() {
    this.categoryMainLayerDOM.addEventListener("mousemove", (e) => this.#handleMouseMoveEvent(e));
  }

  #handleMouseMoveEvent(event) {
    const currItem = event.target;
    if (!this.#isValidItem(currItem)) return;
    const currCoord = [event.clientX, event.clientY];

    if (this.#isInLayerTriangle(currCoord)) {
      this.#smartLayer.timeoutID = setTimeout(() => {
        this.#renderExtendedLayer(currItem);
      }, smartLayerDelay);
    } else {
      this.#renderExtendedLayer(currItem);
    }
    this.#smartLayer.selectedItem = currItem;
    this.#smartLayer.refMouseCoord = currCoord;
  }

  #isValidItem(currItem) {
    const isListItem = currItem.localName === "li";
    const isChanged = currItem !== this.#smartLayer.selectedItem;
    return isListItem && isChanged;
  }

  #isInLayerTriangle(targetCoord) {
    if (!this.#smartLayer.refMouseCoord) return false;
    const [targetX, targetY] = targetCoord;
    const [refMouseX, refMouseY] = this.#smartLayer.refMouseCoord;
    const [topX, topY] = this.#smartLayer.triangleTopCoord;
    const [bottomX, bottomY] = this.#smartLayer.triangleBottomCoord;

    const vectorToTop = [topX - refMouseX, topY - refMouseY];
    const vectorToBottom = [bottomX - refMouseX, bottomY - refMouseY];
    const vectorToTarget = [targetX - refMouseX, targetY - refMouseY];

    const topTargetCross = cross2D(vectorToTop, vectorToTarget);
    const targetBottomCross = cross2D(vectorToTarget, vectorToBottom);

    return topTargetCross * targetBottomCross >= 0;
  }

  #renderExtendedLayer(parentItem) {
    const targetName = parentItem.dataset.name;
    const extendedLayerData = this.#model.depthStore[targetName];
    const extendedLayerTemplate = this.#view.getExtendedLayerTemplate(extendedLayerData);
    this.categoryExtendedLayerDOM.innerHTML = extendedLayerTemplate;
    this.#updateSmartLayerCoordinate();
  }

  #updateSmartLayerCoordinate() {
    const topItemRect = this.categoryExtendedLayerDOM.firstElementChild.getBoundingClientRect();
    const bottomItemRect = this.categoryExtendedLayerDOM.lastElementChild.getBoundingClientRect();
    this.#smartLayer.triangleTopCoord = [topItemRect.left, topItemRect.top];
    this.#smartLayer.triangleBottomCoord = [bottomItemRect.left, bottomItemRect.bottom];
  }

  #addMainLayerOutEvent() {
    this.categoryMainLayerDOM.addEventListener("mouseout", () => this.#handleMouseOutEvent());
  }

  #handleMouseOutEvent() {
    clearTimeout(this.#smartLayer.timeoutID);
    this.#smartLayer.timeoutID = null;
  }
}
