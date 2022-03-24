import { CategoryModel } from "./Model.js";
import { getData } from "../../util.js";
import { Observer } from "../../common/Observer.js";

export class CategoryViewModel {
    constructor() {
        this.setModel();
        this.observer = new Observer();

        this.viewState = {
            layerDepth: null,
            mainLayerData: null,
            subLayerData: [],
        };
        this.smartLayer = {
            timeoutID: null,
            selectedItem: null,
            refMouseCoord: null,
            triangleTopCoord: null,
            triangleBottomCoord: null,
        };
    }

    async setModel() {
        const categoryData = await getData("category");
        this.model = new CategoryModel(categoryData);
    }

    handleBtnMouseEnterEvent() {
        this.viewState.layerDepth = "main";
        this.viewState.mainLayerData = this.getMainLayerData();
        this.observer.notify(this.viewState);
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

    handleMainLayerMouseMoveEvent(event) {
        const currItem = event.target;
        if (!this.isValidItem(currItem)) return;
        const currCoord = [event.clientX, event.clientY];

        if (this.isInLayerTriangle(currCoord)) {
            this.smartLayer.timeoutID = setTimeout(() => {
                this.renderExtendedLayer(currItem);
            }, smartLayerDelay);
        } else {
            this.renderExtendedLayer(currItem);
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
}
