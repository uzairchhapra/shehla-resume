const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const mobileNavLinks = Array.from(document.querySelectorAll(".mobile-nav-link"));
const sections = ["about", "skills", "experience", "projects", "education", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  mobileMenu?.classList.toggle("hidden", isOpen);
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
    mobileMenu?.classList.add("hidden");
  });
});

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
);

sections.forEach((section) => activeSectionObserver.observe(section));

const revealTargets = document.querySelectorAll(".section-title, .skill-card, .timeline-item, .project-card, .credential-card, .contact-link");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealTargets.forEach((target) => {
  target.classList.add("reveal");
  revealObserver.observe(target);
});
