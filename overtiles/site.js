const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Material atelier: on desktop (mouse, no touch), the carousel otherwise has no obvious way
// to reach cards 4-7 — tie its horizontal position to vertical page scroll instead, so scrolling
// down through the section naturally reveals the rest. Touch devices keep native swipe untouched.
const materialsSection = document.querySelector('.materials');
const materialGrid = document.querySelector('.material-grid');
const materialTrack = document.querySelector('.material-track');
const canDriveCarousel = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (materialsSection && materialGrid && materialTrack && canDriveCarousel && !reduceMotion) {
  // Duplicate the set so the strip never runs out and can loop seamlessly from the last
  // card back to the first, instead of scrolling every card away and stopping on empty space.
  const originalCards = Array.from(materialTrack.children);
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.remove('reveal');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    materialTrack.appendChild(clone);
  });

  // A manual offset layered on top of the scroll-driven position, nudged directly by a
  // trackpad swipe or shift+wheel while the pointer is over the atelier — so the same infinite
  // loop can be steered by hand, not just by scrolling the page.
  let manualOffset = 0;
  let ticking = false;
  const updateCarousel = () => {
    ticking = false;
    const rect = materialsSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = Math.min(1, Math.max(0,
      (viewportHeight - rect.top) / (viewportHeight + rect.height)
    ));
    const loopWidth = materialTrack.children[originalCards.length].offsetLeft - originalCards[0].offsetLeft;
    const raw = progress * loopWidth + manualOffset;
    const wrapped = ((raw % loopWidth) + loopWidth) % loopWidth;
    materialTrack.style.transform = `translateX(-${wrapped}px)`;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateCarousel);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  materialGrid.addEventListener('wheel', event => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : (event.shiftKey ? event.deltaY : 0);
    if (delta === 0) return;
    event.preventDefault();
    manualOffset += delta;
    onScroll();
  }, { passive: false });
  updateCarousel();
}
