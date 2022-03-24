export class CategoryView {
  getMainLayerTemplate(mainLayerData) {
    let subCategoryTemplate = "";
    for (const [subCategoryName, subCategoryItems] of mainLayerData) {
      subCategoryTemplate += this.getSubCategoryTemplate(subCategoryName, subCategoryItems);
    }
    return subCategoryTemplate;
  }

  getSubCategoryTemplate(subCategoryName, subCategoryItems) {
    return `
      <ul class="category__layer-main--${subCategoryName}">
        ${subCategoryItems.map((item) => this.getSubCategoryItemTemplate(item)).join("")}
      </ul>
    `;
  }

  getSubCategoryItemTemplate(item) {
    return `
      <li data-name=${item}>
        ${item}
        <i class= "select-icon"></i>
      </li>
    `;
  }

  getExtendedLayerTemplate(extendedLayerItems) {
    return extendedLayerItems.map((item) => this.getSubCategoryItemTemplate(item)).join("");
  }
}
