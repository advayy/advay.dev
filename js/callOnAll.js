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

