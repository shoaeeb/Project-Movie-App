import { mark } from 'regenerator-runtime';
import { IMG_LINK } from '../config.js';
import View from './view.js';
class BookMarkView extends View {
  _parentElement = document.querySelector('.bookmark__container');
  _data;
  _errorMessage = 'No BookMark Yet ;)';
  _containerElement = document.querySelector('.watch__later'); //watch later div
  _bookMarkButton;
  constructor() {
    super();
    this._containerElement.addEventListener('mouseover', () => {
      this._parentElement.classList.remove('hidden');
    });
    window.addEventListener('click', () => {
      this._parentElement.classList.add('hidden');
    });
  }
  _generateMarkup() {
    const markup = this._data
      .map(movie => {
        return `<a class="bookmark_card" href=#${movie.id}>
        <img src="${IMG_LINK}${movie.imgPath}" alt="${movie.title}"/>
        <p>${movie.title}</p>
        <p>Description:</p>
        <p>${movie.description.slice(0, 40)}...readmore</p>
       </a>`;
      })
      .join('');
    return markup;
  }
  //async/await
  render(data) {
    if (!data || data.length === 0) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  init() {
    this._bookMarkButton = document.querySelector('.bookmark');
  }
  addHandlerBookmark(handler) {
    this._bookMarkButton.addEventListener('click', () => {
      handler();
    });
  }
  addHandlerVisible(handler) {
    window.addEventListener('load', () => {
      handler();
    });
  }
}

export default new BookMarkView();
