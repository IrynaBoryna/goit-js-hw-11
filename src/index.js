import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.failure("Sorry, there are no images matching your search query. Please try again.");
// Notify.success("Hooray! We found totalHits images.");
// Notify.info("We're sorry, but you've reached the end of search results.");
import axios, {isCancel, AxiosError} from 'axios';
// const axios = require('axios/dist/browser/axios.cjs');
import NewCardGallery from './fetchImages';

const newCardGallery = new NewCardGallery();
let imagesArray = [];
const refs = {
  form: document.querySelector('.search-form'),
  buttonSubmit: document.querySelector('submit'),
  imageCreateCard: document.querySelector(".gallery-item"),
  button: document.querySelector('.load-more'),
}


refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);

function onSearch (e) {
 e.preventDefault();
 newCardGallery.inputSearch = e.currentTarget.elements.searchQuery.value;
 newCardGallery.resetPageNumber();
 refs.imageCreateCard.innerHTML= "";
 refs.button.style.display = "none";
 newCardGallery.fetchImages().then(createImagesList);

}


function onLoadMore() {
  newCardGallery.fetchImages().then(createImagesList);
  // refs.button.style.display = "none";
}


// async function fetchImages(inputSearch) {
//   try {
// //     const response = await axios.get(`${url}?key={API}&q=${inputSearch}}${queryParams}`);
//     console.log(response);
//    } catch (error) {
//     console.error(error);
//   }
// }

function createImagesList() {
   refs.imageCreateCard.insertAdjacentHTML("beforeend", imageCard());
   refs.button.style.display = "";
   refs.buttonSubmit.style.display = "none";
}

   function imageCard (imagesArray) {
    return imagesArray
    .map(({webformatURL, tags, likes, views, comments, downloads }) => {
     return `
     <li style = "list-style: none">
       <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width = 140px/>
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
      <b>Downloads:<span style = "font-style: italic">${downloads}</span></b>
    </p>
  </div>
</div>
</li>
 `;
}).join('');
}
// //   largeImageURL - посилання на велике зображення.
 refs.imageCreateCard.style.display = "flex"; 
 refs.imageCreateCard.style.flexWrap = "wrap";
 refs.imageCreateCard.style.gap = "20px"; 
//  if(inputSearch === "") {
//   refs.countryList.innerHTML = "";
//   refs.countryInfoCard.innerHTML= "";
//   return
//  }