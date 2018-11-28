'use strict';
var PHOTOS_QUANTITY = 25;
var MIN_LIKES_SUM = 15;
var MAX_LIKES_SUM = 200;
var MIN_AVATAR_URL = 1;
var MAX_AVATAR_URL = 6;
var AVATAR_COUNT = 6;
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

// функция генерации случайного элемента массива
var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);

  return array[randomElement];
}


// функция генерации данных из заданного диапазона
var getRandomInteger = function (min, max) {
  var randomInteger = Math.floor(Math.random() * (max - min + 1) + min);

  return randomInteger;
}

//рандомим комменты
var generateRandomComments = function () {
  var randomComment = Math.floor(Math.random() * COMMENTS.length);
  return COMMENTS[randomComment];
}

var publications = [];
for (var i = 0; i < PHOTOS_QUANTITY; i++) {
  var publication = {
    comments: getRandomElement(COMMENTS),
    description: getRandomElement(DESCRIPTIONS),
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInteger(MIN_LIKES_SUM, MAX_LIKES_SUM)

  }
  publications.push(publication)
}

console.log(publications)


var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var socialCommentList = document.querySelector('.social__comments');
var socialСommentCount = bigPicture.querySelector('.social__comment-count');
var loadComments = document.querySelector('.comments-loader');



var fragment = document.createDocumentFragment();
for (var i = 0; i < publications.length; i++) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__likes').textContent = publications[i].likes;
  photoElement.querySelector('.picture__comments').textContent = publications[i].comments;
  photoElement.querySelector('.picture__img').src = publications[i].url;

  fragment.appendChild(photoElement);
}

picturesBlock.appendChild(fragment);
пше
// bigPicture.classList.remove('hidden');
bigPicture.querySelector('img').src = publications[i].url;
bigPicture.querySelector('.comments-count').textContent = publications[i].comments;

// var shuffleArray = function (array) { //тасование массива
//   for (var i = array.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));
//     var temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }

//   return array;
// };

