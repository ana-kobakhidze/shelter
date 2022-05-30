const icon = document.getElementById("icon");
const menu = document.getElementById("menu-icon");
const header = document.getElementById("header");


menu.addEventListener("click", function () {

  if (icon.style.display === "") {
    icon.style.display = "flex";
    icon.style.flex = "1";
    icon.style.paddingTop = "88px";
    icon.style.flexDirection = "column";
    icon.style.height = "415px";
    icon.style.alignItems = "center";
    menu.style.transform = " translateX(-15%) translateY(-15%) rotate(90deg)";
    header.style.height = "100vh";
    header.style.backgroundColor = "#292929";
  } else {
    icon.style.display = "";
    header.style.height = "";
    header.style.backgroundColor = "";

    menu.style.transform = "rotate(0)";
  }
});
