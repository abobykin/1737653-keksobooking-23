import { getRandomInteger, getRandomFloat } from '../utils/get-random-numbers.js';

const TITLES = [
  'Большая квартира',
  'Маленькая квартира',
  'Нормальная квартира',
  'Очень большая квартира',
  'Совсем маленькая квартира',
  'Домик для утки',
  'Комната на чердаке',
  'Гараж',
  'Студия с балконом',
  'Будка с отоплением',
];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECKINANDOUT = ['12:00', '13:00', '14:00'];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'no place like home',
  'yankee go home',
  'if ifs and buts were candies and nuts',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

// Filter function for removing duplicates is taken from here - https://dev.to/kannndev/filter-an-array-for-unique-values-in-javascript-1ion
function getUniqueValues(array) {
  return Array.from(new Set(array));
}

function getRandomFeatures() {
  return new Array(getRandomInteger(0, FEATURES.length))
    .fill('')
    .map(() => getRandomArrayElement(FEATURES));
}

const createAuthor = () => {
  const randomInteger = `0${getRandomInteger(1, 8)}`;
  const author = {};
  author.avatar = `img/avatars/user${randomInteger}.png`;
  return author;
};

const createLocation = () => ({
  lat: getRandomFloat(35.65, 35.7, 5),
  lng: getRandomFloat(139.7, 139.8, 5),
});

const randomPhotos = new Array(getRandomInteger(0, PHOTOS.length))
  .fill('')
  .map(() => getRandomArrayElement(PHOTOS));

const createOffer = () => {
  const offer = {};
  offer.title = getRandomArrayElement(TITLES);
  offer.address = '';
  offer.price = getRandomInteger(100, 100000);
  offer.type = getRandomArrayElement(TYPES);
  offer.rooms = getRandomInteger(1, 10);
  offer.guests = getRandomInteger(1, 10);
  offer.checkin = getRandomArrayElement(CHECKINANDOUT);
  offer.checkout = getRandomArrayElement(CHECKINANDOUT);
  offer.features = getUniqueValues(getRandomFeatures());
  offer.description = getRandomArrayElement(DESCRIPTIONS);
  offer.photos = randomPhotos;
  return offer;
};

const createAdvert = () => {
  const advert = {};
  advert.author = createAuthor();
  advert.location = createLocation();
  advert.offer = createOffer();
  advert.offer.address = `${advert.location.lat}, ${advert.location.lng}`;
  return advert;
};

const getTemporaryData = function (count) {
  return new Array(count).fill(null).map(() => createAdvert());
};

export { getTemporaryData };
