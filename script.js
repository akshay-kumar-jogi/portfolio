const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

const button = document.querySelector(".menu-button");
const nav = document.querySelector("#nav-links");
button?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    button?.setAttribute("aria-expanded", "false");
  }),
);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((item) => observer.observe(item));
} else
  document
    .querySelectorAll(".reveal")
    .forEach((item) => item.classList.add("visible"));

// Floating section navigation
const floatingNav = document.querySelector(".floating-nav");
const floatingNavLinks = document.querySelectorAll(".floating-nav a");

// Show/hide floating nav based on scroll position
function handleNavVisibility() {
  const scrollY = window.pageYOffset;
  // Hero section is always at top, manifesto is the "02 / Origin" section
  // We use the manifesto section position to determine when to show the nav
  const manifestoSectionTop = document.getElementById("story")?.offsetTop || 0;

  if (scrollY > manifestoSectionTop) {
    floatingNav.classList.add("visible");
    floatingNav.classList.remove("hidden");
    floatingNav.style.pointerEvents = "auto";
  } else {
    floatingNav.classList.add("hidden");
    floatingNav.classList.remove("visible");
    floatingNav.style.pointerEvents = "none";
  }
}

// Initialize floating nav link clicks
floatingNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const targetTop = targetElement.offsetTop;
      window.scrollTo({
        top: targetTop - 80,
        behavior: "smooth",
      });
    }
    // Ensure floating nav is visible after clicking
    // and remove any hover state by triggering a blur
    floatingNav.classList.add("visible");
    floatingNav.classList.remove("hidden");
    floatingNav.style.pointerEvents = "auto";
    // Force the floating nav to remove any active hover state
    floatingNavLinks.forEach((l) => l.blur());
  });
});

// Event listeners
window.addEventListener("scroll", () => {
  handleNavVisibility();
});

// Initial check
handleNavVisibility();
