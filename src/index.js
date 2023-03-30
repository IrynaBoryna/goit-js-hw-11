
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import NewCardGallery from './fetchImages';

const newCardGallery = new NewCardGallery();
let imagesArray = [];
let cardHeight = 200;

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
  if (imagesArray = [] ) {
    console.log(imagesArray);
    return;
  }
  // const markup =  imageCard(imagesArray);
  // refs.imageCreateCard.insertAdjacentHTML("beforeend", markup);
  refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard(imagesArray));
  gallery.refresh();
   
});
 refs.button.style.display = "block";
 refs.buttonSubmit.style.display = "none";
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

// window.addEventListener('scroll', populate);

function populate() {
  while(true) {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom > document.documentElement.clientHeight + 200) break;
   onLoadMoreScroll(imagesArray)
  }
}

function onLoadMoreScroll() {
  newCardGallery.fetchImages().then(imagesArray=> {
    refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard(imagesArray));
    gallery.refresh();
  });
}



function createImagesList() {
   refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard(imagesArray));
   gallery.refresh();
}

function imageCard (imagesArray) {
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

function updateForm(){
  refs.buttonSubmit.style.display = "block";
  refs.button.style.display = "none";
  newCardGallery.resetPageNumber();
 refs.imageCreateCard.innerHTML= "";
 }

 const gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });

 


