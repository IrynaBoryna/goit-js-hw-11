
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import NewCardGallery from './fetchImages';

const newCardGallery = new NewCardGallery();
let imagesArray = [];


const refs = {
  form: document.querySelector('.search-form'),
  buttonSubmit: document.querySelector('button'),
  imageCreateCard: document.querySelector(".gallery-item"),
  button: document.querySelector('.load-more'),
}

refs.button.style.display = "none";

refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);
refs.form.addEventListener('input', updateForm);

function onSearch (e) {
 e.preventDefault();
 newCardGallery.inputSearch = e.currentTarget.elements.searchQuery.value;
 newCardGallery.fetchImages().then(imagesArray => {
  
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
  });
  // newCardGallery.fetchImages().then(createImagesList(imagesArray));
}



function createImagesList() {
   refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard(imagesArray));
   gallery.refresh();
}

   function imageCard (imagesArray) {
    return imagesArray
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
     return `
     <li style = "list-style: none">
       <div class="photo-card">
       <a class="gallery__item" href='${largeImageURL}'>
       <img src="${webformatURL}" alt="${tags}" loading="lazy" width = 140px/>
     </a>
  <div class="info">
    <p class="info-item" style = "font-size: 10px">
      <b>Likes: <span style = "font-style: italic">${likes}</span></b>
    </p>
    <p class="info-item" style = "font-size: 10px">
      <b>Views: <span style = "font-style: italic">${views}</span></b>
    </p>
    <p class="info-item" style = "font-size: 10px">
      <b>Comments:<span style = "font-style: italic"> ${comments}</span></b>
    </p>
    <p class="info-item" style = "font-size: 10px">
      <b>Downloads:<span style = "font-style: italic"> ${downloads}</span></b>
    </p>
  </div>
</div>
</li>
 `;
}).join('');
}

 refs.imageCreateCard.style.display = "flex"; 
 refs.imageCreateCard.style.flexWrap = "wrap";
 refs.imageCreateCard.style.gap = "20px"; 


 const gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });

 function updateForm(){
  refs.buttonSubmit.style.display = "block";
  refs.button.style.display = "none";
  newCardGallery.resetPageNumber();
 refs.imageCreateCard.innerHTML= "";
 }