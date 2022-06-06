var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
span.addEventListener('click', () => {
    closeModal();
});
const fillModalContent = (petObj) => {
    const img = document.getElementById("pet-image");
    img.src = petObj.img;

    const name = document.getElementById("pet-name");
    name.innerHTML = petObj.name;

    const breed = document.getElementById("pet-breed");
    breed.innerHTML = petObj.breed;

    const description = document.getElementById("pet-description");
    description.innerHTML = petObj.description;

    const age = document.getElementById("pet-age");
    age.innerHTML = petObj.age;

    const inoculations = document.getElementById("pet-inoculations");
    inoculations.innerHTML = petObj.inoculations.join(", ");

    const deseases = document.getElementById("pet-diseases");
    deseases.innerHTML = petObj.diseases.join(", ");

    const parasites = document.getElementById("parasites");
    parasites.innerHTML = petObj.parasites.join(", ");
}
const showModal = (petObj) => {
  fillModalContent(petObj);
  modal.style.display = "block";
  document.body.style.overflowY = "hidden";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflowY = "";
}

const concatArray = (arr) => {
    return arr.join(", ")
}