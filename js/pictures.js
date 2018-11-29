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


// функция генерации данных из заданного диапазона
var getRandomInteger = function (min, max) {
  var randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  return randomInteger;
}

// функция генерации случайного элемента массива
var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
}


//рандомим комменты
// var generateRandomComments = function () {
//   var randomComment = Math.floor(Math.random() * COMMENTS.length);
//   return COMMENTS[randomComment];
// }


var  generateRandomComments = function (allComents) {
  var randomComments = [];
  for (var i = 0; i < getRandomInteger(0, 3); i++) {
    randomComments.push(allComents[getRandomInteger(0, 5)]);
  }
  return randomComments;
};


var publications = [];
for (var i = 0; i < PHOTOS_QUANTITY; i++) {
  var publication = {
    // comments: getRandomInteger(1, COMMENTS.length),
    // comments: generateRandomComments(COMMENTS.length),
    comments: getRandomElement(COMMENTS),
    commentsAmount: getRandomInteger(5, 30),
    description: getRandomElement(DESCRIPTIONS),
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInteger(MIN_LIKES_SUM, MAX_LIKES_SUM)

  }
  publications.push(publication)
}

console.log(publications)




var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // ищу #picture и в нем ищу .picture
var picturesBlock = document.querySelector('.pictures'); //ищу элемент с .pictures
// var bigPicture = document.querySelector('.big-picture');




// var renderPhotos = function (publication) {
// var fragment = document.createDocumentFragment();
// for (var i = 0; i < publications.length; i++) {
//   var photoElement = pictureTemplate.cloneNode(true);
//   photoElement.querySelector('.picture__likes').textContent = publications[i].likes;
//   photoElement.querySelector('.picture__comments').textContent = publications[i].comments;
//   photoElement.querySelector('.picture__img').src = publications[i].url;

//   fragment.appendChild(photoElement);
// }

// picturesBlock.appendChild(fragment);


var renderPhotos = function (publication) {
  for (i = 0; i < publications.length; i++) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', publication.url);
    photoElement.querySelector('.picture__comments').textContent = publication.commentsAmount;
    photoElement.querySelector('.picture__likes').textContent = publication.likes;
  }
  return photoElement;
};

var getUsersPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < publications.length; j++) {
    fragment.appendChild(renderPhotos(publications[j]));
  }
  // picturesBlock.appendChild(fragment);
  // return picturesBlock;
  return fragment;
};

// getUsersPhotos();
picturesBlock.appendChild(getUsersPhotos());



console.log(picturesBlock)

//Покажите элемент .big-picture, удалив у него класс .hidden
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');


bigPicture.querySelector('.big-picture__img img').setAttribute('src', publications[0].url);
bigPicture.querySelector('.likes-count').textContent = publications[0].likes;
bigPicture.querySelector('.comments-count').textContent = publications[0].commentsAmount;
bigPicture.querySelector('.social__caption').textContent = publications[0].description;

var socialCommentList = document.querySelector('.social__comments');

var commentItem = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getRandomInteger(1, 6) + '.svg" alt="Аватар комментатора фотографии"width="35" height="35"><p class="social__text">' + publications[1].comments + '</p></li>';

socialCommentList.insertAdjacentHTML('afterBegin', commentItem); //element.insertAdjacentHTML(position, text);

console.log(socialCommentList);
console.log(publications[1].comments);
console.log(publications);

var socialСommentCount = document.querySelector('.social__comment-count');
socialСommentCount.classList.add('visually-hidden'); //Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев
var loadComments = document.querySelector('.comments-loader');
loadComments.classList.add('visually-hidden');
