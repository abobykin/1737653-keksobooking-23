// Фильтры карты
import { setMapDefault } from './../form/validation.js';
import { markerGroup } from './map.js';

const ELIGIBLE_PRICE_DIFFERENCE = 15000;
const ELIGIBLE_ROOM_DIFFERENCE = 3;
const ELIGIBLE_GUEST_DIFFERENCE = 3;

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

const onHousingTypeClick = (cb) => {
  housingType.addEventListener('change', (evt) => {
    housingType.value = evt.target.value;
    markerGroup.clearLayers();
    setMapDefault();
    cb();
  });
};

const onHousingPriceClick = (cb) => {
  housingPrice.addEventListener('change', (evt) => {
    residencePriceRange = residencePriceCollection[evt.target.value];
    markerGroup.clearLayers();
    setMapDefault();
    cb();
  });
};

const onHousingRoomsClick = (cb) => {
  housingRooms.addEventListener('change', (evt) => {
    housingRooms.value = evt.target.value;
    markerGroup.clearLayers();
    setMapDefault();
    cb();
  });
};

const onHousingGuestsClick = (cb) => {
  housingGuests.addEventListener('change', (evt) => {
    housingGuests.value = evt.target.value;
    markerGroup.clearLayers();
    setMapDefault();
    cb();
  });
};


const onHousingFeaturesClick = (cb) => {
  housingFeatures.addEventListener('change', (evt) => {
    const featureStatus = evt.target.checked;
    if (featureStatus) {
      features.push(evt.target.value);
    } else {
      features = features.filter((item) => item !== evt.target.value);
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
    const result = arrayTwo.every((value, index) => value === arrayOne[index]);
    return result;
  } else {
    return false;
  }
};

const getAdvertRank = (advert) => {
  let rank = 0;

  if (advert.offer.type === housingType.value) {
    rank += 3;
  }
  if (advert.offer.price > residencePriceRange.min &&
    advert.offer.price < residencePriceRange.max ) {
    rank += 3;
  }
  if ((advert.offer.price - residencePriceRange.max) < ELIGIBLE_PRICE_DIFFERENCE ) {
    rank += 2;
  }
  if (advert.offer.rooms === +housingRooms.value) {
    rank += 3;
  }
  if ((advert.offer.rooms - +housingRooms.value) < ELIGIBLE_ROOM_DIFFERENCE) {
    rank += 2;
  }
  if (advert.offer.guests === +housingGuests.value) {
    rank += 3;
  }
  if ((advert.offer.guests - +housingGuests.value) < ELIGIBLE_GUEST_DIFFERENCE) {
    rank += 2;
  }

  const comareResult = compareFeatures(features, advert.offer.features);
  if (comareResult && features.length === advert.offer.features.length) {
    rank += 3;
  }
  if (comareResult) {
    rank +=1;
  }

  return rank;
};

const compareAdverts = (advertA, advertB) => {
  const rankA = getAdvertRank(advertA);
  const rankB = getAdvertRank(advertB);
  return rankB - rankA;
};

export { compareAdverts, mapFiltering };
