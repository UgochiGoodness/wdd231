export async function loadServices() {

  const container = document.querySelector("#servicesContainer");
  const filter = document.querySelector("#categoryFilter");

  try {
    const response = await fetch("data/services.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const services = await response.json();

    displayServices(services);

    // Filter change event
    filter.addEventListener("change", () => {
      const selected = filter.value;

      localStorage.setItem("selectedCategory", selected);

      const filtered = selected === "all"
        ? services
        : services.filter(service => service.category === selected);

      displayServices(filtered);
    });

    // Load saved preference
    const saved = localStorage.getItem("selectedCategory");
    if (saved) {
      filter.value = saved;
      filter.dispatchEvent(new Event("change"));
    }

  } catch (error) {
    container.innerHTML = "<p>Error loading services.</p>";
    console.error("Fetch error:", error);
  }
}

function displayServices(services) {

  const container = document.querySelector("#servicesContainer");
  container.innerHTML = "";

  services.forEach(service => {

    container.innerHTML += `
      <div class="card">
        <h3>${service.name}</h3>
        <p><strong>Category:</strong> ${service.category}</p>
        <p><strong>Level:</strong> ${service.level}</p>
        <p><strong>Price:</strong> $${service.price}</p>
        <button class="detailsBtn" data-id="${service.id}">
          View Details
        </button>
      </div>
    `;
  });

  // Modal logic
  document.querySelectorAll(".detailsBtn").forEach(button => {
    button.addEventListener("click", () => {

      const id = parseInt(button.dataset.id);
      const selected = services.find(s => s.id === id);

      const modal = document.querySelector("#serviceModal");
      const modalContent = document.querySelector("#modalContent");

      modalContent.innerHTML = `
        <h3>${selected.name}</h3>
        <p>${selected.description}</p>
      `;

      modal.showModal();
    });
  });

  document.querySelector("#closeModal")?.addEventListener("click", () => {
    document.querySelector("#serviceModal").close();
  });
}
