const initialCards = [{
    name: 'Moscow',
    link: './images/moscow.jpg'
  },
  {
    name: 'Amsterdam',
    link: './images/Ams.jpg'
  },
  {
    name: 'Berlin',
    link: './images/berlin.jpg'
  },
  {
    name: 'Singapore',
    link: './images/singapore.jpg'
  },
  {
    name: 'Madrid',
    link: './images/Madrid.jpg'
  },
  {
    name: 'London',
    link: './images/london.jpg'
  },
];


/*изменение профиля*/
const profilePopup = document.querySelector('.popup_editform');
const profilecontainer = profilePopup.querySelector('.popup__container');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-btn');
const nameInput = profilePopup.querySelector('.popup__input_name');
const aboutInput = profilePopup.querySelector('.popup__input_about');
const profileSubmitButton = profilePopup.querySelector('.popup__submit-btn');
const editProfileBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profiletext = document.querySelector('.profile__text');

function openProfilePopup() {
  profilePopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profiletext.textContent;
}

function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  profileName.textContent = name;
  let description = aboutInput.value;
  profiletext.textContent = description;
  closeProfilePopup();
}
editProfileBtn.addEventListener('click', openProfilePopup);
profilePopupCloseBtn.addEventListener('click', closeProfilePopup);
profilecontainer.addEventListener('submit', profileFormSubmitHandler);


/*попап новой карточки*/
const newElementPopup = document.querySelector('.popup_newplace');
const newElementcontainer = newElementPopup.querySelector('.popup__container');
const newElementPopupCloseBtn = newElementPopup.querySelector('.popup__close-btn');
const placeInput = newElementPopup.querySelector('.popup__input_place');
const urlInput = newElementPopup.querySelector('.popup__input_url');
const newElementSubmitButton = newElementPopup.querySelector('.popup__submit-btn');
const newElementButton = document.querySelector('.profile__add-button');
const cardsList = document.querySelector('.cards__list');

function openNewElementPopup() {
  newElementPopup.classList.add('popup_opened');
  placeInput.value = '';
  urlInput.value = '';
}

function closeNewElementPopup() {
  newElementPopup.classList.remove('popup_opened');
}

function newElementFormSubmitHandler(evt) {
  evt.preventDefault();
  addNewElement(placeInput.value, urlInput.value);
  closeNewElementPopup();
}
newElementButton.addEventListener('click', openNewElementPopup);
newElementPopupCloseBtn.addEventListener('click', closeNewElementPopup);
newElementcontainer.addEventListener('submit', newElementFormSubmitHandler);


/*темплайт */
const cardTemplate = document.querySelector('#card_template').content;

function addNewElement(cardPlace, cardUrl) {
  const newElement = cardTemplate.querySelector('.card').cloneNode(true);
  newElement.querySelector('.card__image').src = cardUrl;
  newElement.querySelector('.card__title').textContent = cardPlace;
  newElement.querySelector('.card__image').alt = "Фото «" + cardPlace + "»";

  /*удалить карточку*/
  const cardDeleteButton = newElement.querySelector('.card__del');
  cardDeleteButton.addEventListener('click', function (evt) {
    let parent = evt.target.parentElement;
    parent.remove();
  });

  /*поставить лайк*/
  const cardLikeButton = newElement.querySelector('.card__like');
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like_active');
  });

  /*увеличение картинки*/
  const OpenImagePopup = document.querySelector('.popup_open-image');
  const OpenImage = OpenImagePopup.querySelector('.popup__image');
  const OpenImageName = OpenImagePopup.querySelector('.popup__subtitle');
  const OpenImaagePopupCloseBtn = OpenImagePopup.querySelector('.popup__close-btn');
  OpenImaagePopupCloseBtn.addEventListener('click', function () {
    OpenImagePopup.classList.remove('popup_opened');
  });
  const smallimage = newElement.querySelector('.card__image');
  smallimage.addEventListener('click', function () {
    OpenImage.src = cardUrl;
    OpenImage.alt = "Фото «" + cardPlace + "»";
    OpenImageName.textContent = cardPlace;
    OpenImagePopup.classList.add('popup_opened');
  })
  cardsList.prepend(newElement);
}

/*добавление типовых карточек*/
for (let i = 0; i < initialCards.length; i++) {
  addNewElement(initialCards[i].name, initialCards[i].link);
}