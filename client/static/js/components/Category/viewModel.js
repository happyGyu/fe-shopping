import { CategoryModel } from "./Model.js";
import { getData } from "../../util.js";
import { Observer } from "../../common/Observer.js";

export class CategoryViewModel {
    #model;
    #viewState;

    constructor() {
        this.#setModel();
        this.#viewState = { layerDepth: null, layerData: null, selectedMenu: null };
        this.observer = new Observer();
    }

    async #setModel() {
        const categoryData = await getData("category");
        this.#model = new CategoryModel(categoryData);
    }

    handleCategoryMouseEnterEvent(parent = null) {
        this.#updateLayerState("main", parent);
    }

    handleLayerMouseMoveEvent(parent = null) {
        this.#updateLayerState("sub", parent);
    }

    #updateLayerState(depth, parent = null) {
        this.#viewState.layerDepth = depth;
        this.#viewState.layerData = parent ? this.#getSubLayerData(parent) : this.#getMainLayerData();
        this.#viewState.selectedMenu = parent;
        this.observer.notify(this.#viewState);
    }

    #getMainLayerData() {
        const menuNames = this.#model.menuNameStore;
        const icons = this.#model.iconSrcStore;
        const mainLayerData = menuNames.map((menuName) => {
            return { name: menuName, icon: icons[menuName] };
        });
        return mainLayerData;
    }

    #getSubLayerData(parentMenuName) {
        const bannerImg = this.#model.bannerImgStore[parentMenuName];
        const subMenus = this.#model.subMenuStore[parentMenuName];
        const subLayerData = { parentMenuName, subMenus, bannerImg };
        return subLayerData;
    }
}
