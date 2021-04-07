import './styles.css';
import ImagesApiService from './apiService';
import formTpl from './handelbars/form-markup.hbs';
import gallery from './handelbars/gallery-markup.hbs';
import imageTpl from './handelbars/image-markup.hbs';

const bodyRef = document.querySelector('body');

const BASS_URL = 'https://pixabay.com/api/';

const key = '21045573-d699147f44aaa00ba6588ddf4';
const imagesApiService = new ImagesApiService(BASS_URL, key);

bodyRef.insertAdjacentHTML('afterbegin', formTpl());
const ref = {
  form: document.querySelector('.search-form'),
  searchButton: document.querySelector('.search-button'),
};
bodyRef.insertAdjacentHTML('beforeend', gallery());
ref.form.addEventListener('submit', searchImage);

function searchImage(e) {
  e.preventDefault();

  const category = e.currentTarget.query.value;

  return imagesApiService.fetchImages(category).then(images => {
    renderImages(images);
  });
}
const galleryRef = document.querySelector('.gallery');
function renderImages(images) {
  console.log(images);

  galleryRef.insertAdjacentHTML('beforeend', imageTpl(images));
}
// console.log(ref.form);
// console.log(imagesApiService.fetchImages());
