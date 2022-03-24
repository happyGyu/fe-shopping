import { CategoryModel } from "./Model.js";
import { getData } from "../../util.js";

export class CategoryController {
    constructor() {
        this.setModel();
    }

    async setModel() {
        const categoryData = await getData("category");
        this.model = new CategoryModel(categoryData);
    }

    getMainLayerData() {
        const menuNames = this.model.menuNameStore;
        const icons = this.model.iconSrcStore;
        const mainLayerData = [];
        for (const menuName of menuNames) {
            mainLayerData.push({ name: menuName, icon: icons[menuName] });
        }
        return mainLayerData;
    }
}
