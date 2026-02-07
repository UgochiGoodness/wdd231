const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  members.forEach(member => {
    const card = document.createElement("section");

   card.innerHTML = `
  <img src="images/${member.image}" alt="${member.name}">
  <h3>${member.name}</h3>

  <span class="badge ${getMembershipLabel(member.membership).toLowerCase()}">
    ${getMembershipLabel(member.membership)}
  </span>

  <p>${member.address}</p>
  <p>${member.phone}</p>
  <a href="${member.website}" target="_blank">Website</a>
`;


    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
  gridButton.classList.add("active");
  listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
  listButton.classList.add("active");
  gridButton.classList.remove("active");
});


// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

getMembers();

function getMembershipLabel(level) {
  if (level === 3) {
    return "Gold";
  } else if (level === 2) {
    return "Silver";
  } else {
    return "Member";
  }
}

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");
});
