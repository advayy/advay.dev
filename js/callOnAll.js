document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const active = nav.querySelector("a.active");
  if (!active) return;

  const navRect = nav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();

  if (activeRect.left < navRect.left || activeRect.right > navRect.right) {
    active.scrollIntoView({ block: "nearest", inline: "center" });
  }
});

const toggle = document.querySelector('.timeline-toggle');
const panel = document.querySelector('#timeline-panel');

if (toggle && panel) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    panel.classList.toggle('open', !isOpen);
  });
}