// Année dynamique dans le footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Bouton "Retour en haut"
const backToTop = document.getElementById("backToTop");
const toggleBackToTop = () => {
  if (!backToTop) return;
  const show = window.scrollY > 400;
  backToTop.classList.toggle("show", show);
};
window.addEventListener("scroll", toggleBackToTop);
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Apparition progressive des sections au scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Validation du formulaire de contact
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    let valid = true;

    // Helpers
    const setError = (input, msg) => {
      const small = input.parentElement.querySelector(".error");
      small.textContent = msg || "";
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      valid = msg ? false : valid;
    };

    // Règles simples
    setError(name, name.value.trim() ? "" : "Le nom est requis.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    setError(email, emailRegex.test(email.value) ? "" : "Email invalide.");
    setError(message, message.value.trim() ? "" : "Le message est requis.");

    if (!valid) return;

    // Préparer un email via mailto (ou remplacer par un envoi API côté serveur)
    const subject = encodeURIComponent("Contact portfolio — " + name.value.trim());
    const body = encodeURIComponent(
      `Nom: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\nMessage:\n${message.value.trim()}`
    );
    const mailto = `mailto:david.dev@exemple.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    // Optionnel: reset
    form.reset();
  });
}
