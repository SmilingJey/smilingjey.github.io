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



