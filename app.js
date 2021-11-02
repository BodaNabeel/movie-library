// Variables
const inputField = document.querySelector(".input-field");
const markupWrapper = document.querySelector(".markup-wrapper");
const errorMessage = document.querySelector(".error-message");
const titleMovie = document.querySelector("#title-movie");
const containerArea = document.querySelector(".container-display-area");
const apiKey = "b082a0d9";
let markup;
// Functions

// Fetchig overview-API
async function overview_fetchAPI(e) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s="${e}""`);
  const json = await res.json();
  updateContainer(json);
}

// Checking if keyword value is empty or not
const valueChecker = function (keyword) {
  if (keyword === "") {
    errorMessage.style.display = "block";
    setTimeout((e) => {
      errorMessage.style.display = "none";
    }, 1000);
  } else {
    overview_fetchAPI(keyword);
    titleMovie.innerHTML = keyword;
    inputField.value = "";
    containerArea.innerHTML = "";
  }
};

// Changing DOM for overview-review
const updateContainer = function (data) {
  for (i = 0; i < data.Search.length; i++) {
    markup = `<div class="card">
    <img
      src="${data.Search[i].Poster}"
      alt="Thumbnail of movie"
      class="card-img"
    />
    <p class="card-name">${data.Search[i].Title}</p>
    <button class="card-btn btn" id="btn-${i}">
      More Detail <i class="fas fa-chevron-right"></i>
    </button>
    </div>`;
    containerArea.innerHTML += markup;
  }
};

inputField.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    const keyword = inputField.value;
    valueChecker(keyword);
  }
});
