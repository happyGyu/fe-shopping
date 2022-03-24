import { CategoryModel } from "./Model.js";
import { getData } from "../../util.js";
import { Observer } from "../../common/Observer.js";

export class CategoryViewModel {
    constructor() {
        this.setModel();
        this.observer = new Observer();
        this.viewState = { layerDepth: null, layerData: null };
    }

    async setModel() {
        const categoryData = await getData("category");
        this.model = new CategoryModel(categoryData);
    }

    updateLayerState(depth, parent = null) {
        this.viewState.layerDepth = depth;
        this.viewState.layerData = parent ? this.getSubLayerData(parent) : this.getMainLayerData();
        this.observer.notify(this.viewState);
    }

    getMainLayerData() {
        const menuNames = this.model.menuNameStore;
        const icons = this.model.iconSrcStore;
        const mainLayerData = menuNames.map((menuName) => {
            return { name: menuName, icon: icons[menuName] };
        });
        return mainLayerData;
    }

    getSubLayerData(parentMenuName) {
        const bannerImg = this.model.bannerImgStore[parentMenuName];
        const subMenus = this.model.subMenuStore[parentMenuName];
        const subLayerData = { parentMenuName, subMenus, bannerImg };
        return subLayerData;
    }
}
