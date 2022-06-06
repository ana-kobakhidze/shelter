const navLinks = document.getElementById("navLinks");
const menu = document.getElementById("sideBar-icon");
const sideBarBackground = document.getElementById("sideBar");
const logo = document.getElementById("sideBar-logo");
const barLinks = document.getElementById("sideBar-links")
const overlay = document.createElement("div");
const main = document.getElementById("main");

//pagination
const firsPgBtn = document.getElementById("firstPage");
const prevPgBtn = document.getElementById("prevPage");
const currPgBtn = document.getElementById("currentPage");
const nextPgBtn = document.getElementById("nextPage");
const lastPgBtn = document.getElementById("lastPage");

//pagination event handler attachment
firsPgBtn.addEventListener("click", () => {
  paginationHandler(PagingOpt.First);
});
prevPgBtn.addEventListener("click", () => {
  paginationHandler(PagingOpt.Prev);
});
nextPgBtn.addEventListener("click", ()=>{
  paginationHandler(PagingOpt.Next);
});
lastPgBtn.addEventListener("click", ()=>{
  paginationHandler(PagingOpt.Last);
});

const PagingOpt = {
  Next: 'next',
  Prev: 'prev',
  Last: 'last',
  First: 'first'
}

const pagingDirection = {
  Left: 'left',
  Right: 'right'
}

const elementState = {
  Disabled: "disabled",
  Enabled: "enabled"
}

menu.addEventListener("click", function () {
  if (menu.style.display === "") {
    menu.style.display = "flex"
    navLinks.style.display = "none";
    sideBarBackground.style.right = "0";
    barLinks.style.display ="flex";
    logo.style.display = "flex";
    document.body.classList.add("hiddenScroll");
    overlay.classList.add("menu-overlay")
    main.appendChild(overlay);
    menu.style.transform = " translateX(-15%) translateY(15%) rotate(90deg)";


  } else {
    sideBarBackground.style.right = "-320px";
    menu.style.display = "";
    navLinks.style.display = "";
    document.body.classList.remove("hiddenScroll");
    overlay.classList.remove("menu-overlay")
    menu.style.transform = "rotate(0)";

  }
});

overlay.addEventListener("click", function(){
  sideBarBackground.style.right = "-320px";
  menu.style.display = "";
  navLinks.style.display = "";
  document.body.classList.remove("hiddenScroll");
  overlay.classList.remove("menu-overlay")
  menu.style.transform = "rotate(0)";
});

const getPageElementCount = () => {
  const width = window.innerWidth;
  if (width >= 1280) {
    return 8;
  } else if (768 <= width < 1200) {
    return 6;
  } else {
    return 3;
  }
};

const getRandomIndex = (maxIndex) => Math.floor(Math.random() * maxIndex);

const createPsoudoRandomData = (data) => {
  const result = [];
  for (let i = 0; i < 6; i++) {
    const copyOfData = [...data];
    data.forEach(element => {
      const randIndex = getRandomIndex(copyOfData.length);
      result.push(copyOfData[randIndex]);
      copyOfData.splice(randIndex,1);
    });
  }
  return result;
}

class Pagination {
  totalPages = 6;
  currentPage = 1;
  totalItemPerPage = 8;
  petsData = [];
  currentPageData = [];
  constructor(petsData, totalItemPerPage){
    this.petsData = petsData;
    this.totalItemPerPage = totalItemPerPage;
    this.totalPages = petsData.length/totalItemPerPage;
    this.currentPageData = petsData.slice(0, totalItemPerPage);
  }
  
  goToNext(){
    if(this.currentPage>=this.totalPages){
      return;
    } else {
      this.currentPage ++;
      this.updateCurrentPageData();
    }
  }

  goToPrev(){
    if(this.currentPage === 1){
      return;
    } else {
      this.currentPage --;
      this.updateCurrentPageData();
    }
  }

  goToLast(){
    this.currentPage = this.totalPages;
    this.updateCurrentPageData();
  }

  goToFirst(){
    this.currentPage = 1;
    this.updateCurrentPageData();
  }

