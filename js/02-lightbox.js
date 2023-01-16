import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryList = document.querySelector(".gallery");
const galleryMarkup = createGallaryItemsMarkup(galleryItems);

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

function createGallaryItemsMarkup(items) {
  return items
    .map(({ description, preview, original }) => {
      return `
        <a class="gallery__item" href="${original}">
          <img
            class="gallery__image" src="${preview}" alt="${description}" />
        </a>`;
    })
    .join("");
}

galleryList.addEventListener("click", onImageClick);

function onImageClick(e) {
    blockStandartAction(e);

    if (e.target.nodeName !== "IMG") {
      return;
    }

    new SimpleLightbox(".gallery a", {
      /* options */
      captionsData: "alt",
      captionDelay: '250',
    });
}

function blockStandartAction(e) {
    e.preventDefault();
}