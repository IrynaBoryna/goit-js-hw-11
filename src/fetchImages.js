import axios  from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const url = `https://pixabay.com/api/`;
const API = '34651523-b14eec117de44e9d721437a63'
const queryParams = '&image_type=photo&orientation=horizontal&safesearch=true';
const perPage = `5`

export default class NewCardGallery {
    constructor () {
    this.pageNumber === 1;
    this.inputSearch = ""; 
    this.totalhits === 0;
    }


async fetchImages() {
  try { const response =  await axios.get(`${url}?key=${API}&q=${this.inputSearch}${queryParams}&per_page=${perPage}&page=${this.pageNumber}`);
  this.totalhits += 5;
  if (response.data.hits.length === 0 ) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
     } else if (response.data.totalHits <= this.totalhits ) {
    Notify.success(`We're sorry, but you've reached the end of search results.`);

  } else {
    Notify.success(`Hooray! We found ${this.totalhits} totalHits images.`)
  }
     this.incrementPageNamber();
      return response.data.hits;
} catch (error) {
     console.log(error);
  }
  };

incrementPageNamber () {
    this.pageNumber += 1;
   }


resetPageNumber () {
    this.pageNumber = 1;
    this.totalhits = 0;
}
}

 