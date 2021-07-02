// Основной модуль для работы с картой
import { setFormEnabled } from './../utils/app-state.js';
import { createBaloonCard } from './generate-popup-card.js';

const DEFAULT_ADDRESS = {
  lat: 35.66565,
  lng: 139.76102,
};

const addressInput = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const ordinaryIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  DEFAULT_ADDRESS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const map = L.map('map-canvas');

const createMap = () => {
  map.on('load', () => {
    setFormEnabled();
    addressInput.value = `${DEFAULT_ADDRESS.lat}, ${DEFAULT_ADDRESS.lng}`;
  })
    .setView(DEFAULT_ADDRESS, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const getAddress = evt.target.getLatLng();
    const lat = +getAddress.lat.toFixed(5);
    const lng = +getAddress.lng.toFixed(5);
    addressInput.value = `${lat}, ${lng}`;
  });
};

const showAdvertsOnMap = (fetchedData) => {
  fetchedData.forEach((advert) => {
    const {lat, lng} = advert.location;
    const ordinaryMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: ordinaryIcon,
      },
    );
    ordinaryMarker
      .addTo(map)
      .bindPopup(createBaloonCard(advert));
  });
};

export { createMap, showAdvertsOnMap, map, DEFAULT_ADDRESS, mainPinMarker };

