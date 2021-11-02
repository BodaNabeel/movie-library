// Variables
const inputField = document.querySelector(".input-field");
const markupWrapper = document.querySelector(".markup-wrapper");
const errorMessage = document.querySelector(".error-message");

// Functions

// 1. Checking if keyword value is empty or not
const valueChecker = function (keyword) {
  if (keyword === "") {
    errorMessage.style.display = "block";
    setTimeout((e) => {
      errorMessage.style.display = "none";
    }, 1000);
  } else {
    // TODO: Add the code for fetching API here
  }
};

inputField.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    const keyword = inputField.value;
    valueChecker(keyword);
  }
});
