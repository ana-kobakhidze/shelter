const navLinks = document.getElementById("navLinks");
const menu = document.getElementById("sideBar-icon");
const sideBarBackground = document.getElementById("sideBar");
const logo = document.getElementById("sideBar-logo");
const barLinks = document.getElementById("sideBar-links")
const overlay = document.createElement("div");
const main = document.getElementById("main");


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
})