// Timestamp
document.addEventListener("DOMContentLoaded", () => {
  const timestamp = document.getElementById("timestamp");
  if (timestamp) {
    timestamp.value = new Date().toLocaleString();
  }

  // Modal handling
  document.querySelectorAll("[data-modal]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      document.getElementById(link.dataset.modal).showModal();
    });
  });

  document.querySelectorAll("dialog button").forEach(button => {
    button.addEventListener("click", () => {
      button.closest("dialog").close();
    });
  });

  // Thank you page data display
  const params = new URLSearchParams(window.location.search);
  const container = document.getElementById("formData");

  if (container) {
    container.innerHTML = `
      <p><strong>Name:</strong> ${params.get("firstName")} ${params.get("lastName")}</p>
      <p><strong>Email:</strong> ${params.get("email")}</p>
      <p><strong>Phone:</strong> ${params.get("phone")}</p>
      <p><strong>Business:</strong> ${params.get("business")}</p>
      <p><strong>Date Submitted:</strong> ${params.get("timestamp")}</p>
    `;
  }
});

// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");
});