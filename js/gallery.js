'use strict';
(function () {

  // var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // ищу #picture и в нем ищу .picture
  // // var picturesBlock = document.querySelector('.pictures');

  // var createPhotoElement = function (publication) {
  //   var photoElement = pictureTemplate.cloneNode(true);
  //   photoElement.querySelector('.picture__img').setAttribute('src', publication.url);
  //   photoElement.querySelector('.picture__comments').textContent = publication.comments.length;
  //   photoElement.querySelector('.picture__likes').textContent = publication.likes;

  //   // обработчик для создания большой фотографии
  //   photoElement.addEventListener('click', function () {
  //     window.pictures.showBigPicture(publication);
  //   });

  //   return photoElement;
  // };

  // var getUsersPhotos = function (publications) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < publications.length; i++) {
  //     fragment.appendChild(createPhotoElement(publications[i]));
  //   }
  //   return fragment;
  // };

  // window.gallery = {
  //   // getUsersPhotos: getUsersPhotos,
  //   createPhotoElement: createPhotoElement
  // };

})();

// var generateComments = function (count) {
//   var pictureComments = [];
//   for (var i = 0; i < count; i++) {
//     pictureComments.push(getRandomElement(COMMENTS));
//   }
//   return pictureComments;
// };

// var renderPublication = function (count) {
//   var publications = [];
//   for (var i = 0; i < count; i++) {
//     var publication = {
//       comments: generateComments(getRandomInteger(1, 3)),
//       description: getRandomElement(DESCRIPTIONS),
//       url: 'photos/' + (i + 1) + '.jpg',
//       likes: getRandomInteger(MIN_LIKES_SUM, MAX_LIKES_SUM + 1)

//     };
//     publications.push(publication);
//   }
//   return publications;
// };

// var publications = renderPublication(PHOTOS_QUANTITY);
// picturesBlock.appendChild(getUsersPhotos(publications));
