document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    offset: 100,
  });

  // Dynamic footer year
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // You can add form submission handlers or interactive logic here.
  // e.g., capturing form data, validations, etc.
});
