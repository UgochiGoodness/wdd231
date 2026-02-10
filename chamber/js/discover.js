import { discoverItems } from "../data/discover.mjs";

// ---------- Build Discover Cards ----------
const container = document.querySelector("#discover-cards");

discoverItems.forEach((item) => {
  const card = document.createElement("section");
  card.classList.add("card");

  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" loading="lazy">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;

  container.appendChild(card);
});

// ---------- Visit Message (localStorage) ----------
const visitText = document.querySelector("#visit-text");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitText.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    visitText.textContent = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    visitText.textContent = "You last visited 1 day ago.";
  } else {
    visitText.textContent = `You last visited ${diffDays} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");
});
