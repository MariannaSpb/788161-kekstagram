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


// функция генерации данных из заданного диапазона
var getRandomInteger = function (min, max) {
  var randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  return randomInteger;
};

// функция генерации случайного элемента массива
var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var generateComments = function (count) {
  var pictureComments = [];
  for (var i = 0; i < count; i++) {
    pictureComments.push(getRandomElement(COMMENTS));
  }
  return pictureComments;
};

var publications = [];
for (var i = 0; i < PHOTOS_QUANTITY; i++) {
  var count = getRandomInteger(1, 2);
  var publication = {
    // Это массив. Напиши специальную функцию, которая на вход будет получать число count, а на выходе будет массив из count элементов.
    comments: generateComments(count),
    description: getRandomElement(DESCRIPTIONS),
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInteger(MIN_LIKES_SUM, MAX_LIKES_SUM)

  };
  publications.push(publication);
}

var renderPhotos = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};

var getUsersPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderPhotos(array[j]));
  }
  return fragment;
};

picturesBlock.appendChild(getUsersPhotos(publications));

var showBigPicture = function () {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', publications[0].url);
  bigPicture.querySelector('.likes-count').textContent = publications[0].likes;
  bigPicture.querySelector('.comments-count').textContent = publications[0].comments.length;
  bigPicture.querySelector('.social__caption').textContent = publications[0].description;
  var commentItem = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getRandomInteger(MIN_AVATAR_URL, MAX_AVATAR_URL) + '.svg" alt="Аватар комментатора фотографии"width="35" height="35"><p class="social__text">' + publications[0].comments + '</p></li>';
  socialCommentList.insertAdjacentHTML('afterBegin', commentItem);
};
showBigPicture();


socialСommentCount.classList.add('visually-hidden');
loadComments.classList.add('visually-hidden');
