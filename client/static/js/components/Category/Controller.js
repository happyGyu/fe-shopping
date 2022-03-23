import { CategoryModel } from "./Model.js";
import { CategoryView } from "./View.js";

export class CategoryController {
  constructor() {
    this.model = new CategoryModel();
    this.view = new CategoryView();
  }

  activate() {
    this.cacheDOM();
    this.model.activate();
    this.addCategoryBtnEvent();
    this.addCategoryEvent();
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
    this.addItemHoverEvent();
  }

  clearLayer() {
    this.categoryMainLayerDOM.innerHTML = "";
    this.categoryExtendedLayerDOM.innerHTML = "";
  }

  addItemHoverEvent() {
    this.categoryMainLayerDOM.addEventListener("mouseover", (e) => this.handleMouseHoverEvent(e));
  }

  handleMouseHoverEvent(event) {
    if (event.target.nodeName !== "LI") return;
    const targetName = event.target.dataset.name;
    this.renderExtendedLayer(targetName);
  }

  renderExtendedLayer(parentName) {
    const extendedLayerData = this.model.depthStore[parentName];
    const extendedLayerTemplate = this.view.getExtendedLayerTemplate(extendedLayerData);
    this.categoryExtendedLayerDOM.innerHTML = extendedLayerTemplate;
  }
}
