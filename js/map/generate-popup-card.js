const cardTemplate = document.querySelector('#card').content;
const popup = cardTemplate.querySelector('.popup');

const createBaloonCard = (advert) => {
  const popupCard = popup.cloneNode(true);
  const title = popupCard.querySelector('.popup__title');
  const address = popupCard.querySelector('.popup__text--address');
  const price = popupCard.querySelector('.popup__text--price');
  const offerType = popupCard.querySelector('.popup__type');
  const roomsForGuests = popupCard.querySelector('.popup__text--capacity');
  const checkTime = popupCard.querySelector('.popup__text--time');
  const features = popupCard.querySelector('.popup__features');
  const description = popupCard.querySelector('.popup__description');
  const cardPhotos = popupCard.querySelector('.popup__photos');
  const cardImg = cardPhotos.querySelector('img');
  const cardAvatar = popupCard.querySelector('.popup__avatar');
  const offerTypeDictionary = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  if (advert.author.avatar) {
    cardAvatar.src = advert.author.avatar;
  } else {
    cardAvatar.style.display = 'none';
  }

  if (advert.offer.title) {
    title.textContent = advert.offer.title;
  } else {
    title.style.display = 'none';
  }

  if (advert.offer.address) {
    address.textContent = advert.offer.address;
  } else {
    address.style.display = 'none';
  }

  if (advert.offer.price) {
    price.textContent = `${advert.offer.price} ₽/ночь`;
  } else {
    price.style.display = 'none';
  }

  if (advert.offer.type) {
    offerType.textContent = offerTypeDictionary[advert.offer.type];
  } else {
    offerType.style.display = 'none';
  }

  if (advert.offer.rooms && advert.offer.guests) {
    roomsForGuests.textContent
    = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  } else {
    roomsForGuests.style.display = 'none';
  }

  if (advert.offer.checkin && advert.offer.checkout) {
    checkTime.textContent
    = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  } else {
    checkTime.style.display = 'none';
  }
  if (advert.offer.features !== undefined) {
    features.textContent = advert.offer.features.join(', ');
  } else {
    features.style.display = 'none';
  }

  if (advert.offer.description) {
    description.textContent = advert.offer.description;
  } else {
    description.style.display = 'none';
  }
  if (advert.offer.photos !== undefined) {
    const createImg = () => {
      const cloneImg = cardImg.cloneNode(true);
      return cloneImg;
    };
    const addImgSource = (url) => {
      const img = createImg();
      img.src = url;
      return img;
    };
    for (const photo in advert.offer.photos) {
      const images = addImgSource(advert.offer.photos[photo]);
      cardImg.remove();
      cardPhotos.appendChild(images);
    }
  } else { cardPhotos.style.display = 'none'; }

  return popupCard;
};

export { createBaloonCard };
