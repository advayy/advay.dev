document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("navbar");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      console.log("Toggling menu!");
      nav.classList.toggle("show");
    });
  } else {
    console.warn("menu-toggle or navbar not found");
  }
});

const toggle = document.querySelector('.timeline-toggle');
const panel  = document.querySelector('#timeline-panel');

if (toggle && panel) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    panel.classList.toggle('open', !isOpen);
  });
}