'use strict';
var PHOTOS_QUANTITY = 25;
var MIN_LIKES_SUM = 15;
var MAX_LIKES_SUM = 200;
var MIN_AVATAR_URL = 1;
var MAX_AVATAR_URL = 6;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ',
  'Не обижайте всех словами......',
  'Вот это тачка!'
];
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // ищу #picture и в нем ищу .picture
var picturesBlock = document.querySelector('.pictures');
var socialCommentList = document.querySelector('.social__comments');
var socialСommentCount = document.querySelector('.social__comment-count');
var loadComments = document.querySelector('.comments-loader');
var bigPicture = document.querySelector('.big-picture');
var body = document.querySelector('body');
var VALUE_STEP = 25;
var controlSmaller = document.querySelector('.scale__control--smaller');
var controlBigger = document.querySelector('.scale__control--bigger');
var currentEffectImg = document.querySelector('.img-upload__preview');
var controlValue = document.querySelector('.scale__control--value');
var MIN_VALUE = 25;
var MAX_VALUE = 100;
var ESC_KEYCODE = 27;
var uploadFile = document.querySelector('#upload-file'); // input type file
var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // оверлей с фоткой после change input type file
var imgUploadCancel = document.querySelector('.img-upload__cancel'); // кнопка закрытия формы
var effectsList = picturesBlock.querySelector('.effects__list');
var filterPin = document.querySelector('.effect-level__pin');// найдём тот элемент, за который будем тащить
var effectLevelDepth = document.querySelector('.effect-level__depth');


var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  return array[getRandomInteger(0, array.length)];
};

var generateComments = function (count) {
  var pictureComments = [];
  for (var i = 0; i < count; i++) {
    pictureComments.push(getRandomElement(COMMENTS));
  }
  return pictureComments;
};

var renderPublication = function (count) {
  var publications = [];
  for (var i = 0; i < count; i++) {
    var publication = {
      comments: generateComments(getRandomInteger(1, 3)),
      description: getRandomElement(DESCRIPTIONS),
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(MIN_LIKES_SUM, MAX_LIKES_SUM + 1)

    };
    publications.push(publication);
  }
  return publications;
};

var createPhotoElement = function (publication) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').setAttribute('src', publication.url);
  photoElement.querySelector('.picture__comments').textContent = publication.comments.length;
  photoElement.querySelector('.picture__likes').textContent = publication.likes;

  // обработчик для создания большой фотографии
  photoElement.addEventListener('click', function () {
    showBigPicture(publication);
  });

  return photoElement;
};

var getUsersPhotos = function (publications) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < publications.length; i++) {
    fragment.appendChild(createPhotoElement(publications[i]));
  }
  return fragment;
};


var showBigPicture = function (publication) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = publication.url;
  bigPicture.querySelector('.likes-count').textContent = publication.likes;
  bigPicture.querySelector('.comments-count').textContent = publication.comments.length;
  bigPicture.querySelector('.social__caption').textContent = publication.description;
  var commentItem = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getRandomInteger(MIN_AVATAR_URL, MAX_AVATAR_URL) + '.svg" alt="Аватар комментатора фотографии"width="35" height="35"><p class="social__text">' + publication.comments + '</p></li>';

  socialСommentCount.classList.add('visually-hidden');
  loadComments.classList.add('visually-hidden');

  socialCommentList.insertAdjacentHTML('afterBegin', commentItem);

  // навешиваем обработчики
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', keyCloseBigPictureHandler);
  };

  var keyCloseBigPictureHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var bigPictureCancelElement = bigPicture.querySelector('.big-picture__cancel');

  bigPictureCancelElement.addEventListener('click', function () {
    closeBigPicture();
  });

  // нажатие на документе
  document.addEventListener('keydown', keyCloseBigPictureHandler);

};

var publications = renderPublication(PHOTOS_QUANTITY);
picturesBlock.appendChild(getUsersPhotos(publications));

var resetForm = function () {
  currentEffect.removeAttribute('class');
  currentEffectImg.removeAttribute('style');
};


// функция смены фильтра
var effectsHandler = function (evt) {
  var target = evt.target;
  var effectClass = 'effects__preview--' + target.value;
  if (target.classList.contains('effects__radio')) {
    currentEffect.removeAttribute('class');
    currentEffect.classList.add(effectClass);
  }
  if (currentEffect.classList.contains('effects__preview--none')) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
    filterPin.style.left = MAX_VLUE_PIN + 'px';
    effectLevelDepth.style.width = '100%';
  }
};

// открытие-закрытие формочки
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  effectsList.addEventListener('click', effectsHandler);
  effectLevel.classList.add('hidden');
});

imgUploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
  effectsList.removeEventListener('click', effectsHandler);
  resetForm();
});



document.addEventListener('keydown', onPopupEscPress);


// filterPin.addEventListener('mouseup', function () {
//   var effectLevelValue = effectLevel.querySelector('.effect-level__value');
//   effectLevelValue.value = pinPosition * 100 / pinLineWidth;
// });

var changePictureSize = function (difference) {
  var currentValue = parseInt(controlValue.value, 10);
  var newValue = difference < 0 ?
    Math.max(MIN_VALUE, currentValue + difference) :
    Math.min(MAX_VALUE, currentValue + difference);

  controlValue.value = newValue + '%';
  currentEffectImg.style.transform = 'scale(' + newValue / 100 + ')';
};

controlSmaller.addEventListener('click', function () {
  changePictureSize(-VALUE_STEP);
});

