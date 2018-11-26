'use strict';
var PHOTOS_QUANTITY = 25;
var MIN_LIKES_SUM = 15;
var MAX_LIKES_SUM = 200;
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
var pictureTemplateElement = document.querySelector('#picture').content;
var picturesElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var photos = [];

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

var shuffleArray = function (array) { //тасование массива
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array
};


// var getRandomComments = function (array) { //функция создания коммента
//   var comments = [];
//   }
//   return comments;
// };


var generatePhotos = function () {
  for (var i = 1; i <= 25; i++) {
    photos.push({
      imageUrl: 'photos/' + i + '.jpg', //rl, строка — адрес картинки вида photos/{{i}}.jpg
      likes: getRandomInteger(MIN_LIKES_SUM, MAX_LIKES_SUM),
      description: getRandomElement[DESCRIPTIONS],
    }
    );
  }
}

//Создайте массив, состоящий из 25 сгенерированных JS объектов
