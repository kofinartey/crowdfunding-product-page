const optionsData = [
  {
    name: "Pledge with no reward",
    id: "no-reward",
    pledgeQuote: "",
    itemDetails:
      "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.",
  },

  {
    name: "Bamboo Stand",
    id: "bamboo",
    pledgeQuote: "Pledge $25 or more",
    minPledge: 25,
    itemDetails:
      "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
    stock: 101,
  },

  {
    name: "Black Edition Stand",
    id: "black",
    pledgeQuote: "Pledge $75 or more",
    minPledge: 75,
    itemDetails:
      "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
    stock: 64,
  },

  {
    name: "Mahogany Special Edition",
    id: "mahogany",
    pledgeQuote: "Pledge $200 or more",
    minPledge: 200,
    itemDetails:
      "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
    stock: 2,
  },
];

//select a region in the ABOUT SECTION to insert generaed elements
const allItems = document.querySelector(".all-items");
allItems.innerHTML = `${optionsData.map(makeItems).join("")}`;

//select a region in the MODAL FORMS to insert generaed elements
const chooseOption = document.querySelector("#chooseOption");
chooseOption.innerHTML = `${optionsData.map(makeOption).join("")}`;

/*===== CREATE ITEM OPTIONS UNDER ABOUT ON MAIN PAGE =====*/
function makeItems(item) {
  if (item.stock == null) {
    return ``;
  } else
    return `
      <div class="item">
        <div class="item__head">
          <h4 class="item__name">${item.name}</h4>
          <p class="pledge">Pledge $${item.minPledge} or more</p>
        </div>

        <p class="item__about">${item.itemDetails}</p>
        <div class="item__cta">
          <div class="stock">
            <h2 class="num">${item.stock}</h2>
            <p>left</p>
          </div>
          <button class="button open__modal" id="${item.id}btn">Select Reward</button>
        </div>
      </div>
    `;
}

/*===== CREATE MODAL OPTIONS =====*/
function makeOption(option) {
  return `
    <div class="option">
      <div class="select">
        <input 
          type="radio" 
          name="selection" 
          id="${option.id}" 
          value="${option.id}" 
        />
        <label for=${option.id}>
          <div class="radio-circle"></div>
          <div class="pledge__type">
            <h4>${option.name}</h4>
            <p>${option.pledgeQuote}</p>
          </div>
        </label>
      </div>

      <div class="option__details">
        <p>${option.itemDetails}</p> 
      </div>
      ${option.stock ? stock(option.stock) : ""}  
      <div class="line"></div>
      <div class="pledge__form">
        <p>Enter your pledge</p>
        <div class="make__pledge">
          <input type="text" name="pledge" placeholder="0.00" />
          <button class="button continue" id="${
            option.id
          }Cont">Continue</button>
        </div>
        <small>Please enter a valid pledge</small>
      </div>
    </div>
  
  `;
}

function stock(data) {
  return `
  <div class="stock">
    <h2 class="num">${data}</h2>
    <p>left</p>
  </div>
  `;
}

// const optionRadios = document.querySelectorAll(".select input");
// const pledgeOptions = document.querySelectorAll(".option");
const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const mobileMenu = document.querySelector(".mobile__menu");
const backProject = document.querySelector("#btn-back-project");
const modals = document.querySelectorAll(".modal");
const modalClose = document.querySelector(".modal__close");
const selectReward = document.querySelectorAll(".open__modal");
const [supportModal, successModal] = modals;
const selects = document.querySelectorAll(".select");
const continueBtns = document.querySelectorAll(".continue");
const successBtn = document.querySelector("#success .button");
const progressBar = document.querySelector(".pb__fill");

// let currentTotalString = document.querySelector("#currentTotal").innerHTML;
// let currentTotal = parseInt(currentTotalString.replace(",", ""));
// let pledge = 0;

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

//show overlay and EVENTS
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
  modalDisplay(successModal, "hide");
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
  overlayDisplay("hide");
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
    // overlayDisplay("hide");
  }
}

//select reward buttons
selectReward.forEach((reward) => {
  reward.addEventListener("click", () => {
    modalDisplay(supportModal, "show");
    //get button id
    const rewardBtnId = reward.id;
    //go through all the inputs for the various options
    const optionInputs = document.querySelectorAll(".select input");
    optionInputs.forEach((option) => {
      //get their IDs
      let inputId = option.id;
      //for all input IDs , if optionId contains a select Id...
      if (rewardBtnId.indexOf(inputId) != -1) {
        //...choose that input.
        let inputToSelect = document.querySelector(`.select #${inputId}`);
        //apply .selected class to it's grandparent
        inputToSelect.parentElement.parentElement.classList.add("selected");

        //scroll selected option into view
        setTimeout(() => {
          inputToSelect.parentElement.parentElement.scrollIntoView({
            behavior: "smooth",
          });
        }, 1000);
      }
    });
  });
});

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

