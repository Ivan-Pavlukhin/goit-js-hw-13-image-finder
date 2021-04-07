export default class ImageApiService {
  constructor(BASS_URL, key) {
    this.key = key;
    this.BASS_URL = BASS_URL;
  }

  fetchImages(category) {
    let page = 1;
    const url = `${this.BASS_URL}?image_type=photo&orientation=horizontal&page=${page}&per_page=12&key=${this.key}&q=${category}`;

    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => data.hits)
      .catch(error => console.log(error));
    page += 1;
  }
}
