const icon = document.getElementById("icon");
const menu = document.getElementById("menu-icon");
const header = document.getElementById("header")

menu.addEventListener("click", function(){
    console.log(icon.style.display === "")
    if( icon.style.display === "" ){
     icon.style.display = "flex";
     icon.style.flex = "1";
     icon.style.paddingTop = "88px";
    icon.style.flexDirection = "column";
    icon.style.height = "415px";
    menu.style.transformOrigin = "50% 50%";
    menu.style.transform =  "rotate(-0.25turn)";
    header.style.backgroundColor = "#292929";
    header.style.height = "100hv";
}else{
    icon.style.display = "";
    header.style.backgroundColor = "";
    menu.style.transformOrigin = "50% 50%";
    menu.style.transform = "rotate(0)";

}

})
