
var mapContainer = document.getElementById('google-map');

if (mapContainer) {
  var map;

  function setMapCenter() {
    if (window.innerWidth <= 768) {
      map.setCenter(new google.maps.LatLng(59.938616, 30.323014));
    }
  }

  function initMap() {
    map = new google.maps.Map(mapContainer, {
      zoom: 17,
      center: new google.maps.LatLng(59.938716, 30.319347),
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    });

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(59.938616, 30.323014),
      icon: 'img/map-pin.png',
      map: map
    });

    setMapCenter();
  }

  window.addEventListener("resize", function(){
    setMapCenter()
  });
}

var yandexMap = document.querySelector("#yandex-map");
var myMap;
if (yandexMap) {
  try {
    function setMapCenter() {
      if (window.innerWidth <= 768) {
        myMap.setCenter([59.938616, 30.323014]);
      } else {
        myMap.setCenter([59.938616, 30.316547]);
      }
    }

    ymaps.ready(init);
    function init(){
        // Создание карты.
        myMap = new ymaps.Map("yandex-map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [59.938616, 30.316547],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 16,
            controls: []
        });

        myPlacemark = new ymaps.Placemark([59.938616, 30.323014], {
          hintContent: 'Магазин Cat-energy',
          balloonContent: 'Россия, Санкт-Петербург, Большая Конюшенная улица, 19/8'
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/map-pin.png',
          // Размеры метки.
          iconImageSize: [124, 106],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-34, -100]
        }),

        myMap.geoObjects.add(myPlacemark)
    }

    yandexMap.classList.remove("contacts__map--nojs");

    window.addEventListener("resize", function(){
      setMapCenter()
    });
  } catch (e) {
    console.log("невозможно отобразить яндекс карты");
  }
}

'use strict';

var baBar = document.querySelector('.before-after__bar');
var baToggle = document.querySelector('.before-after__toggle');

var baBeforeImage = document.querySelector('.before-after__before');
var baAfterImage = document.querySelector('.before-after__after');

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

if (baBar && baToggle && baBeforeImage && baAfterImage) {
  var example = document.querySelector('.example');

  function baBackgroundPosition() {
    var bgPos =  getCoords(baToggle).left - getCoords(example).left + baToggle.offsetWidth/2;
    example.style.backgroundPosition = bgPos + 'px 0, 0 0';

    var bgWidth = example.offsetWidth - bgPos;
    example.style.backgroundSize = bgWidth + 'px 100%, 100% 100%';
  }

  baToggle.addEventListener("mousedown", function(evt){
    evt.preventDefault();

    var toggleCoords = getCoords(baToggle);
    var barCoords = getCoords(baBar);
    var shiftX = evt.pageX - toggleCoords.left;

    var documentMouseMove = function(evt){
      evt.preventDefault();
      var newLeft = evt.pageX - barCoords.left - shiftX;
      var min = 0;
      var max = baBar.offsetWidth - baToggle.offsetWidth;
      if (newLeft < min) newLeft = min;
      if (newLeft > max) newLeft = max;
      baToggle.style.marginLeft = newLeft + 'px';

      var baBeforeImageCoords = getCoords(baBeforeImage);
      var baAfterImageCoords = getCoords(baAfterImage);

      baBeforeImage.style.width = barCoords.left - baBeforeImageCoords.left +
                                  newLeft + baToggle.offsetWidth/2 + 'px';

      baAfterImage.style.width = baAfterImageCoords.left + baAfterImage.offsetWidth - (barCoords.left + baBar.offsetWidth) + baBar.offsetWidth - newLeft - baToggle.offsetWidth/2 + 'px';

      baBackgroundPosition();
    }

    document.addEventListener("mousemove",documentMouseMove, false);

    document.addEventListener("mouseup", function(evt){
      evt.preventDefault();
      document.removeEventListener("mousemove",documentMouseMove, false);
    });
  });

  window.addEventListener("resize",function(){
    baBackgroundPosition();
  });

  baBackgroundPosition();
}
