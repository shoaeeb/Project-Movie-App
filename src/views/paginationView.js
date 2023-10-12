import View from './view';

class PaginationView extends View {
  _data;
  _parentElement = document.querySelector('.pagination__container');
  goToNext;
  goToPrev;
  _generateMarkup() {
    [this.goToPrev, this.goToNext] = this.calculatePagination();
    // const markup = ` ${goToPrev?`<div class="btn__previous" data-go-to-prev=${goToPrev}>← Page 1</div>`:'
    // ${goToNext? `<div class="btn__next" data-go-to-next="${goToNext}">Page 2 →</div>`:''}`
    let markup = '';
    if (this.goToPrev) {
      markup += `<div class="btn__previous" data-go-to-prev=${this.goToPrev}>← Page ${this.goToPrev}</div>`;
    }
    if (this.goToNext) {
      markup += `<div class="btn__next" data-go-to-next=${this.goToNext}>Page  ${this.goToNext} →</div>`;
    }
    return markup;
  }

  calculatePagination() {
    //if on the first page,and no other page
    if (this._data.currentPage === 1 && this._data.movies.totalPages === 1) {
      //render no pagination button
      return [0, 0];
    }
    //if on the other page and there are other pages
    if (
      this._data.currentPage > 1 &&
      this._data.movies.totalPages > this._data.currentPage
    ) {
      //then print currentPage -1 and currentPage +1

      return [this._data.currentPage - 1, this._data.currentPage + 1];
    }
    //if we are in last page and no other pages
    if (this._data.currentPage === this._data.movies.totalPages) {
      //then render currentPage - 1

      return [this._data.currentPage - 1, 0];
    }
    if (this._data.currentPage === 1 && this._data.movies.totalPages > 1) {
      return [0, this._data.currentPage + 1];
    }
  }

  renderPagination(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.classList.remove('hidden');
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      if (
        !e.target
          .closest('.pagination__container')
          .classList.contains('pagination__container')
      )
        return;
      handler(e.target);
    });
  }
}
export default new PaginationView();
