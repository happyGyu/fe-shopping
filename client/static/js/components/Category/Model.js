export class CategoryModel {
    #categoryData;
    #menuNameStore;
    #bannerImgSrcStore;
    #subMenuStore;
    #iconSrcStore;

    constructor(categoryData) {
        this.#categoryData = categoryData;
        this.#menuNameStore = [];
        this.#subMenuStore = {};
        this.#iconSrcStore = {};
        this.#bannerImgSrcStore = {};
        this.#parseCategoryData();
    }

    #parseCategoryData() {
        for (const menuData of this.#categoryData) {
            const menuName = menuData.name;
            this.#menuNameStore.push(menuName);
            this.#subMenuStore[menuName] = menuData.subMenus;
            this.#iconSrcStore[menuName] = menuData.iconSrc;
            this.#bannerImgSrcStore[menuName] = menuData.bannerImgSrc;
        }
    }

    get menuNameStore() {
        return this.#menuNameStore;
    }

    get bannerImgStore() {
        return this.#bannerImgSrcStore;
    }

    get subMenuStore() {
        return this.#subMenuStore;
    }

    get iconSrcStore() {
        return this.#iconSrcStore;
    }
}
