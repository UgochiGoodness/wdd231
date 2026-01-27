// Get the container for the spotlight cards
const spotlightContainer = document.querySelector(".spotlight-cards");


const membersURL = "./data/members.json";

async function loadSpotlights() {
  // Stop if the container doesn't exist on this page
  if (!spotlightContainer) return;

  try {
    const response = await fetch(membersURL);
    const data = await response.json();
    console.log("Loaded members:", data.members); 

    // Only Gold or Silver members
    const qualifiedMembers = data.members.filter(
      member => member.membership === "Gold" || member.membership === "Silver"
    );

    // If no members qualify, show a message
    if (qualifiedMembers.length === 0) {
      spotlightContainer.innerHTML = "<p>No spotlight members available.</p>";
      return;
    }

    // Randomly select 2 or 3 members
    const numberToShow = Math.floor(Math.random() * 2) + 2;
    const selectedMembers = qualifiedMembers
      .sort(() => Math.random() - 0.5)
      .slice(0, numberToShow);

  
    spotlightContainer.innerHTML = "";

    // Create cards for each selected member
    selectedMembers.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><strong>${member.membership} Member</strong></p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading spotlight members:", error);
    spotlightContainer.innerHTML = "<p>Unable to load spotlights.</p>";
  }
}

// Load spotlights when the page loads
loadSpotlights();
