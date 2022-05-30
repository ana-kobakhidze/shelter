const navLinks = document.getElementById("nav");
const menu = document.getElementById("menu-icon");
const header = document.getElementById("header");
console.log(screen.width5)

menu.addEventListener("click", function () {

  if (navLinks.style.display === "") {
    navLinks.style.display = "flex";
    menu.style.transform = " translateX(-40%) translateY(50%) rotate(90deg)";
    header.style.height = "100vh";
    header.style.backgroundColor = "#F6F6F6";
  } else {
    navLinks.style.display = "";
    header.style.height = "";
    header.style.backgroundColor = "";
    menu.style.transform = "rotate(0)";
  }
});
