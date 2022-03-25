import { Carousel } from "./components/carousel.js";
import { SearchCategory } from "./components/Search/SearchCategory.js";
import { SearchMain } from "./components/Search/SearchMain.js";
import { CategoryView } from "./components/Category/View.js";

export function Renderer() {}

Renderer.prototype.addCarousel = function (carouselData) {
    const carousel = new Carousel(carouselData);
    document.querySelector("body").insertAdjacentHTML("beforeend", carousel.template);
    carousel.activate();
};

Renderer.prototype.addSearchCategory = function (categoryData) {
    const searchCategory = new SearchCategory(categoryData);
    document.querySelector(".search").insertAdjacentHTML("afterbegin", searchCategory.template);
    searchCategory.activate();
};

Renderer.prototype.addSearchMain = function () {
    const searchMain = new SearchMain();
    document.querySelector(".search").insertAdjacentHTML("beforeend", searchMain.template);
    searchMain.activate();
};

Renderer.prototype.addCategory = function () {
    const categoryView = new CategoryView();
    categoryView.activate();
};