  updateCurrentPageData(){
    const startingIndex = (this.currentPage - 1) * this.totalItemPerPage;
    this.currentPageData = this.petsData.slice(startingIndex, startingIndex + this.totalItemPerPage);
  }
}

const getPaginationFromStorage = () => {
  const paginationJson = localStorage.getItem("pagination");
  const parsedPagination = JSON.parse(paginationJson);
  const pagination = new Pagination([], 1);
  Object.assign(pagination, parsedPagination);
  return pagination;
};

const savePaginationInStorage = (pagination) => {
  currPgBtn.innerHTML = pagination.currentPage;
  localStorage.setItem('pagination',JSON.stringify(pagination));
}

const changePagingElementState = (direction, state) => {
  // if state is 'enabled' code below return 'disabled' and vice versa
  const alterState = state === elementState.Disabled ? elementState.Enabled : elementState.Disabled;
  const isDisableOperation = state === elementState.Disabled;
  switch (direction) {
    case pagingDirection.Left:
      prevPgBtn[elementState.Disabled] = isDisableOperation;
      prevPgBtn.classList.add(state);
      prevPgBtn.classList.remove(alterState)
      firsPgBtn[elementState.Disabled] = isDisableOperation;
      firsPgBtn.classList.add(state);
      firsPgBtn.classList.remove(alterState);
      break;
    case pagingDirection.Right:
      nextPgBtn[elementState.Disabled] = isDisableOperation;
      nextPgBtn.classList.add(state);
      nextPgBtn.classList.remove(alterState);
      lastPgBtn[elementState.Disabled] = isDisableOperation;
      lastPgBtn.classList.add(state);
      lastPgBtn.classList.remove(alterState);
      break;
    default:
      break;
  }
}

const paginationHandler = (pagOpt) => {
  let paging = getPaginationFromStorage();
  switch (pagOpt) {
    case PagingOpt.First:
      paging.goToFirst();
      changePagingElementState(pagingDirection.Left, elementState.Disabled);
      changePagingElementState(pagingDirection.Right, elementState.Enabled);
      break;
    case PagingOpt.Last:
      paging.goToLast();
      changePagingElementState(pagingDirection.Right, elementState.Disabled);
      changePagingElementState(pagingDirection.Left, elementState.Enabled);
      break;
    case PagingOpt.Next:
      paging.goToNext();
      if(paging.currentPage === paging.totalPages){
        changePagingElementState(pagingDirection.Right, elementState.Disabled);
      }
      else {
        changePagingElementState(pagingDirection.Left, elementState.Enabled);
      }
      break;
    case PagingOpt.Prev:
      paging.goToPrev();
      if(paging.currentPage === 1){
        changePagingElementState(pagingDirection.Left, elementState.Disabled);
      } 
      else { 
        changePagingElementState(pagingDirection.Right, elementState.Enabled);
      }
      break;
    default:
      break;
  }
  savePaginationInStorage(paging);
  createAndPopulatePetCards(paging.currentPageData);
}

const removeListChildren = () => {
  const list = document.getElementById("listCard");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}

const createAndPopulatePetCards = (currentPageData) => {
  const ul = document.getElementById("listCard");
  removeListChildren();
  currentPageData.forEach(petObj => {
    const li = document.createElement("li");
    li.addEventListener('click', ()=>{
      showModal(petObj);
    });
    const image = document.createElement("img");
    image.src = petObj.img;
    const name = document.createElement("h5");
    name.innerHTML = petObj.name;
    const button = document.createElement("button");
    button.innerHTML = "Learn More";
    li.appendChild(image);
    li.appendChild(name);
    li.appendChild(button);
    ul.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", (event) => {
  const pageElementCount = getPageElementCount();
  fetch(
    "https://raw.githubusercontent.com/rolling-scopes-school/js-fe-course-en/main/tasks/shelter/pets.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var psoudoRandomData = createPsoudoRandomData(data);
      var paging = new Pagination(psoudoRandomData, pageElementCount);
      savePaginationInStorage(paging);
      createAndPopulatePetCards(paging.currentPageData);
      changePagingElementState(pagingDirection.Left, elementState.Disabled);
    }
  )});
