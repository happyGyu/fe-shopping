import { initialCarouselIdx } from "../constant.js";

export function getCarouselTemplate(carouselData) {
  return `
        <div class="carousel standard-contents">
            <ul class="carousel__main-contents">
                ${carouselData
                  .map((data) => getCarouselContentTemplate("mainImg", data))
                  .join("")}
            </ul>
            <ul class="carousel__thumbnails">
                ${carouselData
                  .map((data) => getCarouselContentTemplate("thumbnail", data))
                  .join("")}
            </ul>
        </div>
    `;
}

function getCarouselContentTemplate(type, contentData) {
  return `
    <li class="carousel__${type} 
        ${type === "mainImg" ? "hidden" : ""}" 
        data-index=${contentData.index}>
        <a href="#">
            <img 
                src=${contentData[`${type}Src`]} 
                alt=${contentData.description} ${type}
            /> 
        </a>
    </li>
    `;
}

export function activateCarousel() {
  const carousel = document.querySelector(".carousel");
  setDefault(carousel);
}

function setDefault(carousel) {
  setDefaultMainContent(carousel);
  setDefaultThumbnail(carousel);
}

function setDefaultMainContent(carousel) {
  const initialMainContent = carousel.querySelector(
    `.carousel__main-contents :nth-child(${initialCarouselIdx + 1})`
  );
  initialMainContent.classList.toggle("hidden");
}

function setDefaultThumbnail(carousel) {
  const initialThumbnail = carousel.querySelector(
    `.carousel__thumbnails :nth-child(${initialCarouselIdx + 1})`
  );
  initialThumbnail.classList.toggle("carousel__thumbnail--selected");
}
