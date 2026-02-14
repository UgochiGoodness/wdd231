export function setupNavigation() {
  const btn = document.querySelector("#menuBtn");
  const nav = document.querySelector("#navMenu");

  if (btn && nav) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
}
