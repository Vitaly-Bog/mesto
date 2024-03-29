export class Card {
  constructor(name, link, card_template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._card_template = card_template;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._handleCardClick = handleCardClick;
  }

  //карточка
  _getTemplate() {
      const cardElement = document
      .querySelector(this._card_template)
      .content
      .querySelector('.card')
      .cloneNode(true);
      return cardElement;
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }


  //лайк
  _handleLikeButton(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  //delete
  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  //открытие картинки
  _handleImageClick() {
    this._handleCardClick(this._name, this._link)
  }


  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });

    this._element.querySelector('.card__del').addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

}