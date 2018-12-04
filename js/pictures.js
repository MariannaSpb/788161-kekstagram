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

var createPhotoElement = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

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
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', publication.url);
  bigPicture.querySelector('.likes-count').textContent = publication.likes;
  bigPicture.querySelector('.comments-count').textContent = publication.comments.length;
  bigPicture.querySelector('.social__caption').textContent = publication.description;
  var commentItem = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getRandomInteger(MIN_AVATAR_URL, MAX_AVATAR_URL) + '.svg" alt="Аватар комментатора фотографии"width="35" height="35"><p class="social__text">' + publication.comments + '</p></li>';

  socialСommentCount.classList.add('visually-hidden');
  loadComments.classList.add('visually-hidden');

  socialCommentList.insertAdjacentHTML('afterBegin', commentItem);
};

var publications = renderPublication(PHOTOS_QUANTITY);
picturesBlock.appendChild(getUsersPhotos(publications));

// showBigPicture(publications[0]);
// showBigPicture();



// ----------module4--------------
var ESC_KEYCODE = 27;
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия фотки
var uploadFile = document.querySelector('#upload-file'); //input type file
var imgUploadOverlay = document.querySelector('.img-upload__overlay');//оверлей с фоткой после change input type file
var imgUploadCancel = document.querySelector('.img-upload__cancel'); //кнопка закрытия формы
var effectsList = picturesBlock.querySelector('.effects__list'); //блок с фильтрами
var currentEffect = document.querySelector('.img-upload__preview img');


var keyCloseBigPicture = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', keyCloseBigPicture);
};


var showBigPicture = function () {
  bigPicture.classList.remove('hidden');
  // document.body.classList.add('modal-open');
  document.addEventListener('keydown', keyCloseBigPicture);
};

showBigPicture();
bigPictureCancel.addEventListener('click', closeBigPicture);



//открытие-закрытие формочки

uploadFile.addEventListener("change", function () {
  imgUploadOverlay.classList.remove('hidden')
});

imgUploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden')
} )


document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploadOverlay.classList.add('hidden');
  }
});


var pictures = document.querySelectorAll('.picture');

var clickPicture = function (count) {
  pictures[count].addEventListener('click', function () {
    showBigPicture(count);
    document.querySelector('body').classList.add('modal-open');
  });
};

for (var k = 0; k < pictures.length; k++) {
  var count = k;
  clickPicture(count);
}

