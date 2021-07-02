// Получение и отправка данных
import { showAdvertsOnMap } from '../map/map.js';
import { setFilterEnabled } from '../utils/app-state.js';
import { showAlert, showSuccessMessage, showErrorMessage } from '../utils/show-alert.js';
import { clearForm, setMapDefault, setAddressDafault } from './../form/validation.js';

const SERVER_ADDRESS_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const SERVER_ADDRESS_POST = 'https://23.javascript.pages.academy/keksobooking';
const SHOWN_ADVERTS_COUNT = 10;

const getData = () => {
  fetch(SERVER_ADDRESS_GET)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => {
      showAdvertsOnMap(data.slice(0, SHOWN_ADVERTS_COUNT));
    })
    .then(() => setFilterEnabled())
    .catch((error) => showAlert('ошибка при  загрузке данных... ', error));
};


const sendData = (body) => {
  fetch(
    SERVER_ADDRESS_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    })
    .then(() => clearForm())
    .then(() => setMapDefault())
    .then(() => setAddressDafault())
    .catch(() => showErrorMessage());
};

export {getData, sendData};
