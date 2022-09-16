import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);


galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(galleryItems) {
    return galleryItems.map(({ description, original, preview }) => {
        return `<a class="gallery__item" href=${original}>
  <img class="gallery__image" src=${preview} alt=${description} />
</a>`;       
    }).join("");
}

var lightbox = new SimpleLightbox('.gallery a', {captionsData:'alt', captionPosition:'bottom', animationSpeed:250});

console.log(lightbox);
