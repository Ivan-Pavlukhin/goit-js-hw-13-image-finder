import './styles.css';
import ImagesApiService from './apiService';
import ScrollWindow from './scripts/windowAutoScroll';
import formTpl from './handelbars/form-markup.hbs';
import gallery from './handelbars/gallery-markup.hbs';
import imageTpl from './handelbars/image-markup.hbs';
const scrollWindow = new ScrollWindow();
const imagesApiService = new ImagesApiService();
const bodyRef = document.querySelector('body');

const observerHandler = function (entries) {
  if (entries[entries.length - 1].isIntersecting) {
    onLoadMore();
  }
};
const observerOptions = {
  rootMargin: '300px',
};

bodyRef.insertAdjacentHTML('afterbegin', formTpl());
bodyRef.insertAdjacentHTML('beforeend', gallery());

const ref = {
  form: document.querySelector('.search-form'),
  searchButton: document.querySelector('.search-button'),
  loadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

ref.form.addEventListener('submit', searchImage);
// ref.loadMore.addEventListener('click', onLoadMore);

const observer = new IntersectionObserver(observerHandler, observerOptions);

function onLoadMore() {
  return imagesApiService.fetchImages().then(images => {
    scrollWindow.galleryH = ref.gallery.scrollHeight;
    appendImagesMarkup(images);

    // scrollWindow.scroll();
  });
}

function searchImage(e) {
  e.preventDefault();
  clearImageContainer();
  imagesApiService.query = e.currentTarget.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    observer.observe(document.querySelector('.load-more'));
  });
}

function appendImagesMarkup(images) {
  ref.gallery.insertAdjacentHTML('beforeend', imageTpl(images));
}

function clearImageContainer() {
  ref.gallery.innerHTML = '';
}
