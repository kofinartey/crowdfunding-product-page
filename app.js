const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const mobileMenu = document.querySelector(".mobile__menu");
const backProject = document.querySelector("#btn-back-project");
const modals = document.querySelectorAll(".modal");
const modalClose = document.querySelector(".modal__close");
const [supportModal, successModal] = modals;
const selects = document.querySelectorAll(".select");
const optionRadios = document.querySelectorAll(".select input");
const selectReward = document.querySelectorAll(".open__modal");
const pledgeOptions = document.querySelectorAll(".option");
const continueBtns = document.querySelectorAll(".continue");

const target = 100000;

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

//show overlay
function overlayDisplay(status) {
  if (status === "show") {
    overlay.classList.add("overlay--show");
  } else {
    overlay.classList.remove("overlay--show");
  }
}

overlay.addEventListener("click", () => {
  overlayDisplay("hide");
  modalDisplay(supportModal, "hide");
  resetModal();
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
backProject.addEventListener("click", () => {
  overlayDisplay("show");
  modalDisplay(supportModal, "show");
});

modalClose.addEventListener("click", () => {
  modalDisplay(supportModal, "hide");
  resetModal();
  // overlayDisplay("hide");
});

//modal show or hide
function modalDisplay(modalName, displayStatus) {
  if (displayStatus === "show") {
    setTimeout(() => {
      modalName.style.opacity = 1;
      modalName.style.pointerEvents = "all";
    }, 300);

    overlayDisplay("show");
  }
  if (displayStatus === "hide") {
    modalName.style.opacity = 0;
    modalName.style.pointerEvents = "none";
    overlayDisplay("hide");
  }
}

//select reward buttons
selectReward.forEach((reward) => {
  reward.addEventListener("click", () => {
    modalDisplay(supportModal, "show");
  });
});

//storage for plege options
function OptionCreator(name, stock, minPledge) {
  this.name = name;
  this.stock = stock;
  this.minPledge = minPledge;
}
OptionCreator.prototype.stockDecrement = function () {
  this.stock--;
};

//create options
let bamboo = new OptionCreator("bamboo", 101, 25);
let black = new OptionCreator("black", 64, 75);
let mahogany = new OptionCreator("mahogany", 2, 200);

//choose pledge
selects.forEach((select) => {
  let parent = select.parentElement;
  let selectRadio = parent.querySelector("input");
  select.addEventListener("change", () => {
    clearSelection();
    selectRadio.style.opacity = ".5";
    parent.classList.add("selected");
    setTimeout(() => {
      parent.scrollIntoView({ behavior: "smooth" });
    }, 100);
    selectRadio.checked = true;
  });
});

function clearSelection() {
  let currentSelection = document.querySelector(".option.selected");
  let currentInput = document.querySelector(".selected .pledge__form input");
  currentSelection.classList.remove("selected");
  currentInput.value = "";
  currentInput.classList.remove("error");
}

function resetModal() {
  // scroll to top
  modalClose.scrollIntoView();
  //clear all selections
  clearSelection();
  //select first option
  setTimeout(() => {
    selects[0].parentElement.classList.add("selected");
    selects[0].querySelector("input").checked = true;
  }, 700);
}

function checkInputs() {
  //empty input
  //contains anything but numbers
}

//submit pledge
continueBtns.forEach((btn) => {
  let userInput = btn.previousElementSibling;
  let pledgeForm = btn.parentElement.parentElement;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    //check user inputs;
    if (userInput.value === "") {
      console.log("empty input");
      pledgeForm.classList.add("error");
    } else if (isNaN(userInput.value.trim())) {
      console.log("error: string");
      pledgeForm.classList.add("error");
    } else {
      pledgeForm.classList.remove("error");
      let amount = userInput.value.trim();
      //***handle stock */
      resetModal();
    }
  });
});

//handle stock
