// Валидации всех полей формы (пока не всех :) )
const advertForm = document.querySelector('.ad-form');
const inputForTitle = advertForm.querySelector('#title');
const minTitleLength = inputForTitle.getAttribute('minLength');
const maxTitleLength = inputForTitle.getAttribute('maxLength');
const inputForPrice = advertForm.querySelector('#price');
const maxPrice = inputForPrice.getAttribute('max');
const roomNumber = advertForm.querySelector('#room_number');
const roomCapacity = advertForm.querySelector('#capacity');
const residenceType = advertForm.querySelector('#type');
const timeIn = advertForm.querySelector('#timein');
const timeOut = advertForm.querySelector('#timeout');
const address = advertForm.querySelector('#address');
const residencePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const selectOption = function (element) {
  const choosenOption = element.options[element.selectedIndex].value;
  return choosenOption;
};

const selectOptionText = function (element) {
  const choosenOption = element.options[element.selectedIndex].textContent;
  return choosenOption;
};

const disableOption = function (index) {
  roomCapacity.options[index].setAttribute('disabled', '');
};

const makeOptionSelected = function (element, index) {
  element.options[index].setAttribute('selected', '');
};

const clearAttributes = function(element) {
  for (let index = 0; index < element.options.length; index++) {
    element.options[index].removeAttribute('selected');
    element.options[index].removeAttribute('disabled');
  }
};

const validateAdvertForm = function() {
  // валидация длины текста заголовка
  inputForTitle.addEventListener('input', () => {
    const valueLength = inputForTitle.value.length;

    if (valueLength < minTitleLength) {
      inputForTitle.setCustomValidity(`Ещё ${  minTitleLength - valueLength } симв.`);
    } else if (valueLength > maxTitleLength) {
      inputForTitle.setCustomValidity(`Удалите лишние ${  valueLength - maxTitleLength } симв.`);
    } else {
      inputForTitle.setCustomValidity('');
    }

    inputForTitle.reportValidity();
  });

  // валидация количества гостей в связке с количеством комнат
  roomNumber.addEventListener('change', () => {
    clearAttributes(roomCapacity);
    roomCapacity.setCustomValidity('Изменилось количество гостей');
    roomCapacity.reportValidity();
    if (selectOption(roomNumber) === '1') {
      makeOptionSelected(roomCapacity, 2);
      disableOption(0);
      disableOption(1);
      disableOption(3);
    }
    if (selectOption(roomNumber) === '2') {
      makeOptionSelected(roomCapacity, 1);
      disableOption(0);
      disableOption(3);
    }
    if (selectOption(roomNumber) === '3') {
      makeOptionSelected(roomCapacity, 0);
      disableOption(3);
    }
    if (selectOption(roomNumber) === '100') {
      makeOptionSelected(roomCapacity, 3);
      disableOption(0);
      disableOption(1);
      disableOption(2);
    }
  });

  // убирает roomCapacity.reportValidity(), вызванное выше.
  roomCapacity.addEventListener('blur', () => {
    roomCapacity.setCustomValidity('');
  });

  roomCapacity.addEventListener('change', () => {
    roomCapacity.setCustomValidity('');
  });

  // валидация цены за ночь в сязке с типом жилья
  residenceType.addEventListener('change', (event) => {
    const setPriceAttributes = (value) => {
      inputForPrice.setAttribute('placeholder', value.toString());
      inputForPrice.setAttribute('min', value);
    };
    const eventValue = event.target.value;
    setPriceAttributes(residencePrice[eventValue]);

    const newMin = +inputForPrice.getAttribute('min');
    const currentPrice = +inputForPrice.value;

    if (currentPrice < newMin && currentPrice !== 0) {
      inputForPrice.setCustomValidity(`Уточните цену! \n Цена в категории ${ selectOptionText(residenceType) } не может быть меньше ${ newMin }`);
      inputForPrice.reportValidity();
    }
  });

  inputForPrice.addEventListener('input', () => {
    const priceValue = +inputForPrice.value;
    const minPrice = +inputForPrice.getAttribute('min');

    if (priceValue < minPrice) {
      inputForPrice.setCustomValidity(`Цена в категории ${ selectOptionText(residenceType) } не может быть меньше ${ minPrice }`);
    } else if (priceValue > maxPrice) {
      inputForPrice.setCustomValidity(`Цена на нашем сайте не может быть больше ${ maxPrice }`);
    } else {
      inputForPrice.setCustomValidity('');
    }

    inputForPrice.reportValidity();
  });

  // Привязка полей "Время заезда" и "время выезда" друг к другу
  timeIn.addEventListener('change', () => {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });

  timeOut.addEventListener('change', () => {
    timeIn.selectedIndex = timeOut.selectedIndex;
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

  advertForm.addEventListener('submit', () => {
    address.removeAttribute('disabled');
  });
};

export { validateAdvertForm };
