const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("visible"));
}

const atmosphereRail = document.querySelector(".atmosphere-rail");
const atmosphereCards = [...document.querySelectorAll(".atmosphere-card")];
const atmosphereImages = [...document.querySelectorAll(".atmosphere-scene img")];
const appearanceButtons = [...document.querySelectorAll("[data-appearance]")];
const atlasPosition = document.querySelector(".atlas-position span");

const setCurrentAtmosphere = (card) => {
  atmosphereCards.forEach((item) => item.classList.toggle("is-current", item === card));
  if (atlasPosition) atlasPosition.textContent = String(card.dataset.index).padStart(2, "0");
};

if (atmosphereRail && atmosphereCards.length) {
  const cardObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setCurrentAtmosphere(visible.target);
  }, { root: atmosphereRail, threshold: [0.45, 0.62, 0.8] });

  atmosphereCards.forEach((card) => cardObserver.observe(card));

  atmosphereRail.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const current = atmosphereCards.findIndex((card) => card.classList.contains("is-current"));
    const offset = event.key === "ArrowRight" ? 1 : -1;
    atmosphereCards[Math.max(0, Math.min(atmosphereCards.length - 1, current + offset))]
      .scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });
}

appearanceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const appearance = button.dataset.appearance;
    appearanceButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    atmosphereImages.forEach((image) => {
      image.src = image.dataset[appearance];
    });
  });
});

document.querySelectorAll("[data-atlas-direction]").forEach((button) => {
  button.addEventListener("click", () => {
    const current = atmosphereCards.findIndex((card) => card.classList.contains("is-current"));
    const target = Math.max(0, Math.min(
      atmosphereCards.length - 1,
      current + Number(button.dataset.atlasDirection)
    ));
    atmosphereCards[target]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });
});
