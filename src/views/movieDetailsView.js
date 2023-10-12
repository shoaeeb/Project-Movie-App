import { mark } from 'regenerator-runtime';
import { IMG_LINK } from '../config.js';
import View from './view.js';
import { IMAGE_TIMEOUT_SEC } from '../config.js';
import { wait } from '../helper.js';
import icons from 'url:../img/icons.svg';

class MovieDetailsView extends View {
  _parentElement = document.querySelector('.movie--details__container');
  _data;
  _errorMessage =
    'Loading Data Taking a long time !Please Check Your Internet Connection Or Try Again Later ;)';
  _generateMarkup() {
    const markup = `<div class="movie--details">
        <div class="overview__container">

            <h1>${this._data.title}</h1>
            <h2>${this._data.tagline}</h2>
            <h3>About:</h3>
            <p>${this._data.description}</p>
            <p>${this._data.genres}</p>
            <p>Budget:${this._formatNumbers(this._data.budget)}</p>
            <p>Revenue Generated:${this._formatNumbers(this._data.revenue)}</p>
            <div class="bookmark">
                <div>
                    <svg>
                        <use href="${icons}#icon-bookmark${
      this._data.bookmark ? '-fill' : ''
    }"></use>
                    </svg>
                    <p>Add to Watch Later</p>
                </div>
            </div>
            <a href="${this._data.url}" target="_blank">Watch Trailer →</a>
        </div>
    </div>
    `;
    return markup;
  }

  //async/await
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement
      .closest('.movie--details__container')
      .classList.remove('hidden');
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this._styleContainerBackground();
  }

  _styleContainerBackground() {
    document.querySelector('.overview__container').style.backgroundImage = `url(
        ${IMG_LINK}${this._data.imgPath}
      )`;
    document.querySelector('.overview__container').style.backgroundSize =
      'cover';
    document.querySelector('.overview__container').style.backgroundRepeat =
      'no-repeat';
  }
  _formatNumbers(number) {
    return new Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  }

  addLoadHandler(handler) {
    window.addEventListener('load', handler);
  }
}

export default new MovieDetailsView();
