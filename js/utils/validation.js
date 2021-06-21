// Валидации всех полей формы (пока не всех :) )
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const advertForm = document.querySelector('.ad-form');
const inputForTitle = advertForm.querySelector('#title');
const inputForPrice = advertForm.querySelector('#price');
const roomNumber = advertForm.querySelector('#room_number');
const roomCapacity = advertForm.querySelector('#capacity');

const selectRoomNumber = function () {
  const choosenOption = roomNumber.options[roomNumber.selectedIndex].value;
  return choosenOption;
};
const disableOption = function (index) {
  roomCapacity.options[index].setAttribute('disabled', 'disabled');
};
const makeOptionSelected = function (index) {
  roomCapacity.options[index].setAttribute('selected', 'selected');
};

const clearAttributes = function() {
  for (let index = 0; index < roomCapacity.options.length; index++) {
    roomCapacity.options[index].removeAttribute('selected');
    roomCapacity.options[index].removeAttribute('disabled');
  }
};

const validateAdvertForm = function() {

  inputForTitle.addEventListener('input', () => {
    const valueLength = inputForTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      inputForTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      inputForTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
    } else {
      inputForTitle.setCustomValidity('');
    }

    inputForTitle.reportValidity();
  });

  inputForPrice.addEventListener('input', () => {
    const priceValue = inputForPrice.value;

    if (priceValue > MAX_PRICE) {
      inputForPrice.setCustomValidity(`Цена на нашем сайте не может быть больше ${MAX_PRICE}`);
    } else {
      inputForPrice.setCustomValidity('');
    }

    inputForPrice.reportValidity();
  });

  roomNumber.addEventListener('change', () => {
    clearAttributes();
    roomCapacity.setCustomValidity('Уточните количество гостей');
    roomCapacity.reportValidity();
    if (selectRoomNumber() === '1') {
      makeOptionSelected(2);
      disableOption(0);
      disableOption(1);
      disableOption(3);
    }
    if (selectRoomNumber() === '2') {
      makeOptionSelected(1);
      disableOption(0);
      disableOption(3);
    }
    if (selectRoomNumber() === '3') {
      makeOptionSelected(0);
      disableOption(3);
    }
    if (selectRoomNumber() === '100') {
      makeOptionSelected(3);
      disableOption(0);
      disableOption(1);
      disableOption(2);
    }
  });

  roomCapacity.addEventListener('blur', () => {
    roomCapacity.setCustomValidity('');
  });

  // Обработка случая нажатия кнопки "Опубликовать" с пустыми обязательными полями
  inputForTitle.addEventListener('invalid', () => {
    if (inputForTitle.validity.valueMissing) {
      inputForTitle.setCustomValidity('Заполните пожалуйста заголовок объявления');
    }
  });

  inputForPrice.addEventListener('invalid', () => {
    if (inputForPrice.validity.valueMissing) {
      inputForPrice.setCustomValidity('Уточните цену');
    }
  });
};

export { validateAdvertForm };
