export default class ScrollWindow {
  constructor() {
    this.galleryHight = 0;
  }

  scroll() {
    window.scrollTo({
      top: this.galleryHight,
    });
  }

  get galleryH() {
    return this.galleryHight;
  }

  set galleryH(newGalleryH) {
    this.galleryHight = newGalleryH;
  }
}
