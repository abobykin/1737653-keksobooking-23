function getRandomInteger(from, to) {
  if (from < to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  } else {
    return Math.floor(Math.random() * (from - to + 1)) + to;
  }
}
getRandomInteger(1, 10);

function getRandomFloat(from, to, decimals) {
  if (from < to) {
    return Number((Math.random() * (to - from) + from).toFixed(decimals));
  } else {
    return Number((Math.random() * (from - to) + to).toFixed(decimals));
  }
}
getRandomFloat(1.432, 10.21, 3);

function getRandomArrayElement (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

// Filter function for removing duplicates is taken from here - https://dev.to/kannndev/filter-an-array-for-unique-values-in-javascript-1ion
function getUniqueValues(array) {
  return Array.from(new Set(array));
}

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

function randomFeatures () {
  return new Array(getRandomInteger(0, FEATURES.length))
    .fill('')
    .map(() => getRandomArrayElement(FEATURES));
}

const createAuthor = () => {
  const xx = `0${getRandomInteger(1, 8).toString()}`;
  const author = {};
  author.avatar = `img/avatars/user${xx}.png`;
  return author;
};

const createLocation = () => ({
  lat: getRandomFloat(35.65, 35.7, 5),
  lng: getRandomFloat(139.7, 139.8, 5),
});

const randomPhotos = new Array(getRandomInteger(0, PHOTOS.length))
  .fill('')
  .map(() => getRandomArrayElement(PHOTOS));

const currentLocation = createLocation();

const createOffer = () => {
  const offer = {};
  offer.title = getRandomArrayElement(TITLES);
  offer.address = `${currentLocation.lat.toString()  }, ${  currentLocation.lng.toString()}`;
  offer.price = getRandomInteger(100, 100000);
  offer.type = getRandomArrayElement(TYPES);
  offer.rooms = getRandomInteger(1, 10);
  offer.guests = getRandomInteger(1, 10);
  offer.checkin = getRandomArrayElement(CHECKINANDOUT);
  offer.checkout = getRandomArrayElement(CHECKINANDOUT);
  offer.features = getUniqueValues(randomFeatures());
  offer.description = getRandomArrayElement(DESCRIPTIONS);
  offer.photos = randomPhotos;
  return offer;
};

const createAdvert = () => {
  const advert = {};
  advert.author = createAuthor();
  advert.offer = createOffer();
  advert.location = currentLocation;
  return advert;
};

const ADVERT_DATA_COUNT = 10;

const advertData = function() {
  return new Array(ADVERT_DATA_COUNT)
    .fill(null)
    .map(() => createAdvert());
};

advertData();
