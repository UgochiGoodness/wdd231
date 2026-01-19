const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  console.table(data.prophets); // ✔️ check data
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const birthDate = document.createElement('p');
    const birthPlace = document.createElement('p');
    const deathDate = document.createElement('p');
    const portrait = document.createElement('img');

    // Content
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Born: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
    deathDate.textContent = prophet.death
      ? `Died: ${prophet.death}`
      : `Currently Living`;

    // Image attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute(
      'alt',
      `Portrait of ${prophet.name} ${prophet.lastname}`
    );
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(deathDate);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
};

// Call function
getProphetData();
