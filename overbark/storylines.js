/* Overbark storylines — real, animated conversations played into the baked thought-clouds of each
   scene (hero, sunbeam, bird). Left cloud = older/wiser dog, right cloud = puppy. Content is the app's
   authored dialogue. No network, no persistence.
   Behaviour: on scroll-into-view a scene picks ONE conversation at RANDOM (differs per page load),
   plays it once at the app's reading pace, then STOPS — leaving both dogs' final lines on screen. No
   loop. prefers-reduced-motion → final lines shown statically.
   Fit: each bubble is a fixed box sized to its cloud's inner area (data-w/data-h fractions of the
   image, via object-fit:cover geometry); text is centered and the font auto-shrinks per line so every
   line fits inside its cloud. */
(function () {
  "use strict";

  var CONVOS = {
    hero: [
      [["l","I am the wise one."],["r","You ate a sock yesterday."],["l","That was research."],["r","Research into what?"],["l","Sock durability."],["r","…findings?"],["l","Not durable. Don’t recommend."],["r","Noted."]],
      [["l","You’re annoying."],["r","You’re more annoying."],["l","I’ve been annoying longer. Seniority."],["r","That’s not an achievement."],["l","It’s my achievement."],["r","…you’re still my annoying, though."]],
      [["l","Remember before the hooman brought you home?"],["r","I don’t remember not having you around."],["l","Same."],["r","…that’s the whole point, I guess."],["l","Don’t get soft on me."],["r","Too late."]],
      [["l","The hooman loves me more."],["r","Impossible."],["l","I get the bed."],["r","I get the treats."],["l","…let’s ask the cat."],["r","The cat left."],["l","The cat always leaves."],["r","Cowardly cat."]],
      [["l","Do you ever wonder why we bark?"],["r","To bark is to be."],["l","But WHY do we be?"],["r","For snacks."],["l","…that’s beautiful."],["r","I know."]]
    ],
    sunbeam: [
      [["l","This is my sunbeam."],["r","The sun is for everyone."],["l","The sun is for ME."],["r","We can share."],["l","We cannot."],["r","…fine. Halves."],["l","I get the warm half."],["r","It’s all the warm half."]]
    ],
    bird: [
      [["r","Bird! It’s a crow!"],["l","It’s a sparrow."],["r","It’s HUGE."],["l","It’s tiny."],["r","…it’s a medium bird."],["l","It’s a friend. Sit down."]],
      [["r","Enemy overhead!"],["l","That’s a robin."],["r","Robins can be spies."],["l","That one’s eating a worm."],["r","…a spy’s cover."],["l","Go back to sleep."]]
    ],
    footer: [
      [["l","Hooman is looking at me."],["l","Hooman is looking at me. I will look back."]]
    ]
  };

  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function lastOf(c, role) { for (var i = c.length - 1; i >= 0; i--) if (c[i][0] === role) return c[i][1]; return ""; }

  function initScene(scene) {
    var img = scene.querySelector("[data-sl-img]");
    var bubbles = [].slice.call(scene.querySelectorAll(".sl-bubble"));
    var convos = CONVOS[scene.getAttribute("data-convo")];
    if (!img || !bubbles.length || !convos) return;
    var byRole = {};
    bubbles.forEach(function (b) {
      var s = document.createElement("span"); b.appendChild(s); b._txt = s;
      byRole[b.getAttribute("data-role")] = b;
    });

    /* size + place each bubble box over its cloud's inner area (object-fit:cover aware) */
    function place() {
      var bw = img.clientWidth, bh = img.clientHeight;
      if (!bw || !bh) return;
      var iw = img.naturalWidth || bw, ih = img.naturalHeight || bh;
      var scale = Math.max(bw / iw, bh / ih);
      var dw = iw * scale, dh = ih * scale;
      var ox = (bw - dw) / 2, oy = (bh - dh) / 2, ix = img.offsetLeft, iy = img.offsetTop;
      bubbles.forEach(function (el) {
        var fx = parseFloat(el.getAttribute("data-cx")), fy = parseFloat(el.getAttribute("data-cy"));
        var fw = parseFloat(el.getAttribute("data-w")) || 0.14, fh = parseFloat(el.getAttribute("data-h")) || 0.15;
        el.style.left = (ix + ox + fx * dw) + "px";
        el.style.top = (iy + oy + fy * dh) + "px";
        el.style.width = (fw * dw) + "px";
        el.style.height = (fh * dh) + "px";
        el._base = Math.max(12, Math.round(fw * dw * 0.18));  /* base font ~ box width (~5% down) */
        if (el._txt.textContent) fit(el);
      });
    }
    /* shrink the font until the (possibly multi-line) text fits the fixed box */
    function fit(el) {
      var fs = el._base, g = 0;
      el.style.fontSize = fs + "px";
      while ((el._txt.scrollHeight > el.clientHeight + 1 || el._txt.scrollWidth > el.clientWidth + 1) && fs > 9 && g < 60) {
        fs -= 1; el.style.fontSize = fs + "px"; g++;
      }
    }
    function setText(el, t) { el._txt.textContent = t; fit(el); }

    if (img.complete) place(); else img.addEventListener("load", place);
    window.addEventListener("resize", place);

    function finalize() { bubbles.forEach(function (b) { if (b._txt.textContent) { b.classList.remove("dim"); b.classList.add("show"); } }); }

    var chosen = pick(convos);

    if (reduce) {
      if (byRole.l) setText(byRole.l, lastOf(chosen, "l"));
      if (byRole.r) setText(byRole.r, lastOf(chosen, "r"));
      finalize();
      return;
    }

    function beat(t) { return Math.min(4200, 2000 + t.length * 48); }  /* app-like reading pace */

    var played = false;
    function play() {
      var i = 0;
      bubbles.forEach(function (b) { b.classList.remove("show", "dim"); });
      function step() {
        if (i >= chosen.length) { finalize(); return; }  /* done: leave the final lines on, stop */
        var s = chosen[i][0], t = chosen[i][1], cur = byRole[s], oth = byRole[s === "l" ? "r" : "l"];
        if (cur) { setText(cur, t); cur.classList.remove("dim"); cur.classList.add("show"); }
        if (oth && oth._txt.textContent) oth.classList.add("dim");
        i++; setTimeout(step, beat(t));
      }
      setTimeout(step, 450);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !played) { played = true; place(); play(); io.unobserve(scene); }
      });
    }, { threshold: 0.3 });
    io.observe(scene);
  }

  [].slice.call(document.querySelectorAll("[data-storyline]")).forEach(initScene);
})();
