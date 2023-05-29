const sliders = document.querySelector(".photo-container");

var imagePadding = 20;
var scrollPerClick = 250 + imagePadding;
var scrollAmount = 0;

sliders.addEventListener("wheel", function (event) {
  event.preventDefault();
  const delta = Math.sign(event.deltaY);
  sliders.scrollLeft += delta * 10;
});

function sliderScrollLeft() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmount -= scrollPerClick),
    behavior: "smooth",
  });
  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
}

function sliderScrollRight() {
  if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
    sliders.scrollTo({
      top: 0,
      left: (scrollAmount += scrollPerClick),
      behavior: "smooth",
    });
  }
}

/*
showMovieData();

async function showMovieData() {
  const apiKey = "372bdb5158eb7bdb8164d0880cb274d8";
  const apiURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    apiKey +
    "&sort_by=popularity.desc";
  var result = await axios.get(apiURL);

  console.log(result);
  result = result.data.results;
  result.map(function (cur, index) {
    sliders.insertAdjacentHTML(
      "beforeend",
      `<img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}" />`,
    );
  });
  scrollPerClick = 400;
}
*/
