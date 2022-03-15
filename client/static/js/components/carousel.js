import { initialCarouselIdx, autoSlideInterval } from "../constant.js";

export function getCarouselTemplate(carouselData) {
  return `
        <div class="carousel standard-contents" data-length=${carouselData.length}>
            <ul class="carousel__posters">
                ${carouselData.map((data) => getCarouselContentTemplate("poster", data)).join("")}
            </ul>
            <ul class="carousel__thumbnails">
                ${carouselData.map((data) => getCarouselContentTemplate("thumbnail", data)).join("")}
            </ul>
        </div>
    `;
}

function getCarouselContentTemplate(type, contentData) {
  return `
    <li class="carousel__${type}"  
        data-index=${contentData.index}
        data-type=${type}>
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
  togglePageSelection("poster", carousel);
  togglePageSelection("thumbnail", carousel);
  startAutoSlide(carousel);
  carousel
    .querySelector(".carousel__thumbnails")
    .addEventListener("mouseover", (e) => handleThumbnailMouseOverEvent(e));
}

function togglePageSelection(type, carousel, index = initialCarouselIdx) {
  const initialMainContent = carousel.querySelector(`.carousel__${type}s :nth-child(${index + 1})`);
  initialMainContent.classList.toggle(`carousel__${type}--selected`);
}

function startAutoSlide(carousel) {
  const slideIntervalId = setInterval(() => {
    goToNextContent(carousel);
  }, autoSlideInterval);
  return slideIntervalId;
}

//todo: 함수 중복 정리
function goToNextContent(carousel, nextIdx = null) {
  const carouselLength = Number(carousel.dataset.length);
  const currContentIdx = Number(carousel.querySelector(".carousel__thumbnail--selected").dataset.index);
  const nextContentIdx = nextIdx ?? (currContentIdx + 1 + carouselLength) % carouselLength;
  const currSelectedContents = carousel.querySelectorAll(`[data-index='${currContentIdx}']`);
  const nextSelectedContents = carousel.querySelectorAll(`[data-index='${nextContentIdx}']`);
  Array.from(currSelectedContents).forEach((content) =>
    togglePageSelection(content.dataset.type, carousel, currContentIdx)
  );
  Array.from(nextSelectedContents).forEach((content) =>
    togglePageSelection(content.dataset.type, carousel, nextContentIdx)
  );
}

function handleThumbnailMouseOverEvent(event) {
  const carousel = document.querySelector(".carousel");
  const target = event.target.closest("li");
  goToNextContent(carousel, Number(target.dataset.index));
}
