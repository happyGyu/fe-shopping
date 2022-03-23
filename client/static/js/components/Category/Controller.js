import { CategoryModel } from "./Model.js";
import { CategoryView } from "./View.js";
import { cross2D } from "../../util.js";

export class CategoryController {
  constructor() {
    this.model = new CategoryModel();
    this.view = new CategoryView();

    //test중
    this.currLi;
    this.refCoord;
    this.timeoutId;
  }

  activate() {
    this.cacheDOM();
    this.model.activate();
    this.addCategoryBtnEvent();
    this.addCategoryEvent();
    this.addMouseMoveEvent();
  }

  cacheDOM() {
    this.categoryDOM = document.querySelector(".category");
    this.categoryBtnDOM = document.querySelector(".category__btn");
    this.categoryLayerDOM = document.querySelector(".category__layer");
    this.categoryMainLayerDOM = document.querySelector(".category__layer-main");
    this.categoryExtendedLayerDOM = document.querySelector(".category__layer-extended");
  }

  addCategoryBtnEvent() {
    this.categoryBtnDOM.addEventListener("mouseover", () => this.renderMainLayer());
  }

  addCategoryEvent() {
    this.categoryDOM.addEventListener("mouseleave", () => this.clearLayer());
  }

  renderMainLayer() {
    const mainLayerData = this.model.itemNameStore;
    this.categoryMainLayerDOM.innerHTML = this.view.getMainLayerTemplate(mainLayerData);
  }

  renderExtendedLayer(parentName) {
    const extendedLayerData = this.model.depthStore[parentName];
    const extendedLayerTemplate = this.view.getExtendedLayerTemplate(extendedLayerData);
    this.categoryExtendedLayerDOM.innerHTML = extendedLayerTemplate;
    this.getCoordinate();
  }

  clearLayer() {
    this.categoryMainLayerDOM.innerHTML = "";
    this.categoryExtendedLayerDOM.innerHTML = "";
  }

  //테스트중
  addMouseMoveEvent() {
    this.categoryMainLayerDOM.addEventListener("mousemove", (e) => this.handleMouseMoveEvent(e));
    this.categoryMainLayerDOM.addEventListener("mouseout", () => this.handleMouseOutEvent());
  }

  getCoordinate() {
    const topItemRect = this.categoryExtendedLayerDOM.firstElementChild.getBoundingClientRect();
    const bottomItemRect = this.categoryExtendedLayerDOM.lastElementChild.getBoundingClientRect();
    this.topX = topItemRect.left;
    this.topY = topItemRect.top;
    this.bottomX = bottomItemRect.left;
    this.bottomY = bottomItemRect.bottom;
  }

  handleMouseMoveEvent(event) {
    if (event.target.nodeName !== "LI") return;
    if (event.target === this.currLi) return;
    const currCoord = [event.clientX, event.clientY];
    if (this.refCoord) {
      if (this.isInTriangle(...currCoord)) {
        this.timeoutId = setTimeout(() => {
          const targetName = event.target.dataset.name;
          this.renderExtendedLayer(targetName);
        }, 500);
      } else {
        const targetName = event.target.dataset.name;
        this.renderExtendedLayer(targetName);
      }
    }
    this.refCoord = currCoord;
    this.currLi = event.target;
  }

  handleMouseOutEvent() {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }

  isInTriangle(x, y) {
    const vectorToTop = [this.topX - this.refCoord[0], this.topY - this.refCoord[1]];
    const vectorToBottom = [this.bottomX - this.refCoord[0], this.bottomY - this.refCoord[1]];
    const vectorToTarget = [x - this.refCoord[0], y - this.refCoord[1]];
    const crossTopTarget = cross2D(vectorToTop, vectorToTarget);
    const crossTargetBottom = cross2D(vectorToTarget, vectorToBottom);
    return crossTopTarget * crossTargetBottom >= 0;
  }
}
