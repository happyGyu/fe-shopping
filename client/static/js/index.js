import { getData } from "./util/util.js";
import { Carousel } from "./components/Carousel.js";
import { SearchCategory } from "./components/search/SearchCategory.js"

async function main() {
  const carouselData = await getData("carousel");
  renderCarousel(carouselData);
  const categoryData = await getData("search/category");
  renderSearchCategory(categoryData);
}

function renderCarousel(carouselData) {
  const carousel = new Carousel(carouselData);
  document.querySelector("body").insertAdjacentHTML("beforeend", carousel.template);
  carousel.activate();
}

function renderSearchCategory(categoryData) {
  const searchCategory = new SearchCategory(categoryData);
  document.querySelector(".search").insertAdjacentHTML("afterbegin", searchCategory.template);
  searchCategory.activate();
}

main();
