'use strict';
(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // ищу #picture и в нем ищу .picture

  var createPhotoElement = function (publication) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', publication.url);
    photoElement.querySelector('.picture__comments').textContent = publication.comments.length;
    photoElement.querySelector('.picture__likes').textContent = publication.likes;

    // обработчик для создания большой фотографии
    photoElement.addEventListener('click', function () {
      window.preview.showBigPicture(publication);
    });

    return photoElement;
  };

  window.picture = {
    createPhotoElement: createPhotoElement
  };

})();

