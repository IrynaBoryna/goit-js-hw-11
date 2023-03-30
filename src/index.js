
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewCardGallery from './fetchImages';

const newCardGallery = new NewCardGallery();
let imagesArray = [];
let cardHeight = 200;
let perPageIm = 40;

const refs = {
  form: document.querySelector('.search-form'),
  buttonSubmit: document.querySelector('button'),
  imageCreateCard: document.querySelector(".gallery-item"),
  button: document.querySelector('.load-more'),
  inputStyle: document.querySelector('input'),
}

refs.button.style.display = "none";

refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);
refs.form.addEventListener('input', updateForm);

function onSearch (e) {
 e.preventDefault();
 newCardGallery.inputSearch = e.currentTarget.elements.searchQuery.value;

 newCardGallery.fetchImages().then(imagesArray => {
  
    refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard(imagesArray));
  gallery.refresh();  
});
 
}
     
function onLoadMore() {
  newCardGallery.fetchImages().then(imagesArray=> {
    refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard(imagesArray));
    gallery.refresh();

    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
    window.scrollBy({
       top: cardHeight * 0.5,
       behavior: "smooth",
    });
  });
  // newCardGallery.fetchImages().then(createImagesList(imagesArray));
}

function updateForm(){

  refs.button.style.display = "none";
  newCardGallery.resetPageNumber();
 refs.imageCreateCard.innerHTML= "";
 }

function imageCard (imagesArray) {
  if (imagesArray.length === perPageIm) {
    refs.button.style.display = "block";
  } else if (imagesArray.length <= perPageIm) {
    refs.button.style.display = "none";
  }
    return imagesArray
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
     return `
     <li>
       <div class="photo-card">
       <a class="gallery__item" href='${largeImageURL}'>
       <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
     </a>
  <div class="info" >
    <p class="info-item">
      <b>Likes: <span >${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views: <span >${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments:<span > ${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads:<span > ${downloads}</span></b>
    </p>
  </div>
</div>
</li>
 `;
}).join('');
}

 const gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });

 

// дорозібратись!!!!
  // window.addEventListener('scroll', populate);

 function onLoadMoreScroll() {
  newCardGallery.fetchImages().then(imagesArray=> {
    refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard(imagesArray));
    gallery.refresh();
  });
}

 function populate() {
   while(true) {
     let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
     if (windowRelativeBottom > document.documentElement.clientHeight + 200) break;
    onLoadMoreScroll(imagesArray)
   }
 }

// чому не працює так:
//  function createImagesList() {
//   refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard(imagesArray));
//   gallery.refresh();
// }
// newCardGallery.fetchImages().then(createImagesList(imagesArray))