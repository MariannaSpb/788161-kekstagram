'use strict';
(function () {
  var VALUE_STEP = 25;
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var MAX_HASHTAG = 5;
  var MAX_SYMBOLS = 20;
  var MIN_SYMBOLS = 1; // хеш-тег не может состоять только из одной решётки;
  var controlSmaller = document.querySelector('.scale__control--smaller');
  var controlBigger = document.querySelector('.scale__control--bigger');
  var currentEffectImg = document.querySelector('.img-upload__preview');
  var controlValue = document.querySelector('.scale__control--value');
  var uploadFile = document.querySelector('#upload-file'); // input type file
  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // оверлей с фоткой после change input type file
  var imgUploadCancel = document.querySelector('.img-upload__cancel'); // кнопка закрытия формы
  var effectsList = document.querySelector('.effects__list'); // был пикча блок
  var currentEffect = document.querySelector('.img-upload__preview img');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevel = document.querySelector('.effect-level');
  var filterPin = document.querySelector('.effect-level__pin'); // найдём тот элемент, за который будем тащить
  var pinLineWidth = document.querySelector('.effect-level__line');
  var commentsInput = document.querySelector('.text__description');
  var buttonSubmit = document.querySelector('.img-upload__submit');
  var textHashtag = document.querySelector('.text__hashtags');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var succcessButton = templateSuccess.querySelector('.success__button');
  var errorButton = templateError.querySelectorAll('.error__button');
  var errorMessagePopup = main.appendChild(templateError);
  var successMessage = main.appendChild(templateSuccess);

  var resetForm = function () {
    var inputs = document.querySelectorAll('.effects__radio:checked');
    document.addEventListener('keydown', onPopupEscPress);
    currentEffect.removeAttribute('class');
    currentEffect.removeAttribute('style');
    currentEffectImg.removeAttribute('style');

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  };

  var effectsHandler = function (evt) {
    var target = evt.target;
    var effectClass = 'effects__preview--' + target.value;
    if (target.classList.contains('effects__radio')) {
      currentEffect.removeAttribute('class');
      currentEffect.classList.add(effectClass);
    }

    if (currentEffect.classList.contains('effects__preview--none')) {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
      filterPin.style.left = pinLineWidth.offsetWidth + 'px';
      effectLevelDepth.style.width = '100%';
      currentEffect.style.filter = setFilter(effectLevelDepth.style.width);
    }
  };

  // вспомогательная функция
  var setFilter = function (pinPercents) {
    currentEffect.style.filter = '';

    if (currentEffect.classList.contains('effects__preview--chrome')) {
      currentEffect.style.filter = 'grayscale(' + (pinPercents / 100) + ')';
    }
    if (currentEffect.classList.contains('effects__preview--sepia')) {
      currentEffect.style.filter = 'sepia(' + (pinPercents / 100) + ')';
    }
    if (currentEffect.classList.contains('effects__preview--marvin')) {
      currentEffect.style.filter = 'invert(' + pinPercents + '%)';
    }
    if (currentEffect.classList.contains('effects__preview--phobos')) {
      currentEffect.style.filter = 'blur(' + (pinPercents * 0.03) + 'px)';
    }
    if (currentEffect.classList.contains('effects__preview--heat')) {
      currentEffect.style.filter = 'brightness(' + (pinPercents * 0.03) + ')';
    }
    if (currentEffect.classList.contains('effects__preview--none')) {
      currentEffect.style.filter = 'none';
    }
  };

  // открытие-закрытие формочки

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    resetForm();
  };


  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    effectsList.addEventListener('click', effectsHandler);
    effectLevel.classList.add('hidden');
  });

  imgUploadCancel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
    effectsList.removeEventListener('click', effectsHandler);
    resetForm();
  });

  document.addEventListener('keydown', onPopupEscPress);

  var changePictureSize = function (difference) {
    var currentValue = parseInt(controlValue.value, 10);
    var newValue = difference < 0 ?
      Math.max(MIN_VALUE, currentValue + difference) :
      Math.min(MAX_VALUE, currentValue + difference);

    controlValue.value = newValue + '%';
    currentEffectImg.style.transform = 'scale(' + newValue / 100 + ')';
  };

  controlSmaller.addEventListener('click', function () {
    changePictureSize(-VALUE_STEP);
  });

  controlBigger.addEventListener('click', function () {
    changePictureSize(VALUE_STEP);
  });

  var checkCommentsValue = function () {
    var textareaValue = commentsInput.value;
    var errorMessage = '';
    if (textareaValue.length > 140) {
      errorMessage = 'максимальная длина 140';
    } else {
      errorMessage = '';
    }
    commentsInput.setCustomValidity(errorMessage);
  };

  commentsInput.addEventListener('input', checkCommentsValue);


  var checkHashtagValidity = function () {
    var errorMessage = '';
    var hashtagValue = textHashtag.value.trim();
    if (textHashtag.value !== '') {
      var hashTags = hashtagValue.toLowerCase().split(' '); // Набор хэш-тегов можно превратить в массив, воспользовавшись методом split, который разбивает строки на массивы.

      for (var i = 0; i < hashTags.length; i++) { // После этого, вы можете написать цикл, который будет ходить по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям.
        var hashtag = hashTags[i];
        if (hashtag[0] !== '#') {
          errorMessage = 'хэш-тег начинается с символа # (решётка)';
          break;
        } else if (hashtag.length === MIN_SYMBOLS) {
          errorMessage = 'хеш-тег не может состоять только из одной решётки';
          break;
        } else if (hashTags.indexOf(hashTags[i]) !== i) {
          errorMessage = 'хеш-тег не должен повторяться';
          break;
        } else if (hashTags.length > MAX_HASHTAG) {
          errorMessage = 'нельзя указать больше пяти хэш-тегов';
          break;
        } else if (hashtag.length > MAX_SYMBOLS) {
          errorMessage = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
          break;
        } else {
          errorMessage = '';
        }
      }
    }
    textHashtag.setCustomValidity(errorMessage);
  };

  textHashtag.addEventListener('change', checkHashtagValidity);

  buttonSubmit.addEventListener('click', function () {
    checkHashtagValidity();
  });


  commentsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  textHashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  errorMessagePopup.classList.add('visually-hidden');
  successMessage.classList.add('visually-hidden');

  var closePopupEsc = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onClosePopup(errorMessagePopup);
      onClosePopup(successMessage);
    }
  };


  var openSuccessMessage = function () {
    successMessage.classList.remove('visually-hidden');
    succcessButton.addEventListener('click', function () {
      onClosePopup(successMessage);
    });
    document.addEventListener('keydown', closePopupEsc);
  };

  var onClosePopup = function (element) {
    element.classList.add('visually-hidden');
    document.removeEventListener('keydown', closePopupEsc);
  };


  var openErrorMessage = function () {
    errorMessagePopup.classList.remove('visually-hidden');
    form.reset();
    closePopup();
    for (var i = 0; i < errorButton.length; i++) {
      errorButton[i].addEventListener('click', function () {
        onClosePopup(errorMessagePopup);
      });
    }
    document.addEventListener('keydown', closePopupEsc);
  };

  var onSuccessClick = function () {
    form.reset();
    closePopup();
    document.addEventListener('keydown', onPopupEscPress);
    openSuccessMessage();
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), onSuccessClick, openErrorMessage);
    evt.preventDefault();
  });

  window.form = {
    setFilter: setFilter,
    filterPin: filterPin,
    pinLineWidth: pinLineWidth,
    effectLevelDepth: effectLevelDepth,
    currentEffect: currentEffect,
  };

})();
