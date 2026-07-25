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

const carousel = document.querySelector(".app-carousel");
const cards = Array.from(document.querySelectorAll(".app-card"));
const currentSlide = document.querySelector("#current-slide");
const totalSlides = document.querySelector("#total-slides");
const previousButton = document.querySelector(".carousel-button.previous");
const nextButton = document.querySelector(".carousel-button.next");

if (carousel && cards.length) {
  totalSlides.textContent = String(cards.length).padStart(2, "0");

  const activeIndex = () => {
    const left = carousel.scrollLeft;
    return cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - left - carousel.offsetLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity }).index;
  };

  const updateCounter = () => {
    currentSlide.textContent = String(activeIndex() + 1).padStart(2, "0");
  };

  const go = (direction) => {
    const targetIndex = Math.min(cards.length - 1, Math.max(0, activeIndex() + direction));
    cards[targetIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  previousButton?.addEventListener("click", () => go(-1));
  nextButton?.addEventListener("click", () => go(1));
  carousel.addEventListener("scroll", updateCounter, { passive: true });
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
  });
  updateCounter();
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
  }, { threshold: .12 });
  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("visible"));
}

const studioOrbit = document.querySelector(".studio-orbit");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (studioOrbit && !reducedMotion.matches) {
  const degreesPerPixel = 0.042;
  let currentAngle = window.scrollY * degreesPerPixel;
  let targetAngle = currentAngle;
  let animationFrame = 0;

  const drawOrbit = () => {
    currentAngle += (targetAngle - currentAngle) * 0.075;
    studioOrbit.style.setProperty("--orbit-turn", `${currentAngle.toFixed(3)}deg`);

    if (Math.abs(targetAngle - currentAngle) > 0.01) {
      animationFrame = requestAnimationFrame(drawOrbit);
    } else {
      currentAngle = targetAngle;
      studioOrbit.style.setProperty("--orbit-turn", `${currentAngle.toFixed(3)}deg`);
      animationFrame = 0;
    }
  };

  const updateOrbit = () => {
    targetAngle = window.scrollY * degreesPerPixel;
    if (!animationFrame) animationFrame = requestAnimationFrame(drawOrbit);
  };

  studioOrbit.style.setProperty("--orbit-turn", `${currentAngle.toFixed(3)}deg`);
  window.addEventListener("scroll", updateOrbit, { passive: true });
}
