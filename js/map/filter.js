// Фильтры карты
import { setMapDefault } from './../form/validation.js';
import { markerGroup, showMarkersOnMap, createMarker, SHOWN_ADVERTS_COUNT } from './map.js';
import { getData } from '../data/api.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

const residencePriceCollection = {
  any: {
    min: 0,
    max: 1000000,
  },
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 1000000,
  },
};

let residencePriceRange = {};
let features = [];
let filtersCount = 0;

const addDisposableListener = (element) => {
  element.addEventListener('change', () => {
    filtersCount += 1;
  }, {once : true});
};

const addMainListener = (element, cb) => {
  element.addEventListener('change', (evt) => {
    if (element === housingPrice) {
      residencePriceRange = residencePriceCollection[evt.target.value];
    } else {
      element.value = evt.target.value;
    }
    markerGroup.clearLayers();
    setMapDefault();
    cb();
    if (evt.target.value === 'any') {
      filtersCount -= 1;
      addDisposableListener(element);
    }
  });
};

const onHousingTypeClick = (cb) => {
  addDisposableListener(housingType);
  addMainListener(housingType, cb);
};

const onHousingPriceClick = (cb) => {
  addDisposableListener(housingPrice);
  addMainListener(housingPrice, cb);
};

const onHousingRoomsClick = (cb) => {
  addDisposableListener(housingRooms);
  addMainListener(housingRooms, cb);
};

const onHousingGuestsClick = (cb) => {
  addDisposableListener(housingGuests);
  addMainListener(housingGuests, cb);
};


const onHousingFeaturesClick = (cb) => {
  housingFeatures.addEventListener('change', (evt) => {
    const featureStatus = evt.target.checked;
    if (featureStatus) {
      features.push(evt.target.value);
      filtersCount += 1;
    } else {
      features = features.filter((item) => item !== evt.target.value);
      filtersCount -= 1;
    }
    markerGroup.clearLayers();
    setMapDefault();
    cb();
  });
};

const mapFiltering = (cb) => {
  onHousingTypeClick(cb);
  onHousingPriceClick(cb);
  onHousingRoomsClick(cb);
  onHousingGuestsClick(cb);
  onHousingFeaturesClick(cb);
};

const compareFeatures = (arrayOne, arrayTwo) => {
  if (arrayTwo) {
    const result = arrayTwo.some((value) => arrayOne.indexOf(value) >= 0);
    return result;
  }
};
const compareAllFeatures = (arrayOne, arrayTwo) => {
  if (arrayTwo) {
    const result = arrayTwo.some((value) => arrayOne.includes(value));
    return result;
  }
};

const getAdvertRank = (advert) => {
  let rank = 0;

  if (advert.offer.type === housingType.value) {
    rank += 1;
  }
  if (advert.offer.price > residencePriceRange.min &&
    advert.offer.price < residencePriceRange.max ) {
    rank += 1;
  }
  if (advert.offer.rooms === +housingRooms.value) {
    rank += 1;
  }
  if (advert.offer.guests === +housingGuests.value) {
    rank += 1;
  }
  if (compareFeatures(features, advert.offer.features)) {
    rank += 1;
  }
  if (compareAllFeatures(features, advert.offer.features)) {
    rank += 1;
  }

  return rank;
};

const compareAdvertsRank = (advert) => {
  const ranked = getAdvertRank(advert);
  if (ranked >= filtersCount) {
    return advert;
  }
};

const showFilteredMarkersOnMap = (fetchedData) => {
  fetchedData
    .slice()
    .map(compareAdvertsRank)
    .sort()
    .slice(0, SHOWN_ADVERTS_COUNT)
    .forEach((advert) => {
      if (advert) {
        createMarker(advert);
      }
    });
};

const clearMapFilters = () => {
  mapFilters.reset();
  markerGroup.clearLayers();
  getData((adverts) => {
    showMarkersOnMap(adverts);
  });
  filtersCount = 0;
};

export { mapFiltering, clearMapFilters, showFilteredMarkersOnMap };
