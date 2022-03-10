"use strict";

let cleave = new Cleave("#user_phone", {
  phone: true,
  phoneRegionCode: "RU",
});

const userName = document.getElementById("user_name");
const userPhone = document.getElementById("user_phone");
const submitBtn = document.getElementById("submit-email");
const errorBox = document.getElementById("errors");

function submitEmailSending(userNameVal, userPhoneVal) {
  submitBtn.disabled = true;
  userName.disabled = true;
  userPhone.disabled = true;

  let templateParams = {
    user_name: userNameVal,
    user_phone: userPhoneVal,
  };

  emailjs.send("service_xzlt19l", "template_rwwsltr", templateParams).then(
    function (response) {
      errorBox.innerText = "Заявка отправлена! Спасибо.";
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      errorBox.innerText =
        "Не получилось отправить заявку. Обновите страницу и попробуйте ещё раз.";

      console.log("FAILED...", error);
    }
  );
  console.log("object", templateParams);
}

userName.addEventListener("focus", (e) => {
  errorBox.innerText = "";
  if (userName.classList.contains("textInput__input-error")) {
    userName.classList.remove("textInput__input-error");
  }
});
userPhone.addEventListener("focus", (e) => {
  errorBox.innerText = "";
  if (userPhone.classList.contains("textInput__input-error")) {
    userPhone.classList.remove("textInput__input-error");
  }
});

submitBtn.addEventListener("click", (e) => {
  let errMessages = [];
  let isNameCorrect = false;
  let isPhoneCorrect = false;

  if (userName.value && userName.value !== "") {
    isNameCorrect = true;
  } else {
    isNameCorrect = false;
    userName.classList.add("textInput__input-error");

    errMessages.push("Введите имя");
  }

  if (
    userPhone.value.length === 16 ||
    (userPhone.value.length === 15 && !userPhone.value.startsWith("+"))
  ) {
    isPhoneCorrect = true;
  } else {
    isPhoneCorrect = false;
    userPhone.classList.add("textInput__input-error");
    errMessages.push("Неверно указан номер телефона");
  }

  if (errMessages.length > 0) {
    errorBox.innerText = errMessages.join(", ");
  }

  if (isNameCorrect && isPhoneCorrect) {
    errorBox.innerText = "";
    errMessages = [];
    submitEmailSending(userName.value, userPhone.value);
  }
});
