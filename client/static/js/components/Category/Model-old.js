import { getData } from "../../util.js";

export class CategoryModel {
  #categoryData;
  #itemNameStore;
  #bannerImgSrcStore;
  #depthStore;

  constructor() {
    this.#categoryData;
    this.#itemNameStore = new Map();
    this.#bannerImgSrcStore = {};
    this.#depthStore = {};
  }

  async activate() {
    this.#categoryData = await getData("category");
    this.#parseCategoryData();
  }

  get itemNameStore() {
    return this.#itemNameStore;
  }

  get bannerImgStore() {
    return this.#bannerImgSrcStore;
  }

  get depthStore() {
    return this.#depthStore;
  }

  #parseCategoryData() {
    for (const subCategoryData of this.#categoryData) {
      const subCategoryName = subCategoryData.name;
      const items = subCategoryData.items;
      const itemNames = [];
      for (const item of items) {
        const itemName = item.name;
        itemNames.push(itemName);
        this.#bannerImgSrcStore[itemName] = item.bannerImgSrc;
        this.#depthStore[itemName] = item.depth;
      }
      this.#itemNameStore.set(subCategoryName, itemNames);
    }
  }
}
