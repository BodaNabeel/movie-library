// Variables
const inputField = document.querySelector(".input-field");
const markupWrapper = document.querySelector(".markup-wrapper");
const errorMessage = document.querySelector(".error-message");
const titleMovie = document.querySelector("#title-movie");
const containerOverviewArea = document.querySelector(".container-display-area");
const containerDetailArea = document.querySelector(".container-detail");
const apiKey = "b082a0d9";

let markup;
// Functions

// Fetchig overview-API
async function overview_fetchAPI(e) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s="${e}"`);
  const json = await res.json();
  updateOverviewContainer(json);
  getTitle();
}

// Fetching detail-API
async function detail_fetchAPI(e) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t="${e}"`);
  const json = await res.json();
  updateDetailContainer(json);
}

// getting title of card
const getTitle = function () {
  const cardBtn = document.querySelectorAll(".card-btn");
  const cardTitle = document.querySelectorAll(".card-name");
  cardBtn.forEach((el, curr) => {
    el.addEventListener("click", function () {
      // console.log(cardTitle[curr].innerHTML)
      let value = cardTitle[curr].innerHTML;

      // giving the title as value to detailed_fetchAPI
      detail_fetchAPI(value);
    });
  });
};

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
    containerOverviewArea.innerHTML = "";
  }
};

// Changing DOM for overview-review
const updateOverviewContainer = function (data) {
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
    containerOverviewArea.innerHTML += markup;
  }
};

// Changing DOM for detail-review
const updateDetailContainer = function (data) {
  markup = `
  <div class="top-info">
  <img
  src="${data.Poster}"
  alt="Thumbnail of movie"
  class="container-detail__img"
/>
<aside class="container-detail__info">
  <h2 class="container-detail__heading">${data.Title}</h2>
  <p class="movie-info__des">Genre: ${data.Genre}</p>
  <p class="movie-info__des">Released: ${data.Released}</p>
  <p class="movie-info__des">Writer: ${data.Writer}</p>
  <p class="movie-info__des">Rating: ${data.Ratings[0].Value}</p>
  <p class="movie-info__des">Rated: ${data.Rated}</p>
</aside>
</div>
<div class="container-detail__plot">
  <h2 class="plot__heading">Plot:</h2>
  <p class="plot_para">${data.Plot}</p>
  <div class="buttons">
    <button class="plot-btn imbd-btn"> <a class="imbd-link" target="_blank" rel="noopener noreferrer" href="https://www.imdb.com/title/${data.imdbID}/?ref_=fn_al_tt_1">IMBd</a></button>
    <button class="plot-btn default-btn">Close</button>
  </div>
</div>`;
  containerDetailArea.innerHTML = markup;
  containerDetailArea.style.display = "grid";
};
inputField.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    const keyword = inputField.value;
    valueChecker(keyword);
  }
});
