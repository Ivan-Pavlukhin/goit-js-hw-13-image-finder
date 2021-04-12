import './styles.css';
import ImagesApiService from './apiService';
import ScrollWindow from './scripts/windowAutoScroll';
import formTpl from './handelbars/form-markup.hbs';
import gallery from './handelbars/gallery-markup.hbs';
import imageTpl from './handelbars/image-markup.hbs';
import '@pnotify/core/dist/BrightTheme.css';
const { defaults } = require('@pnotify/core');
const { alert, notice, info, success, error } = require('@pnotify/core');
const basicLightbox = require('basiclightbox');
// import * as basicLightbox from 'basiclightbox';

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

// const instance = basicLightbox.create(`
// 	<h1>Dynamic Content</h1>
// 	<p>You can set the content of the lightbox with JS.</p>
// `);

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
  imagesApiService
    .fetchImages()
    .then(data => {
      return data.hits;
    })
    .then(images => {
      appendImagesMarkup(images);

      observer.observe(document.querySelector('.load-more'));
    })
    .catch(er => {
      error('Error');
    });
}

function appendImagesMarkup(images) {
  ref.gallery.insertAdjacentHTML('beforeend', imageTpl(images));
}

function clearImageContainer() {
  ref.gallery.innerHTML = '';
}

ref.gallery.addEventListener('click', onOpenImg);

function onOpenImg(event) {
  if (event.target.src) {
    const src = event.target.getAttribute('data-fullFormat');
    const instance = basicLightbox.create(`
    <img src="${src}" width="800" height="600">
`);
    instance.show();
    console.dir(event.target);
  }
}

// instance.show();
// instance.close();
