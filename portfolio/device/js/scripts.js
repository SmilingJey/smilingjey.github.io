//фильтр по стоимости
var rangeFilter = document.querySelector(".range-filter");
if (rangeFilter){
  var scale = rangeFilter.querySelector(".scale");
  var bar = scale.querySelector(".bar");
  var toggleMin = rangeFilter.querySelector(".toggle-min");
  var toggleMax = rangeFilter.querySelector(".toggle-max");
  var toggleMinMarker = toggleMin.querySelector("div");
  var toggleMaxMarker = toggleMax.querySelector("div");
  var toggleMinText = toggleMin.querySelector("span");
  var toggleMaxText = toggleMax.querySelector("span");
  var inputMinPrice = rangeFilter.querySelector("[name=min-price]");
  var inputMaxPrice = rangeFilter.querySelector("[name=max-price]");
  var minPrice = 0;
  var maxPrice = 9000;
  var MAX_PRICE = 9000;

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  toggleMinMarker.addEventListener("mousedown", function(evt){
    evt.preventDefault();

    var markerCoords = getCoords(toggleMinMarker);
    var shiftX = evt.pageX - markerCoords.left;
    var scaleCoords = getCoords(scale);

    var documentMouseMove = function(evt){
      evt.preventDefault();
      var scaleWidth = scale.offsetWidth - toggleMax.offsetWidth;
      var newLeft = evt.pageX - shiftX - scaleCoords.left;

      var leftEdge = 0;
      if (newLeft < leftEdge) newLeft = leftEdge;

      rightEdge = scaleWidth * maxPrice/MAX_PRICE - toggleMin.offsetWidth;
      if (newLeft > rightEdge) newLeft = rightEdge;

      minPrice = Math.round(newLeft/scaleWidth * MAX_PRICE);
      toggleMin.style.left = newLeft + "px";
      bar.style.left = newLeft + "px";
      bar.style.width = scale.offsetWidth*(maxPrice-minPrice)/MAX_PRICE + "px";
      toggleMinText.textContent = "от " + minPrice;
      inputMinPrice.value = minPrice;

      var koef = 1 - (maxPrice-minPrice)/MAX_PRICE * (scaleWidth)/scaleWidth;
      koef *=0.85;
      toggleMinText.style.marginLeft = 0 - toggleMinText.offsetWidth*koef + "px";
      toggleMaxText.style.marginLeft = -35 + toggleMaxText.offsetWidth*koef + "px";
    }

    document.addEventListener("mousemove",documentMouseMove, false);

    document.addEventListener("mouseup", function(evt){
      evt.preventDefault();
      document.removeEventListener("mousemove",documentMouseMove, false);
    });
  });

  toggleMaxMarker.addEventListener("mousedown", function(evt){
    evt.preventDefault();

    var markerCoords = getCoords(toggleMaxMarker);
    var shiftX = evt.pageX - markerCoords.left;
    var scaleCoords = getCoords(scale);

    var documentMouseMove = function(evt){
      evt.preventDefault();
      var scaleWidth = scale.offsetWidth - toggleMax.offsetWidth;
      var newLeft = evt.pageX - shiftX - scaleCoords.left;
      var leftEdge = Math.round(scaleWidth * minPrice/MAX_PRICE)+toggleMin.offsetWidth;
      if (newLeft < leftEdge) newLeft = leftEdge;

      var rightEdge = scaleWidth;
      if (newLeft > rightEdge) newLeft = rightEdge;

      maxPrice = Math.round(newLeft/scaleWidth * MAX_PRICE);
      toggleMax.style.left = newLeft + "px";
      bar.style.width = scale.offsetWidth*(maxPrice-minPrice)/MAX_PRICE + "px";
      toggleMaxText.textContent = "от " + maxPrice;
      inputMaxPrice.value = maxPrice;

      var koef = 1 - (maxPrice-minPrice)/MAX_PRICE * (scaleWidth)/scaleWidth;
      koef *=0.85;
      toggleMinText.style.marginLeft = 0 - toggleMinText.offsetWidth*koef + "px";
      toggleMaxText.style.marginLeft = -35 + toggleMaxText.offsetWidth*koef + "px";
    }

    document.addEventListener("mousemove",documentMouseMove, false);

    document.addEventListener("mouseup", function(evt){
      evt.preventDefault();
      document.removeEventListener("mousemove",documentMouseMove, false);
    });
  });
}




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
//Модальное окно "напишите нам"
var writeusPopup = document.querySelector(".modal-writeus");
if (writeusPopup) {
  var writeusClose = writeusPopup.querySelector(".modal-close");
  var writeusForm = writeusPopup.querySelector("form");
  var writeusName = writeusForm.querySelector("[name=name]");
  var writeusEmail = writeusForm.querySelector("[name=email]");
  var writeusText = writeusForm.querySelector("[name=text]");

  var isStorageSupport = true;
  var storage = "";

  try {
    storage = localStorage.getItem("writeusName");
  } catch (err) {
    isStorageSupport = false;
  }

  var writeusLink = document.querySelector(".button-writeus");
  if (writeusLink){
    writeusLink.addEventListener("click", function (evt) {
      evt.preventDefault();
      writeusPopup.classList.add("modal-show");
      overlay.classList.add("modal-overlay-show");
      writeusName.focus();

      var writeusNameStore = localStorage.getItem("writeusName");
      var writeusEmailStore = localStorage.getItem("writeusEmail");

      if (writeusNameStore) {
        writeusName.value = writeusNameStore;
      } else {
        writeusName.focus();
      }

      if (writeusEmailStore) {
        writeusEmail.value = writeusEmailStore;
        writeusText.focus();
      } else {
        writeusEmail.focus();
      }

      if (!writeusNameStore) writeusName.focus();

    });
  }

  writeusClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    writeusPopup.classList.remove("modal-show");
    writeusPopup.classList.remove("modal-error");
    overlay.classList.remove("modal-overlay-show");
  });

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  writeusForm.addEventListener("submit", function (evt) {
    if (!writeusText.value) {
      writeusText.classList.add("form-invalid");
      writeusText.focus();
    }else writeusText.classList.remove("form-invalid");

    var emailValid = writeusEmail.value && validateEmail(writeusEmail.value)
    if (!emailValid){
      writeusEmail.classList.add("form-invalid");
      writeusEmail.focus();
    }else writeusEmail.classList.remove("form-invalid");

    if (!writeusName.value) {
      writeusName.classList.add("form-invalid");
      writeusName.focus();
    }else writeusName.classList.remove("form-invalid");

    if (!writeusName.value || !emailValid || !writeusText.value) {
      evt.preventDefault();
      writeusPopup.classList.remove("modal-error");
      writeusPopup.offsetWidth = writeusPopup.offsetWidth;
      writeusPopup.classList.add("modal-error");
    }else{
      if (isStorageSupport) {
        localStorage.setItem("writeusName", writeusName.value);
        localStorage.setItem("writeusEmail", writeusEmail.value);
      }
    }
  });

  writeusName.addEventListener("change", function (evt) {
    writeusName.classList.remove("form-invalid");
  });

  writeusText.addEventListener("change", function (evt) {
    writeusText.classList.remove("form-invalid");
  });

  writeusEmail.addEventListener("change", function (evt) {
    writeusEmail.classList.remove("form-invalid");
  });

  //закрытие по ESC
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (writeusPopup.classList.contains("modal-show")) {
        writeusPopup.classList.remove("modal-show");
        writeusPopup.classList.remove("modal-error");
        overlay.classList.remove("modal-overlay-show");
      }
    }
  });

  //закрытие click на overlay
  var overlay = document.querySelector(".modal-overlay");
  overlay.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (writeusPopup.classList.contains("modal-show")) {
      writeusPopup.classList.remove("modal-show");
      writeusPopup.classList.remove("modal-error");
      overlay.classList.remove("modal-overlay-show");
    }
  });
}

//переключение слайдов с интервалом
var slider = document.querySelector(".slider");
if (slider){
  var slides = slider.querySelectorAll("[name=toggle]");

  function nextSlide(){
    var slideNum = 0;
    for(; slideNum<slides.length;slideNum++){
      if (slides[slideNum].checked) break;
    }
    slideNum += 1;
    if (slideNum>=slides.length) slideNum = 0;

    slides[slideNum].checked = true;
  }

  var sliderInterval = setInterval(nextSlide, 5000);

  for(var i=0; i<slides.length;i++){
    slides[i].addEventListener("click", function (evt) {
      clearInterval(sliderInterval);
    });
  }

}

