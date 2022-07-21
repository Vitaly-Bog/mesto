import {
  initialCards
} from './initialCards.js';
import {
  Card
} from './Card.js';
import {
  config
} from './Config.js';
import {
  FormValidator
} from './Formvalidator.js';

/*увеличение картинки*/
const popupImage = document.querySelector(".popup_open-image");
const imagePopup = popupImage.querySelector(".popup__image");
const imagePopupName = popupImage.querySelector(".popup__subtitle");

/*изменение профиля*/
const profilePopup = document.querySelector(".popup_editform");
const profileFormElement = profilePopup.querySelector(".popup__form");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-btn");
const nameInput = profilePopup.querySelector(".popup__input_name");
const aboutInput = profilePopup.querySelector(".popup__input_about");
const ProfileEditBtn = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profiletext = document.querySelector(".profile__text");

/*попап новой карточки*/
const newElementPopup = document.querySelector(".popup_newplace");
const newElementForm = newElementPopup.querySelector(".popup__newform");
const newElementPopupCloseBtn = newElementPopup.querySelector(".popup__close-btn");
const placeInput = newElementPopup.querySelector(".popup__input_place");
const urlInput = newElementPopup.querySelector(".popup__input_url");
const newElementButton = document.querySelector(".profile__add-button");
const cardsList = document.querySelector(".cards__list");
const popupButton = newElementPopup.querySelector(".popup__button");


/*темплайт */
const cardTemplate = document.querySelector("#card_template").content;


/*валидация*/
const formEditProfile = new FormValidator(config, profileFormElement);
formEditProfile.enableValidation();
const formAddElement = new FormValidator(config, newElementForm);
formAddElement.enableValidation();


/* Popup*/

/*закрытие по esc*/
const closePopupByEscape = (e) => {
  if (e.code !== "Escape") {
    return;
  }
  const popupElement = document.querySelector(".popup_opened");
  closePopup(popupElement);
};

/*закрытие по оверлей*/
const closePopupByClick = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  const popupElement = document.querySelector(".popup_opened");
  closePopup(popupElement);
};

/* закрытие по крестику*/
const popupImageCloseBtn = popupImage.querySelector(".popup__close-btn");
popupImageCloseBtn.addEventListener("click", function () {
  closePopup(popupImage);
});

/*открытие попап*/
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("click", closePopupByClick);
  document.addEventListener("keydown", closePopupByEscape);
}
/*закрытие попап*/
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  popupElement.removeEventListener("click", closePopupByClick);
  document.removeEventListener("keydown", closePopupByEscape);
}



// РЕДАКТОР КАРТОЧКИ
/*функция открыть попап редактор профиля*/
function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  aboutInput.value = profiletext.textContent;
}

/*функция сохранить изменения после редактирования*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  profileName.textContent = name;
  const description = aboutInput.value;
  profiletext.textContent = description;
  closePopup(profilePopup);
}
ProfileEditBtn.addEventListener("click", openProfilePopup);
profilePopupCloseBtn.addEventListener("click", function () {
  closePopup(profilePopup);
});
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

/* Функция обработчик клика по картинке карточки*/
function handleCardClick(name, link) {
  imagePopup.src = link;
  imagePopupName.textContent = name;
  imagePopup.alt = name;
  openPopup(popupImage);
}

/*функция создания карточек из массива*/
function renderCard(card, container) {
  container.prepend(card);
}

/* Функция создания карточки из класса.*/
function createCard(name, link) {
  const card = new Card(name, link, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

/*создание карточки*/
initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);
  renderCard(cardElement, cardsList);
});


/*функция открытия попап для создания карточки*/
function openNewElementPopup() {
  formAddElement.resetForm();
  openPopup(newElementPopup);
  formAddElement.resetInputError();
  placeInput.value = "";
  urlInput.value = "";
}

newElementButton.addEventListener("click", openNewElementPopup);
newElementPopupCloseBtn.addEventListener("click", function () {
  closePopup(newElementPopup);
});

/*функция добавления карточки из попап*/
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(placeInput.value, urlInput.value));
  closePopup(newElementPopup);

}
newElementForm.addEventListener("submit", handleAddCardFormSubmit);