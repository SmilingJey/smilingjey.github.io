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
