const button = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-btn');
const popupName = document.querySelector('.popup__input_name'); 
const popupAbout = document.querySelector('.popup__input_about');
const popupSubmit = document.querySelector('.popup__submit-btn'); 
const popupTitle = document.querySelector('.profile__name');    
const popupSubtitle = document.querySelector('.profile__text'); 

function openPopup() {
    popup.classList.remove('popup__hidden');
    popupName.value = popupTitle.textContent; 
    popupAbout.value = popupSubtitle.textContent; 
}

function closePopup() {
    popup.classList.add('popup__hidden');
}

button.addEventListener('click', function () {
    openPopup();
});

popupCloseButton.addEventListener('click', function () {
    closePopup();
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = popupName.value;
    popupTitle.textContent = name;
    let about = popupAbout.value;
    popupSubtitle.textContent = about;
    closePopup();
}

popupSubmit.addEventListener('click', formSubmitHandler); 