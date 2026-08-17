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


/* ============================================================================
   PLATFORM TABS + SCREENSHOT RAILS  (added 2026-08-17)

   One control, two jobs: pick a device, then scroll its shots. Deliberately
   built on native `scroll-snap` rather than a transform carousel -- a trackpad,
   a touch swipe, a shift-scroll and the arrow buttons then all work through the
   SAME mechanism, and it degrades to a plain scrollable strip with JS off.
   The arrows only nudge `scrollLeft`; nothing here owns the scroll position.
   ========================================================================= */
document.querySelectorAll("[data-carousel]").forEach((group) => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const panes = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

  const show = (index) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      panes[i].hidden = i !== index;
      panes[i].classList.toggle("is-active", i === index);
    });
    // The newly shown rail starts at its beginning, and its arrows re-evaluate
    // against a width that only exists now that it is no longer `hidden`.
    const rail = panes[index].querySelector(".rail");
    if (rail) { rail.scrollLeft = 0; syncArrows(panes[index]); }
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => show(i));
    // LEFT/RIGHT moves between tabs, which is what a tablist is expected to do.
    tab.addEventListener("keydown", (event) => {
      const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      event.preventDefault();
      const next = (i + step + tabs.length) % tabs.length;
      show(next);
      tabs[next].focus();
    });
  });

  function syncArrows(pane) {
    const rail = pane.querySelector(".rail");
    const prev = pane.querySelector(".rail-nav.prev");
    const next = pane.querySelector(".rail-nav.next");
    if (!rail || !prev || !next) return;
    // 2 px of slack: `scrollWidth` and the fractional `scrollLeft` a trackpad
    // leaves behind do not agree exactly, and an arrow that never disables at
    // the end looks broken.
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
  }

  panes.forEach((pane) => {
    const rail = pane.querySelector(".rail");
    if (!rail) return;
    const page = () => {
      const first = rail.querySelector(".shot");
      // ONE SHOT PER PRESS, measured rather than assumed: the three panes hold
      // three different widths (phone, pad, mac) and a fixed pixel step would
      // land mid-shot on two of them.
      return first ? first.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
    };
    pane.querySelector(".rail-nav.prev").addEventListener("click", () => rail.scrollBy({ left: -page(), behavior: "smooth" }));
    pane.querySelector(".rail-nav.next").addEventListener("click", () => rail.scrollBy({ left: page(), behavior: "smooth" }));
    rail.addEventListener("scroll", () => syncArrows(pane), { passive: true });
    window.addEventListener("resize", () => syncArrows(pane));
    syncArrows(pane);
  });
});
