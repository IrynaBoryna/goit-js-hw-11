import axios  from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class NewCardGallery {
    constructor () {
    this.pageNumber === 1;
    this.inputSearch = ""; 
    this.totalhits === 0;
    }

 fetchImages() {
    const url = `https://pixabay.com/api/`;
    const API = '34651523-b14eec117de44e9d721437a63'
    const queryParams = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

    return axios.get(`${url}?key=${API}&q=${this.inputSearch}${queryParams}&page=${this.pageNumber}`)
  .then(response => {
    console.log(response.data.totalHits);
  
   console.log(response.data.hits);

   this.incrementPageNamber();
   this.incrementTotalHits ();
  
   return response.data.hits;
   
   })
  .catch(error => 
        console.error()
  );
  };

incrementPageNamber () {
    this.pageNumber += 1;
}

incrementTotalHits () {
    this.totalhits += 40;
    if (response.data.totalHits === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else if (this.totalhits >= response.data.totalHits && response.data.totalHits !== 0) {
      Notify.success(`We're sorry, but you've reached the end of search results.`);
    console.log(response.data.totalHits);
    } else {
      Notify.success(`Hooray! We found ${this.totalhits} totalHits images.`)
    }
    console.log(this.totalhits, this.pageNumber);
}

resetPageNumber () {
    this.pageNumber = 1;
    this.totalhits = 0;
}
}

// export  async function fetchImages(name) {
//     try {
//       console.log(`${url}?key={API}&q=${name}}${queryParams}`);
  
//       const response = await axios.get(`${url}?key={API}&q=${name}}${queryParams}`);
//       console.log(response);
//      } catch (error) {
//       console.error(error);
//     }
//   }

  
      
