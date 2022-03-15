import { getData } from "./util/util.js";
import {
  getCarouselTemplate,
  activateCarousel,
} from "./components/carousel.js";

function main() {
  getData("carousel").then((result) => {
    document
      .querySelector("body")
      .insertAdjacentHTML("beforeend", getCarouselTemplate(result));
    activateCarousel();
  });
}

main();
