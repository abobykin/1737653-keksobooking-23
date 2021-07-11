// Загрузка файлов и удаление их при отправке и очистке формы
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.ad-form');
const avatarInput = form.querySelector('.ad-form__field input[type=file]');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const advertPhotoInput = form.querySelector('.ad-form__upload input[type=file]');
const advertPhotoPreview = form.querySelector('.ad-form__photo');

const imgUpload = () => {
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  advertPhotoInput.addEventListener('change', () => {
    const file = advertPhotoInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      const imgNode = document.createElement('img');
      imgNode.setAttribute('width', '60px');
      imgNode.setAttribute('height', '60px');
      imgNode.style.margin = '5px';
      advertPhotoPreview.appendChild(imgNode);

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        imgNode.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const clearImg = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  while (advertPhotoPreview.firstChild) {
    advertPhotoPreview.removeChild(advertPhotoPreview.firstChild);
  }
};

export { imgUpload, clearImg };
