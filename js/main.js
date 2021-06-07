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

const ADVERT_DATA_COUNT = 10;

function getRandomInteger(from, to) {
  if (from < to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  } else {
    return Math.floor(Math.random() * (from - to + 1)) + to;
  }
}

function getRandomFloat(from, to, decimals) {
  if (from < to) {
    return Number((Math.random() * (to - from) + from).toFixed(decimals));
  } else {
    return Number((Math.random() * (from - to) + to).toFixed(decimals));
  }
}

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
  offer.address = `${createLocation().lat}, ${createLocation().lng}`;
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
  advert.offer = createOffer();
  advert.location = createLocation();
  return advert;
};

const advertData = function () {
  return new Array(ADVERT_DATA_COUNT).fill(null).map(() => createAdvert());
};

advertData();
