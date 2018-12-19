'use strict';
(function () {

  var ESC_KEYCODE = 27;

  // var isEscEvent = function (evt) {
  //   return evt.keyCode === ESC_KEYCODE;
  // };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (array) {
    return array[getRandomInteger(0, array.length)];
  };

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomInteger: getRandomInteger,
    ESC_KEYCODE: ESC_KEYCODE
  };

})();
