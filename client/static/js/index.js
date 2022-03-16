import { getData } from "./util/util.js";
import { Carousel } from "./components/carousel.js";

function main() {
  getData("carousel").then((result) => {
    const carousel = new Carousel(result);
    document.querySelector("body").insertAdjacentHTML("beforeend", carousel.template);
    carousel.activate();
  });
}

main();
