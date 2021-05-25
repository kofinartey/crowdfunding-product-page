const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const mobileMenu = document.querySelector(".mobile__menu");

//hamburger
hamburger.addEventListener("click", () => {
  if (hamburger.classList.contains("hamburger__open")) {
    hamburger.classList.remove("hamburger__open");
    overlay.classList.remove("overlay--show");
    mobileMenu.classList.remove("mobile__menu--show");
  } else {
    hamburger.classList.add("hamburger__open");
    overlay.classList.add("overlay--show");
    mobileMenu.classList.add("mobile__menu--show");
  }
});

//bookmark activity
bookmark.addEventListener("click", () => {
  const bookmarkText = document.querySelector("#bkmk");
  if (bookmark.classList.contains("bookmark__active")) {
    bookmark.classList.remove("bookmark__active");
    bookmarkText.innerText = "Bookmark";
  } else {
    bookmarkText.innerText = "Bookmarked";
    bookmark.classList.add("bookmark__active");
  }
});

//back this project
