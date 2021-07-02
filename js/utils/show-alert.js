/* eslint-disable no-use-before-define */
const ALERT_SHOW_TIME = 5000;

const successPopup = document.querySelector('#success').content;
const successMessage = successPopup.querySelector('.success');
const errorPopup = document.querySelector('#error').content;
const errorMessage = errorPopup.querySelector('.error');
const errorButton = errorPopup.querySelector('.error__button');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onScreenClick = (evt) => {
  evt.preventDefault();
  closeMessage();
};

function closeMessage () {
  successMessage.remove();
  errorMessage.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onScreenClick);
  document.removeEventListener('click', closeMessage);
}

// Показ cообщения об успешном создании объявления
const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onScreenClick);
};

// Показ cообщения об ошибке создания объявления
const showErrorMessage = () => {
  document.body.append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  errorButton.addEventListener('click', closeMessage);
};

// Показ сообщения об ошибке при загрузке данных с сервера.
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '14px 20px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'salmon';
  alertContainer.style.borderBottomLeftRadius = '10px';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert, showSuccessMessage, showErrorMessage };
