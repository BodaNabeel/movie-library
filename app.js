// Variables
const inputField = document.querySelector(".input-field");
const markupWrapper = document.querySelector(".markup-wrapper");
const errorMessage = document.querySelector(".error-message");
const titleMovie = document.querySelector("#title-movie");
const apiKey = "b082a0d9";

// Functions

// Fetchig overview-API
async function overview_fetchAPI(e) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s="${e}""`);
  const json = await res.json();
  console.log(json);
}

//
// Checking if keyword value is empty or not
const valueChecker = function (keyword) {
  if (keyword === "") {
    errorMessage.style.display = "block";
    setTimeout((e) => {
      errorMessage.style.display = "none";
    }, 1000);
  } else {
    // TODO: Add the code for fetching API here
    overview_fetchAPI(keyword);
    titleMovie.innerHTML = keyword;
    inputField.value = ""
  }
};

inputField.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    const keyword = inputField.value;
    valueChecker(keyword);
  }
});
