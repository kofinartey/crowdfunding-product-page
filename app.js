const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const mobileMenu = document.querySelector(".mobile__menu");

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
