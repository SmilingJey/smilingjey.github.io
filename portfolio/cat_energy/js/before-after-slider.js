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
