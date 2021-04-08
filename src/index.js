import './styles.css';
import ImagesApiService from './apiService';
import ScrollWindow from './scripts/windowAutoScroll';
import formTpl from './handelbars/form-markup.hbs';
import gallery from './handelbars/gallery-markup.hbs';
import imageTpl from './handelbars/image-markup.hbs';
const bodyRef = document.querySelector('body');

const scrollWindow = new ScrollWindow();
const imagesApiService = new ImagesApiService();

bodyRef.insertAdjacentHTML('afterbegin', formTpl());
const ref = {
  form: document.querySelector('.search-form'),
  searchButton: document.querySelector('.search-button'),
};
bodyRef.insertAdjacentHTML('beforeend', gallery());
ref.form.addEventListener('submit', searchImage);
const loadMoreRef = document.querySelector('.load-more');
loadMoreRef.addEventListener('click', onLoadMore);

function onLoadMore() {
  return imagesApiService.fetchImages().then(images => {
    scrollWindow.galleryH = galleryRef.scrollHeight;
    appendImagesMarkup(images);

    scrollWindow.scroll();
  });
}

function searchImage(e) {
  e.preventDefault();
  clearImageContainer();
  imagesApiService.query = e.currentTarget.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    // scrollWindow.hight = galleryRef.scrollHeight;
  });
}

const galleryRef = document.querySelector('.gallery');

function appendImagesMarkup(images) {
  galleryRef.insertAdjacentHTML('beforeend', imageTpl(images));
  console.dir(galleryRef.scrollHeight);
}

function clearImageContainer() {
  galleryRef.innerHTML = '';
}
