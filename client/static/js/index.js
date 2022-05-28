import { getData } from "./util.js";
import { Renderer } from "./Renderer.js";

async function main() {
  const renderer = new Renderer();
  const carouselData = await getData("carousel");
  renderer.addCarousel(carouselData);
  const categoryData = await getData("search/category");
  renderer.addSearchCategory(categoryData);
  renderer.addSearchMain();
  renderer.addCategory();
}

main();
