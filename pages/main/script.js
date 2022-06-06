// sidebar elements
const navLinks = document.getElementById("navLinks");
const menu = document.getElementById("sideBar-icon");
const sideBarBackground = document.getElementById("sideBar");
const logo = document.getElementById("sideBar-logo");
const barLinks = document.getElementById("sideBar-links");
const overlay = document.createElement("div");
const main = document.getElementById("main");
// pets block elements
const petImageFirst = document.getElementById("first-img");
const petImageSecond = document.getElementById("first-img");
// adding click to menu icon
menu.addEventListener("click", function () {
  if (menu.style.display === "") {
    menu.style.display = "flex";
    navLinks.style.display = "none";
    sideBarBackground.style.right = "0";
    barLinks.style.display = "flex";
    logo.style.display = "flex";
    document.body.classList.add("hiddenScroll");
    overlay.classList.add("menu-overlay");
    main.appendChild(overlay);
    menu.style.transform = " translateX(-15%) translateY(15%) rotate(90deg)";
  } else {
    sideBarBackground.style.right = "-320px";
    menu.style.display = "";
    navLinks.style.display = "";
    document.body.classList.remove("hiddenScroll");
    overlay.classList.remove("menu-overlay");
    menu.style.transform = "rotate(0)";
  }
});

///// adding click to overlay

overlay.addEventListener("click", function () {
  sideBarBackground.style.right = "-320px";
  menu.style.display = "";
  navLinks.style.display = "";
  document.body.classList.remove("hiddenScroll");
  overlay.classList.remove("menu-overlay");
  menu.style.transform = "rotate(0)";
});

const getBlockElementCount = () => {
  const width = window.innerWidth;
  if (width >= 1280) {
    return 3;
  } else if (768 <= width < 1200) {
    return 2;
  } else {
    return 1;
  }
};

const getRandomIndex = (maxIndex) => Math.floor(Math.random() * maxIndex);

const extendObjectWithId = (obj, idValue) => {
  return { ...obj, id: idValue };
};

const getRandomBlockElements = (arr, count) => {
  const result = [];
  let clonedArr = [...arr];
  //we need to pick "count" random numbers from array
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomIndex(clonedArr.length);
    //pick random element from array (index value varies from [0, arr.length - i] range)
    const element = clonedArr[randomIndex];
    clonedArr.splice(randomIndex, 1);
    result.push(element);
  }
  return result;
};

const getUniqueExtendedData = (data) => {
  const result = [];
  data.forEach((element, index) => {
    if (!result.some((r) => r.name === element.name)) {
      const extendedObj = extendObjectWithId(element, index);
      result.push(extendedObj);
    }
  });
  return result;
};

// create pet cards
const cardItems = (data) => {
  const ul = document.getElementById("card-list");
  const li = document.createElement("li");
  li.addEventListener('click', ()=>{
    showModal(data);
  });
  const image = document.createElement("img");
  image.src = data.img;
  image.alt = data.breed;
  const name = document.createElement("h5");
  name.innerHTML = data.name;
  const button = document.createElement("button");
  button.innerHTML = "Learn More";
  li.appendChild(image);
  li.appendChild(name);
  li.appendChild(button);
  ul.appendChild(li);
};

// remove lists child nodes
const removeListChildren = () => {
  const list = document.getElementById("card-list");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}

class Carousel {
  allElements = [];
  previousElements = [];
  currentElements = [];
  nextElements = [];
  elementCountPerBlock = 1;

  constructor(allElements, countPerBlock) {
    this.allElements = allElements;
    this.elementCountPerBlock = countPerBlock;
    if (allElements.length > 0) {
      this.currentElements = getRandomBlockElements(
        this.allElements,
        this.elementCountPerBlock
      );
      this.nextElements = this.getAvailableBlockRandomElements();
      this.previousElements = this.getAvailableBlockRandomElements();
    }
  }
  getCurrentElements() {
    if (this.currentElements.length === 0) {
      this.currentElements = getRandomBlockElements(
        this.allElements,
        this.elementCountPerBlock
      );
    }
    return this.currentElements;
  }
  getAvailableBlockRandomElements() {
    const availableElements = this.allElements.filter(
      (ud) => !this.currentElements.some((e) => e.id === ud.id)
    );
    return getRandomBlockElements(availableElements, this.elementCountPerBlock);
  }
  moveRight() {
    this.previousElements = [...this.currentElements];
    this.currentElements = [...this.nextElements];
    this.nextElements = this.getAvailableBlockRandomElements();
  }

  moveLeft() {
    this.nextElements = [...this.currentElements];
    this.currentElements = [...this.previousElements];
    this.previousElements = this.getAvailableBlockRandomElements();
  }
}

const getCarousel = () => {
  const carouselJson = localStorage.getItem("carousel");
  const parsedCarousel = JSON.parse(carouselJson);
  const carousel = new Carousel([], 1);
  Object.assign(carousel, parsedCarousel);
  return carousel;
};

const moveRightBtn = document.getElementById("moveRight");
moveRightBtn.addEventListener("click", function () {
  const carousel = getCarousel();
  carousel.moveRight();
  localStorage.setItem("carousel", JSON.stringify(carousel));
  removeListChildren();
  carousel.currentElements.forEach(pet => {
    cardItems(pet);
  })
});

const moveLeftBtn = document.getElementById("moveLeft");
moveLeftBtn.addEventListener("click", function () {
  const carousel = getCarousel();
  carousel.moveLeft();
  localStorage.setItem("carousel", JSON.stringify(carousel));
  removeListChildren();
  carousel.currentElements.forEach(pet => {
    cardItems(pet);
  })
});


window.addEventListener("DOMContentLoaded", (event) => {
  const blockElementCount = getBlockElementCount();
  fetch(
    "https://raw.githubusercontent.com/rolling-scopes-school/js-fe-course-en/main/tasks/shelter/pets.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let uniqueData = getUniqueExtendedData(data);
      const carousel = new Carousel(uniqueData, blockElementCount);
      localStorage.setItem("carousel", JSON.stringify(carousel));
      carousel.currentElements.forEach(pet => {
        cardItems(pet);
      })
    });
});
