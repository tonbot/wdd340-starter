document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".cta-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      alert("Delorean purchase coming soon 🚗⚡");
    });
  }
});
