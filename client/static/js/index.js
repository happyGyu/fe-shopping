import { getData } from "./util/util.js";
import { Carousel } from "./components/Carousel.js";

async function main() {
  const carouselData = await getData("carousel");
  renderCarousel(carouselData);
}

function renderCarousel(carouselData) {
  const carousel = new Carousel(carouselData);
  document.querySelector("body").insertAdjacentHTML("beforeend", carousel.template);
  carousel.activate();
}

main();