controlBigger.addEventListener('click', function () {
  changePictureSize(VALUE_STEP);
});

var MAX_HASHTAG = 5;
var MAX_SYMBOLS = 20;
var MIN_SYMBOLS = 1; // хеш-тег не может состоять только из одной решётки;
var commentsInput = document.querySelector('.text__description');
var buttonSubmit = document.querySelector('.img-upload__submit');
var textHashtag = document.querySelector('.text__hashtags');

var checkCommentsValue = function () {
  var textareaValue = commentsInput.value;
  var errorMessage = '';
  if (textareaValue.length > 140) {
    errorMessage = 'максимальная длина 140';
  } else {
    errorMessage = '';
  }
  commentsInput.setCustomValidity(errorMessage);
};

commentsInput.addEventListener('input', checkCommentsValue);


var checkHashtagValidity = function () {
  var errorMessage = '';
  var hashtagValue = textHashtag.value.trim();
  if (textHashtag.value !== '') {
    var hashTags = hashtagValue.toLowerCase().split(' '); // Набор хэш-тегов можно превратить в массив, воспользовавшись методом split, который разбивает строки на массивы.

    for (var i = 0; i < hashTags.length; i++) { // После этого, вы можете написать цикл, который будет ходить по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям.
      var hashtag = hashTags[i];
      if (hashtag[0] !== '#') {
        errorMessage = 'хэш-тег начинается с символа # (решётка)';
        break;
      } else if (hashtag.length === MIN_SYMBOLS) {
        errorMessage = 'хеш-тег не может состоять только из одной решётки';
        break;
      } else if (hashTags.indexOf(hashTags[i]) !== i) {
        errorMessage = 'хеш-тег не должен повторяться';
        break;
      } else if (hashTags.length > MAX_HASHTAG) {
        errorMessage = 'нельзя указать больше пяти хэш-тегов';
        break;
      } else if (hashtag.length > MAX_SYMBOLS) {
        errorMessage = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
        break;
      } else {
        errorMessage = '';
      }
    }
  }
  textHashtag.setCustomValidity(errorMessage);
};

textHashtag.addEventListener('change', checkHashtagValidity);

buttonSubmit.addEventListener('click', function () {
  checkHashtagValidity();
});


commentsInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

textHashtag.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});


// ----module-5 ------//

// var pinLineWidth = document.querySelector('.effect-level__line').offsetWidth; // возвращает ширину элемента
var MIN_VLUE_PIN = 0;
var MAX_VLUE_PIN = 455;
// var dragLimit = {
//   x: {
//     min: 0,
//     max: 453
//   }
// };
// var pinLineWidth = document.querySelector('.effect-level__line');
// var pinPosition = document.querySelector('.effect-level__pin').offsetLeft; // содержит левое смещение элемента относительно offsetParent
var currentEffect = document.querySelector('.img-upload__preview img');
var effectLevel = document.querySelector('.effect-level');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var pinPosition;
// Для эффекта «Хром» — filter: grayscale(0..1);
// Для эффекта «Сепия» — filter: sepia(0..1);
// Для эффекта «Марвин» — filter: invert(0..100%);
// Для эффекта «Фобос» — filter: blur(0..3px);
// Для эффекта «Зной» — filter: brightness(1..3).


// var filterPin = document.querySelector('.effect-level__pin');// найдём тот элемент, за который будем тащить

filterPin.addEventListener('mousedown', function (evt) { // обработаем событие начала перетаскивания
  evt.preventDefault();

  var startCoords = evt.clientX; // запомним координаты

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;


    startCoords = moveEvt.clientX;

    pinPosition = filterPin.offsetLeft - shift;
    // filterPin.style.left = pinPosition + 'px';
    // var pinPercents = Math.round(pinPosition * 100 / pinLineWidth.offsetWidth);
    // effectLevelValue.value = pinPercents;
    // effectLevelDepth.style.width = effectLevelValue.value + '%';

    if (pinPosition >= MIN_VLUE_PIN && pinPosition <= MAX_VLUE_PIN) {
      var pinPercents = Math.round(pinPosition * 100 / MAX_VLUE_PIN);
      effectLevelValue.value = pinPercents;
      filterPin.style.left = pinPosition + 'px';
      effectLevelDepth.style.width = pinPercents + '%';
      // var target = evt.target;
      // var effectClass = 'effects__preview--' + target.value;
      // if (target.classList.contains('effects__radio')) {
      //   currentEffect.removeAttribute('class');
      //   currentEffect.classList.add(effectClass);
      // }
    }

    if (currentEffect.classList.contains('effects__preview--chrome')) {
      currentEffect.style.filter = 'grayscale(' + (pinPercents / 100) + ')';
    }
    if (currentEffect.classList.contains('effects__preview--sepia')) {
      currentEffect.style.filter = 'sepia(' + (pinPercents / 100) + ')';
    }
    if (currentEffect.classList.contains('effects__preview--marvin')) {
      currentEffect.style.filter = 'invert(' + pinPercents + '%)';
    }
    if (currentEffect.classList.contains('effects__preview--phobos')) {
      currentEffect.style.filter = 'blur(' + (pinPercents * 0.03) + 'px)';
    }
    if (currentEffect.classList.contains('effects__preview--heat')) {
      currentEffect.style.filter = 'brightness(' + (pinPercents * 0.03) + ')';
    }
    if (currentEffect.classList.contains('effects__preview--none')) {
      currentEffect.style.filter = 'none';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
