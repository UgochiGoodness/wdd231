const spotlightContainer = document.querySelector(".spotlight-cards");
const membersURL = "data/members.json";

async function loadSpotlights() {
  try {
    const response = await fetch(membersURL);
    const data = await response.json();

    const qualified = data.members.filter(
      member => member.membership === "Gold" || member.membership === "Silver"
    );

    const selected = qualified.sort(() => Math.random() - 0.5).slice(0, 3);

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><strong>${member.membership} Member</strong></p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
    spotlightContainer.innerHTML = "<p>Failed to load member spotlights.</p>";
  }
}

loadSpotlights();
