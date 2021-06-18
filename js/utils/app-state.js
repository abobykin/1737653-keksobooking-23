// 1. Переключение неактивного/активного состояния страницы при загрузке карты.
const setFormDisabled = function() {
  const advertForm = document.querySelector('.ad-form');
  advertForm.classList.add('ad-form--disabled');
  const fieldsets = advertForm.querySelectorAll('fieldset');
  fieldsets.forEach((item) => item.disabled = true) ;
};

const setFormEnabled = function() {
  const advertForm = document.querySelector('.ad-form');
  advertForm.classList.remove('ad-form--disabled');
  const fieldsets = advertForm.querySelectorAll('fieldset');
  fieldsets.forEach((item) => item.removeAttribute('disabled')) ;
};

export { setFormDisabled, setFormEnabled };
