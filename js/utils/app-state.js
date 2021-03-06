// 1. Переключение неактивного/активного состояния страницы при загрузке карты.
const advertForm = document.querySelector('.ad-form');
const fieldsets = advertForm.querySelectorAll('fieldset');

const filterForm = document.querySelector('.map__filters');
const filterSelects = filterForm.querySelectorAll('select');
const filterCheckboxes = filterForm.querySelector('fieldset');

const setFormDisabled = () => {
  advertForm.classList.add('ad-form--disabled');
  fieldsets.forEach((item) => {item.disabled = true;});
};

const setFormEnabled = () => {
  advertForm.classList.remove('ad-form--disabled');
  fieldsets.forEach((item) => item.removeAttribute('disabled'));
};

const setFilterDisabled = () => {
  filterForm.classList.add('map__filters--disabled');
  filterSelects.forEach((item) => {item.disabled = true;});
  filterCheckboxes.setAttribute('disabled', true);
};

const setFilterEnabled = () => {
  filterForm.classList.remove('map__filters--disabled');
  filterSelects.forEach((item) => item.removeAttribute('disabled'));
  filterCheckboxes.removeAttribute('disabled');
};

export { setFormDisabled, setFormEnabled, setFilterDisabled, setFilterEnabled };