//clear a seletion
function clearSelection() {
  let currentSelection = document.querySelector(".option.selected");
  let currentInput = document.querySelector(".selected .pledge__form input");
  if (currentSelection) {
    currentSelection.classList.remove("selected");
  }
  if (currentInput) {
    currentInput.value = "";
    currentInput.classList.remove("error");
  }
}

//reset modal
function resetModal() {
  clearSelection();
  modalClose.scrollIntoView();
}

//pledge submit button
continueBtns.forEach((btn) => {
  //get minPledge
  let userInput = btn.previousElementSibling;
  let pledgeForm = btn.parentElement.parentElement;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    //get pledge limit for the repective option
    //go through data and find object that matches the button's id
    let btnId = btn.id;
    optionsData.forEach((option) => {
      if (btnId.indexOf(option.id) != -1) {
        let limit = option.minPledge;

        //checking inputs
        if (userInput.value < limit) {
          console.log("amount too small for option");
          pledgeForm.classList.add("error");
        } else if (userInput.value === "") {
          console.log("empty input");
          pledgeForm.classList.add("error");
        } else if (isNaN(userInput.value.trim())) {
          console.log("error: string");
          pledgeForm.classList.add("error");
        } else {
          pledgeForm.classList.remove("error");
          modalDisplay(supportModal, "hide");
          setTimeout(() => {
            modalDisplay(successModal, "show");
          }, 1000);
          // save pledge
          userPledge = parseInt(userInput.value);
          updateStock();
        }
      }
    });
  });
});

//update stock (to be run when pledge inputs are valid)
function updateStock() {
  //select selected option,...
  //...get it's id. NB: only its radio button has an Id, so get that
  let selectedInput = document.querySelector(".selected input");
  let selectedOption = selectedInput.parentElement.parentElement;
  let selectedOptionId = selectedInput.id;
  //find the data with the selected id
  optionsData.forEach((data) => {
    if (data.stock) {
      /*the above line checks if data has stocks. thus we ignore the "no-reward" pledge */
      if (data.id == selectedOptionId) {
        // decrement stock for the data that matches the id
        data.stock--;
        // display stock inside options selector in modal
        let stockDisplay1 = selectedOption.querySelector(".stock .num");
        stockDisplay1.innerHTML = data.stock;
        // display stock inside items selector main page (about section)
        let itemCollection = document.querySelectorAll(".item");
        //loop through items displayed in about and find one with an ID that matches data.ID
        itemCollection.forEach((item) => {
          let itemButton = item.querySelector("button");
          let itemId = itemButton.id;
          if (itemId.indexOf(data.id) != -1) {
            let interstedStock =
              itemButton.previousElementSibling.querySelector(".num");
            interstedStock.innerHTML = data.stock;
            //run this when out of stock
            if (data.stock == 0) {
              itemButton.innerHTML = "Out of Stock";
              item.classList.add("out__of__stock");
            }
          }
        });

        if (data.stock == 0) {
          // select item and apply inactive styles to it
          selectedOption.classList.add("out__of__stock");
          console.log(data.id + "is out of stock");
        }
      }
    }
  });
  //decrement stock by 1
  //display new stock upon success event
}

//handle math on success
const TARGET = 100000;
let totalPledged = 50914;
let totalBackers = 5007;
let userPledge = 0;
let pledgeDisplay = document.querySelector("#currentTotal");
let backersDisplay = document.querySelector(".total__backers .num");
let barLength;

updateProgress(); /*running this ensures that the numbers in js are displayed when the page first loads*/

successBtn.addEventListener("click", (btn) => {
  const progressSection = document.querySelector(".progress");
  totalPledged = totalPledged + userPledge;
  totalBackers = totalBackers + 1;
  //update amount on page
  modalDisplay(successModal, "hide");
  overlayDisplay("hide");
  overlay.removeEventListener("click", () => {});
  progressSection.scrollIntoView({ behavior: "smooth" });
  progressBar.style.width = `0%`;

  setTimeout(() => {
    progressBar.style.transition = "all 0.6s ease-in-out";
    resetModal();
    updateProgress();
    setTimeout(() => {
      progressBar.style.transition = "all 0s ease-in-out";
    }, 10);
  }, 500);
});

function updateProgress() {
  let totalPledgedStr = totalPledged.toString();
  let totalBackersStr = totalBackers.toString();
  // for (let i = 3; i < totalPledgedStr.length; i += 3) {
  //   totalPledgedStr =
  //     totalPledgedStr.slice(0, -i) + "," + totalPledgedStr.slice(-1);
  // }
  // for (let i = 3; i < totalBackersStr.length; i += 3) {
  //   totalBackersStr =
  //     totalBackersStr.slice(0, -i) + "," + totalBackersStr.slice(-1);
  // }
  pledgeDisplay.innerHTML = totalPledgedStr;
  backersDisplay.innerHTML = totalBackersStr;
  barLength = (totalPledged / TARGET) * 100;
  progressBar.style.width = `${barLength}%`;
}
