// navigation.js
const navButton = document.getElementById("nav-button");
const navBar = document.getElementById("nav-bar");

if (navButton && navBar) {
  navButton.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
}
