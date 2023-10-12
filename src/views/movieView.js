import { mark } from 'regenerator-runtime';
import { IMG_LINK } from '../config.js';
import View from './view.js';
import { IMAGE_TIMEOUT_SEC } from '../config.js';
import { wait } from '../helper.js';
class MovieView extends View {
  _parentElement = document.querySelector('.movie__container');
  _data;
  _errorMessage =
    'Loading Data Taking a long time !Please Check Your Internet Connection Or Try Again Later ;)';
  allImages;
  _form = document.querySelector('#search');
  userSearch = document.querySelector('input[type="search"]');
  _generateMarkup() {
    const markup = this._data
      .map(movie => {
        return `<a class="card" href=#${movie.id}>
        <img class="lazy-loading" src="${IMG_LINK}${movie.imgPath}" alt="${
          movie.title
        } image">
        <div>
        <h5>${movie.title}</h5>
        <p>Popularity ${movie.popularity.toFixed(2, 0)}</p>
        <p>Description:</p>
        <p>${movie.overview.slice(0, 90)} ...read more</p>
        </div>
       </a>`;
      })
      .join('');
    return markup;
  }

  //async/await
  render(data) {
    if (!data || data.length == 0)
      return this.renderError(
        "Can't Find the movie you are looking for! Please try another keyword"
      );
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = '';
    wait(IMAGE_TIMEOUT_SEC).then(() => console.log('Waiting'));
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this.allImages = document.querySelectorAll('.lazy-loading');
  }

  addHandler(handler) {
    this.allImages.forEach(img => {
      img.addEventListener('load', () => {
        handler(img);
      });
    });
  }

  //load  handler
  addLoadHandler(handler) {
    window.addEventListener('load', handler);
  }

  //listen for hash change
  addLoadMovieHandler(handler) {
    window.addEventListener('hashchange', handler);
  }

  //add search handler
  addSearchHandler(handler) {
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }

  //renderPagination

  //updateCurrentpage
}

export default new MovieView();
