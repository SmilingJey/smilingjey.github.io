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

