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
/*-----*/

const funnyText = [
  "Emotions can’t be allowed to interfere with what is right.<br/>(John Smith)",
  "A man is only ever as strong as the people around him: The community he serves and the family he is sworn to protect. Whatever strength he has, he draws from them. And for them, he must be prepared to give everything.<br/>(John Smith)",
  "People are capable of anything. Especially when they’re desperate.<br/>(Joe Blake)",
  "We’ve seen things, you and me. Other worlds. Other lives. We have that in common. It’s unbearable. To be able to look through that door and glimpse all the people you could have been. And to know that out of all of them, this is the one you became.<br/>(John Smith)",
  "This place and this world will not last if we don’t change it for the better. It’s only a matter of time; it will get worse.<br/>(Juliana Crain)",
  "The only way to view the truth of life, is to stand apart from it, to see the consequence of every thought, every action. But still, we are bound by time and space, unable to steer our destiny.<br/>(Nobusuke Tagomi)",
  "We all have flaws, all of us, every single one of us. It makes us who we are.<br/>(Juliana Crain)",
  "The cultures we were born into mean that we do things differently. And yet I suspect that we also hold many of the same things in the highest esteem.<br/>(Nobusuke Tagomi)",
  "You don’t need anybody to keep you down because you got your own little inner fascist right there telling you what you can and cannot do. That’s how you let them win.<br/>(Mark Sampson)",
  "There comes a time when all men must bear the weight of their responsibility.<br/>(Inspector Kido)",
  "It takes a lot of effort not to be free. I kept my head down for so long, I forgot what it feels like to stand up.<br/>(Frank Frink)",
];
const quoteInfoNextElement = document.getElementById("quote-info-next");
quoteInfoNextElement.addEventListener("click", showQuote);
const quoteTextElement = document.getElementById("quote-text");
const quoteInfoNoElement = document.getElementById("quote-info-no");

var funnyTextIndex = 1;

function showQuote() {
  if (funnyTextIndex === 10) {
    funnyTextIndex = 0;
  }
  quoteTextElement.innerHTML = funnyText[funnyTextIndex];
  console.log(funnyTextIndex);
  console.log(`(${funnyTextIndex + 1}/5)`);
  quoteInfoNoElement.textContent = `(${funnyTextIndex + 1}/10)`;
  funnyTextIndex += 1;
}
/*-----*/

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
