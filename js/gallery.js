'use strict';
(function () {

  var picturesBlock = document.querySelector('.pictures');

  var renderPublication = function (publications) { // onSuccessHandler
    var publicationsArray = [];
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < publications.length; i++) {
      publicationsArray.push(publications[i]);
      fragment.appendChild(window.picture.createPhotoElement(publications[i]));
    }
    picturesBlock.appendChild(fragment);
    return publicationsArray;

  };



// errorHandler

  window.backend.load(renderPublication, window.errorHandler); // + errorHandler

})();
