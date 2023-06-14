//it should execute at first load, bz when I'm in the middle of the page and we refresh the page, the menu.sticky isn'i added to the navbar
addStickyClassToHeader();

/*---- Carousel ----*/
function initializeCarousel(
  carouselId,
  leftIconId,
  rightIconId,
  eachImageWidth,
  imagePadding,
) {
  const carouselElement = document.getElementById(carouselId);
  const leftIcon = document.getElementById(leftIconId);
  const rightIcon = document.getElementById(rightIconId);

  let oneImageWidth = eachImageWidth + imagePadding;
  let isDragStart = false,
    isDragging = false,
    initialDragX,
    mouseDragDistance;

  function dragStart(event) {
    //occured on mousedown
    isDragStart = true;
    //used to store the previous X-coordinate of the mouse pointer or touch event when the drag starts.
    initialDragX = event.pageX || event.touches[0].pageX;
    //used to store the current horizontal scroll position of the carouselElement when the drag starts. initialScrollLeft
    initialHorizontalScrollPosition = carouselElement.scrollLeft;
  }

  function showHideIcon() {
    let maxScrollableWidth =
      carouselElement.scrollWidth - carouselElement.clientWidth;
    leftIcon.style.display = carouselElement.scrollLeft == 0 ? "none" : "block";
    rightIcon.style.display =
      Math.ceil(carouselElement.scrollLeft) == maxScrollableWidth
        ? "none"
        : "block";
  }

  leftIcon.addEventListener("click", () => {
    carouselElement.scrollLeft += -oneImageWidth;
    setTimeout(() => showHideIcon(), 60); //calling showHideIcons after 60ms
  });

  rightIcon.addEventListener("click", () => {
    carouselElement.scrollLeft += oneImageWidth;
    setTimeout(() => showHideIcon(), 60); //calling showHideIcons after 60ms
  });

  /*----*/

  function dragCarousel(event) {
    //occured when mousemove

    // scrolling images to left according to mouse pointer
    if (!isDragStart) return;
    event.preventDefault();
    isDragging = true;
    carouselElement.classList.add("dragging");

    //Where the mouse is now on the screen minus where the drag started.
    mouseDragDistance = (event.pageX || event.touches[0].pageX) - initialDragX;

    carouselElement.scrollLeft =
      initialHorizontalScrollPosition - mouseDragDistance;
    showHideIcon();
  }

  function autoSlide() {
    //bz of: if there is no img left then it start scrolling back
    //carouselElement.scrollWidth:
    //// returns the total width of the scrollable content of the carouselElement,
    //// including any content that overflows beyond the element's visible width.
    //carouselElement.clientWidth:
    //// returns the visible width of the carouselElement, which is the width of the element's content area excluding any vertical scrollbar (if present) and padding.
    let maxScrollableWidth =
      carouselElement.scrollWidth - carouselElement.clientWidth;
    if (carouselElement.scrollLeft == maxScrollableWidth) return;

    //making mouseDragDistance value to positive
    mouseDragDistance = Math.abs(mouseDragDistance);

    //getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = oneImageWidth - mouseDragDistance;

    //user scrolling to the right
    if (carouselElement.scrollLeft > initialHorizontalScrollPosition) {
      return (carouselElement.scrollLeft +=
        mouseDragDistance > oneImageWidth / 3
          ? valDifference
          : mouseDragDistance);
    }
    //user scrolling to the left
    carouselElement.scrollLeft -=
      mouseDragDistance > oneImageWidth / 3 ? valDifference : mouseDragDistance;
  }

  function dragStop() {
    //occured when mouseup or mouseleave
    isDragStart = false;
    carouselElement.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;

    if (window.matchMedia("(max-width: 390px)").matches) {
      autoSlide();
    }
  }

  carouselElement.addEventListener("mousedown", dragStart);
  carouselElement.addEventListener("mousemove", dragCarousel);
  carouselElement.addEventListener("mouseup", dragStop);
  carouselElement.addEventListener("mouseleave", dragStop);
}

// Call the function with the appropriate arguments for each carousel
const firstImageElement = document
  .getElementById("gallery-carousel")
  .getElementsByTagName("img")[0];
const firstImageWidth = firstImageElement.width;

initializeCarousel(
  "gallery-carousel",
  "gallery-left-icon",
  "gallery-right-icon",
  firstImageWidth,
  14,
);

/*
const firstCardElement = document
  .getElementById("actor-carousel")
  .getElementsByClassName("actor-card")[0];
const firstCardWidth = firstCardElement.width;
*/
initializeCarousel(
  "actor-carousel",
  "actor-left-icon",
  "actor-right-icon",
  150,
  20,
);

/*---- navbar menu ----*/
const navLinksElement = document.querySelectorAll(".navbar-item-link");
const homepageElement = document.getElementById("homepage");
const hamburgerElement = document.querySelector("#hamburger");
const navbarContainerElement = document.querySelector(".navbar-container");

navLinksElement.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const targetTopOffset = targetElement.offsetTop;
    window.scrollTo({ top: targetTopOffset, behavior: "smooth" });
  });
});

homepageElement.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*---- Hamburger ----*/

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

/*---- sticky menu ----*/
function addStickyClassToHeader() {
  let header = document.getElementById("navbar");
  header.classList.toggle("sticky", window.scrollY > 0);
}

/*---- Active menu link by window scroll----*/

const sections = document.querySelectorAll("section");

function findTargetByWindowScroll() {
  //const  = window.scrollY;
  const currentScrollPosition = window.pageYOffset;

  // Loop through each section and check if it is in view
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop - 250;
    const sectionHeight = section.offsetHeight;

    if (
      currentScrollPosition >= sectionTop &&
      currentScrollPosition < sectionTop + sectionHeight
    ) {
      // If the section is in view, add the "active-navbar-item-link" class to the corresponding menu link
      navLinksElement.forEach((link) => {
        link.classList.remove("active-by-scroll");
      });
      //console.log(navLinksElement[index]);
      navLinksElement[index].classList.add("active-by-scroll");
    }
  });
}

window.addEventListener("scroll", () => {
  addStickyClassToHeader();
  findTargetByWindowScroll();
});

/*---- footer ----*/

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

/*--------*/

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

let funnyTextIndex = 1;

function showQuote() {
  if (funnyTextIndex === 10) {
    funnyTextIndex = 0;
  }
  quoteTextElement.innerHTML = funnyText[funnyTextIndex];
  //console.log(funnyTextIndex);
  //console.log(`(${funnyTextIndex + 1}/5)`);
  quoteInfoNoElement.textContent = `(${funnyTextIndex + 1}/10)`;
  funnyTextIndex += 1;
}

/*---- load more ----*/
let loadMoreButtonElement = document.getElementById("load-more-button");
let currentItem = 6;

loadMoreButtonElement.addEventListener("click", () => {
  let actors = document.querySelectorAll(".actor-container .actor-card");
  for (let i = currentItem; i < currentItem + 12; i++) {
    //console.log(actors[i]);
    actors[i].style.display = "flex";
  }
  currentItem += 12;
  //console.log(currentItem);
  if (currentItem >= actors.length) {
    loadMoreButtonElement.style.display = "none";
  }
});

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
    carousel.insertAdjacentHTML(
      "beforeend",
      `<img class="img-${index} carousel-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}" />`,
    );
  });
}
*/
