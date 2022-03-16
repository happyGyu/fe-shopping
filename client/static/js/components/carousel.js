import { initialCarouselIdx, autoSlideInterval } from "../constant.js";

export class Carousel {
  #carouselDOM;
  #carouselData;
  #slideIntervalID;

  constructor(carouselData) {
    this.#carouselData = carouselData;
  }

  get template() {
    return this.#composeTemplate();
  }

  #composeTemplate() {
    return `
      <div class="carousel standard-contents" data-length=${this.#carouselData.length}>
        <ul class="carousel__posters">
          ${this.#carouselData.map((data) => this.#makeContentTemplate("poster", data)).join("")}
        </ul>
        <ul class="carousel__thumbnails">
          ${this.#carouselData.map((data) => this.#makeContentTemplate("thumbnail", data)).join("")}
        </ul>
      </div>
    `;
  }

  #makeContentTemplate(type, contentData) {
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

  activate() {
    this.#carouselDOM = document.querySelector(".carousel");
    this.#toggleContentSelection(initialCarouselIdx);
    this.#startAutoSlide();
    this.#addThumbnailEvent();
  }

  #toggleContentSelection(contentIdx) {
    const targetContentList = this.#carouselDOM.querySelectorAll(`[data-index='${contentIdx}']`);
    Array.from(targetContentList).forEach((content) =>
      content.classList.toggle(`carousel__${content.dataset.type}--selected`)
    );
  }

  #startAutoSlide() {
    this.#slideIntervalID = setInterval(() => {
      this.#goToNextContent();
    }, autoSlideInterval);
  }

  #goToNextContent(nextIdx = null) {
    const carouselLength = this.#carouselData.length;
    const currContentIdx = Number(
      this.#carouselDOM.querySelector(".carousel__thumbnail--selected").dataset.index
    );
    const nextContentIdx = nextIdx ?? (currContentIdx + 1 + carouselLength) % carouselLength;
    this.#toggleContentSelection(currContentIdx);
    this.#toggleContentSelection(nextContentIdx);
  }

  #addThumbnailEvent() {
    const thumbnailsDOM = this.#carouselDOM.querySelector(".carousel__thumbnails");
    thumbnailsDOM.addEventListener("mouseover", (e) => this.#handleThumbnailMouseOverEvent(e));
  }

  #handleThumbnailMouseOverEvent(event) {
    const target = event.target.closest("li");
    this.#goToNextContent(Number(target.dataset.index));
  }
}


