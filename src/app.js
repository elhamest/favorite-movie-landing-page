window.addEventListener("scroll", function () {
  var header = document.querySelector("#navbar");
  header.classList.toggle("sticky", window.scrollY > 0);
});

/*-----*/

const sliders = document.querySelector(".gallery-container");
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

/*-----*/

const navLinks = document.querySelectorAll(".navbar-item-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const topOffset = targetElement.offsetTop;
    window.scrollTo({ top: topOffset, behavior: "smooth" });
  });
});

const homepage = document.getElementById("homepage");

homepage.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*-----*/

const hamburgerElement = document.querySelector("#hamburger");
const navbarContainerElement = document.querySelector(".navbar-container");
hamburgerElement.addEventListener("click", () => {
  hamburgerElement.classList.toggle("active");
  navbarContainerElement.classList.toggle("active");
});

document.querySelectorAll(".navbar-item-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburgerElement.classList.remove("active");
    navbarContainerElement.classList.remove("active");
  }),
);

/*-----*/

const submitElement = document.querySelector("#submit");
submitElement.addEventListener("click", (event) => {
  const userEmail = document.querySelector("#email").value;

  event.preventDefault();
  if (userEmail.includes("@") && userEmail.includes(".com")) {
    alert(
      `Thank you for getting in touch with us, ${userEmail}! We will get back to you as soon as possible.`,
    );
  } else {
    alert("Please enter a valid email.");
  }
});

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
