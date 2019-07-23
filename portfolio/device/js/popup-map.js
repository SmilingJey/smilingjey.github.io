//Модальное окно карта
var mapPopup = document.querySelector(".modal-map");

if (mapPopup){
  var mapLink = document.querySelector(".contact-button-map");
  var mapClose = mapPopup.querySelector(".modal-close");
  
  mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.add("modal-show");
    overlay.classList.add("modal-overlay-show");
  });
  
  mapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove("modal-show");
    overlay.classList.remove("modal-overlay-show");
  });
  
  //закрытие модальных окон по ESC
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (mapPopup.classList.contains("modal-show")) {
        mapPopup.classList.remove("modal-show");
        overlay.classList.remove("modal-overlay-show");
      }
    }
  });

  //закрытие модальных окон по click на overlay
  var overlay = document.querySelector(".modal-overlay");
  overlay.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (mapPopup.classList.contains("modal-show")) {
      mapPopup.classList.remove("modal-show");
      overlay.classList.remove("modal-overlay-show");
    }
  });
}