export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  };

  //добавть класс ошибки 
  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  };

  //убрать класс ошибки 
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.textContent = '';
  };

  //Проверяем валидность 
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //Функция проверяет валидность полей input
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Переключение состояния кнопки
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (!this._formElement.checkValidity()) {
      // кнопка неактивна
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // иначе кнопк активна
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  //Обработчик формы
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };


  //Включение валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      // Отменяем стандартное поведение.
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  //Функция интеллектуально переключает кнопку в попапе при его открытии
  resetInputError() {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
    this._toggleButtonState();
  };

  // Функция сброса формы и ошибок при открытии попапов
  resetForm() {
    this._formElement.reset();
  }
}