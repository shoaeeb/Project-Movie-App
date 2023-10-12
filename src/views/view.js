import icons from 'url:../img/icons.svg';
export default class View {
  _data;
  _parentElement;
  _errorMessage;
  message;
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error--message__container">
                        <div class="error">
                             <div>
                                <svg>
                                    <use href="${icons}#icon-alert-triangle"></use>
                                </svg>
                                <p>${message}</p>
                             </div>
                     </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner(message) {
    const markup = `<div class="spinner--message__container">
                        <div class="spinner">
                             <div>
                                <svg>
                                    <use href="${icons}#icon-loader"></use>
                                </svg>
                                <p>${message}</p>
                             </div>
                        </div>
                    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //update
  update(data) {
    this._data = data;
    //String
    const newMarkup = this._generateMarkup();

    //compare new markup with the oldMarkup

    //comvert the string into real dom node object
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEle, i) => {
      const curEle = currElements[i];
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild?.nodeValue.trim() != ''
      ) {
        curEle.textContent = newEle.textContent;
      }
      if (!newEle.isEqualNode(curEle)) {
        Array.from(newEle.attributes).forEach(attr => {
          curEle.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
}
