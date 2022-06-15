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

const popupImage = document.querySelector('.popup_open-image');
const imagePopup = popupImage.querySelector('.popup__image');
const imagePopupName = popupImage.querySelector('.popup__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
/*изменение профиля*/
const profilePopup = document.querySelector('.popup_editform');
const profilecontainer = profilePopup.querySelector('.popup__container');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-btn');
const nameInput = profilePopup.querySelector('.popup__input_name');
const aboutInput = profilePopup.querySelector('.popup__input_about');
const editProfileBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profiletext = document.querySelector('.profile__text');

function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  aboutInput.value = profiletext.textContent;
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  profileName.textContent = name;
  const description = aboutInput.value;
  profiletext.textContent = description;
  closePopup(profilePopup);
}
editProfileBtn.addEventListener('click', openProfilePopup);
profilePopupCloseBtn.addEventListener('click', function () {
  closePopup(profilePopup);
});
profilecontainer.addEventListener('submit', profileFormSubmitHandler);


/*попап новой карточки*/
const newElementPopup = document.querySelector('.popup_newplace');
const newElementcontainer = newElementPopup.querySelector('.popup__container');
const newElementPopupCloseBtn = newElementPopup.querySelector('.popup__close-btn');
const placeInput = newElementPopup.querySelector('.popup__input_place');
const urlInput = newElementPopup.querySelector('.popup__input_url');
const newElementButton = document.querySelector('.profile__add-button');
const cardsList = document.querySelector('.cards__list');

function openNewElementPopup() {
  openPopup(newElementPopup);
  placeInput.value = '';
  urlInput.value = '';
}


function newElementFormSubmitHandler(evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(placeInput.value, urlInput.value));
  closePopup(newElementPopup);
}
newElementButton.addEventListener('click', openNewElementPopup);
newElementPopupCloseBtn.addEventListener('click', function () {
  closePopup(newElementPopup);
});
newElementcontainer.addEventListener('submit', newElementFormSubmitHandler);


/*темплайт */
const cardTemplate = document.querySelector('#card_template').content;

function createCard(cardPlace, cardUrl) {
  const newElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardimageTemplate = newElement.querySelector('.card__image');
  const cardtitleTemplate = newElement.querySelector('.card__title');
  
  cardimageTemplate.src = cardUrl;
  cardtitleTemplate.textContent = cardPlace;
  cardimageTemplate.alt = "Фото «" + cardPlace + "»";

  /*удалить карточку*/
  const cardDeleteButton = newElement.querySelector('.card__del');
  cardDeleteButton.addEventListener('click', function (evt) {
    const parent = evt.target.parentElement;
    parent.remove();
  });

  /*поставить лайк*/
  const cardLikeButton = newElement.querySelector('.card__like');
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like_active');
  });

  /*увеличение картинки*/
  const popupImageCloseBtn = popupImage.querySelector('.popup__close-btn');
  popupImageCloseBtn.addEventListener('click', function () {
    closePopup(popupImage);
  });
  const cardImage = newElement.querySelector('.card__image');
  cardImage.addEventListener('click', function () {
    imagePopup.src = cardUrl;
    imagePopup.alt = "Фото «" + cardPlace + "»";
    imagePopupName.textContent = cardPlace;
    openPopup(popupImage);
    });
  return newElement;
}

/*добавление типовых карточек*/
for (let i = 0; i < initialCards.length; i++) {
  cardsList.append(createCard(initialCards[i].name, initialCards[i].link));
}