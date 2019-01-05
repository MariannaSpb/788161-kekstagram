'use strict';
(function () {

  var STATUS_SUCCESS = 200;
  var TIMEOUT = 10000;
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = ' https://js.dump.academy/kekstagram';
  // Функция получения данных с сервера
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT; // 10 сек

    xhr.open('GET', URL_GET); // настраивает запрос на получение данных с сервера, вызывая методы у объекта xhr
    xhr.send(); // открывем соединение
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + '' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;

    xhr.open('POST', URL_POST); // настраивает запрос передачи данных на сервер
    xhr.send(data);
  };


  window.backend = {
    load: load,
    upload: upload
  };

})();
