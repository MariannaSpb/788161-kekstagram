'use strict';
(function () {

  var PHOTOS_QUANTITY = 25;
  var MIN_LIKES_SUM = 15;
  var MAX_LIKES_SUM = 200;
  // var MIN_AVATAR_URL = 1;
  // var MAX_AVATAR_URL = 6;
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
  var picturesBlock = document.querySelector('.pictures');

  var generateComments = function (count) {
    var pictureComments = [];
    for (var i = 0; i < count; i++) {
      pictureComments.push(window.utils.getRandomElement(COMMENTS));
    }
    return pictureComments;
  };

  var renderPublication = function (count) {
    var publications = [];
    for (var i = 0; i < count; i++) {
      var publication = {
        comments: generateComments(window.utils.getRandomInteger(1, 3)),
        description: window.utils.getRandomElement(DESCRIPTIONS),
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.utils.getRandomInteger(MIN_LIKES_SUM, MAX_LIKES_SUM + 1)

      };
      publications.push(publication);
    }
    return publications;
  };





  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // ищу #picture и в нем ищу .picture
  // var picturesBlock = document.querySelector('.pictures');

  var createPhotoElement = function (publication) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', publication.url);
    photoElement.querySelector('.picture__comments').textContent = publication.comments.length;
    photoElement.querySelector('.picture__likes').textContent = publication.likes;

    // обработчик для создания большой фотографии
    photoElement.addEventListener('click', function () {
      window.pictures.showBigPicture(publication);
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






  var publications = renderPublication(PHOTOS_QUANTITY);
  picturesBlock.appendChild(getUsersPhotos(publications));


  // window.data = {
  //   // renderPublication: renderPublication,
  //   getUsersPhotos: getUsersPhotos
  // };

})();
