import { popupFragment } from './utils/generate-markup.js';

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.style.display = 'flex';
mapCanvas.appendChild(popupFragment);
