import { getData } from "./util/util.js";
import { Carousel } from "./components/Carousel.js";

function main() {
  getData("carousel").then(renderCarousel);
}

function renderCarousel(carouselData) {
  const carousel = new Carousel(carouselData);
  document.querySelector("body").insertAdjacentHTML("beforeend", carousel.template);
  carousel.activate();
}

main();
