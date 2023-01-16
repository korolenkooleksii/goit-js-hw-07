import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGallaryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGallaryItemsMarkup(items) {
  return items
    .map(({ description, preview, original }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

galleryContainer.addEventListener("click", onImageClick);
//вешаем на контейнер обработчик слушателя кликов

function onImageClick(e) {
  // запрещаем браузеру стандартное действие на открытие картинки по ссылке
  blockStandartAction(e);

  // проверка на не картинку. если не картинка - выходим
  if (e.target.nodeName !== "IMG") {
    return;
  }

  // если картинка - выполняем код
  const urlBigImg = e.target.dataset.source;
  const instance = basicLightbox.create(`
  <img width="1400" height="900" src="${urlBigImg}">
  `);

  instance.show();

  // закрываем по кнопке esc
  galleryContainer.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      instance.close();
    }
  });
}

function blockStandartAction(e) {
  e.preventDefault();
}
