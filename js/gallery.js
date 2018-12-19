'use strict';
(function () {

  var picturesBlock = document.querySelector('.pictures');

  var getUsersPhotos = function (publications) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < publications.length; i++) {
      fragment.appendChild(window.picture.createPhotoElement(publications[i]));
    }
    return fragment;
  };


  var publications = window.data.renderPublication(window.data.PHOTOS_QUANTITY);
  picturesBlock.appendChild(getUsersPhotos(publications));

})();

