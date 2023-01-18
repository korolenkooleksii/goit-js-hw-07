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

let instance = {};

function onImageClick(e) {
  // запрещаем браузеру стандартное действие на открытие картинки по ссылке
  blockStandartAction(e);

  // проверка на не картинку. если не картинка - выходим
  if (e.target.nodeName !== "IMG") {
    return;
  }

  // если картинка - выполняем код
  const urlBigImg = e.target.dataset.source;
  instance = basicLightbox.create(`
  <img width="1400" height="900" src="${urlBigImg}">
  `);
  
  // запуск шоу
  instance.show();

  // вешаем слушателя события на виндоу 
  window.addEventListener("keydown", onCloseBigImg);
}

//закрытие шоу
function onCloseBigImg(e) {
  // если нажали Esc закрываем шоу
  if (e.code === "Escape") {
    instance.close();
  }
  // снимаем слушателя события на виндоу
  window.removeEventListener("keydown", onCloseBigImg);
};

//запрещение браузеру открытие картинки по клику на ссылку
function blockStandartAction(e) {
  e.preventDefault();
}
