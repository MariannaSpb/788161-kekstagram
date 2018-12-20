'use strict';
(function () {
  var MIN_VLUE_PIN = 0;
  var effectLevelValue = document.querySelector('.effect-level__value'); // effectLevel
  var pinPosition;
  var filterPin = document.querySelector('.effect-level__pin');

  filterPin.addEventListener('mousedown', function (evt) { // обработаем событие начала перетаскивания
    evt.preventDefault();


    var startCoords = evt.clientX; // запомним координаты

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();


      var shift = startCoords - moveEvt.clientX;


      startCoords = moveEvt.clientX;

      pinPosition = window.form.filterPin.offsetLeft - shift;
      if (pinPosition >= MIN_VLUE_PIN && pinPosition <= window.form.pinLineWidth.offsetWidth) {
        var pinPercents = Math.round(pinPosition * 100 / window.form.pinLineWidth.offsetWidth);
        effectLevelValue.value = pinPercents;
        window.form.filterPin.style.left = pinPosition + 'px';
        window.form.effectLevelDepth.style.width = pinPercents + '%';
        window.form.currentEffect.style.filter = window.form.setFilter(pinPercents);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
