import '@pnotify/core/dist/BrightTheme.css';
const { defaults } = require('@pnotify/core');
const { alert, notice, info, success, error } = require('@pnotify/core');
const BASS_URL = 'https://pixabay.com/api/';
const API_KEY = '21045573-d699147f44aaa00ba6588ddf4';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  resetPage() {
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASS_URL}?image_type=photo&orientation=horizontal&page=${this.page}&per_page=12&key=${API_KEY}&q=${this.searchQuery}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.page += 1;

        return data.hits;
      })
      .catch(er => {
        const myError = error({
          text: 'Error',
        });
        return console.log(er);
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
