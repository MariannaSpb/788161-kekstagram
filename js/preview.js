'use strict';
(function () {

  var MIN_AVATAR_URL = 1;
  var MAX_AVATAR_URL = 6;
  var socialCommentList = document.querySelector('.social__comments');
  var socialСommentCount = document.querySelector('.social__comment-count');
  var loadComments = document.querySelector('.comments-loader');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');

  var showBigPicture = function (publication) {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = publication.url;
    bigPicture.querySelector('.likes-count').textContent = publication.likes;
    bigPicture.querySelector('.comments-count').textContent = publication.comments.length;
    bigPicture.querySelector('.social__caption').textContent = publication.description;
    var commentItem = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + window.utils.getRandomInteger(MIN_AVATAR_URL, MAX_AVATAR_URL) + '.svg" alt="Аватар комментатора фотографии"width="35" height="35"><p class="social__text">' + publication.comments + '</p></li>';

    socialСommentCount.classList.add('visually-hidden');
    loadComments.classList.add('visually-hidden');

    socialCommentList.insertAdjacentHTML('afterBegin', commentItem);

    // навешиваем обработчики
    var closeBigPicture = function () {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', keyCloseBigPictureHandler);
    };

    var keyCloseBigPictureHandler = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
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

  window.preview = {
    showBigPicture: showBigPicture
  };


})();
