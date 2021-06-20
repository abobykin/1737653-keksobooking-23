import { popupFragment } from './utils/generate-markup.js';
import { setFormDisabled, setFormEnabled } from './utils/app-state.js';

const mapCanvas = document.querySelector('#map-canvas');

setFormDisabled();
setTimeout(setFormEnabled, 9000);

// ЗАМЕТКА: Ниже временное решение для того чтобы удобнее видеть на карте несколько объявлений
// для задания 'Отрисуй меня полностью (часть 1)' (вместо console.log)
mapCanvas.style.display = 'flex';

mapCanvas.appendChild(popupFragment);
