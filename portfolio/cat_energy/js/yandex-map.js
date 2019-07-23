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
