# Overbark Website Engineering Handbook

This document is the technical and creative handoff for the current Overbark marketing website. It is written for another AI model or developer who must finish, test, deploy, or refactor the site without losing the design decisions already established.

## 1. Product and brand summary

Overbark is a novelty entertainment app for iPhone and iPad. It observes dog vocalizations, body posture, motion, visible context, objects, and everyday sounds, then selects authored comic thoughts and bark lines appropriate to the live situation.

The core promise is:

- Real on-device signal analysis.
- Funny, authored output rather than literal dog translation.
- No cloud dependency.
- No account.
- No subscription.
- No ads, tracking, analytics, or third-party SDKs.
- No recordings or user content retained.
- No cookies, `localStorage`, `sessionStorage`, or persistent browser preference storage on this website.
- Planned price: USD 4.99 once.

Important wording constraints:

- The app contains **thousands of authored thought-chains and bark lines**, never “hundreds.”
- Say “everyday sounds,” not “19 everyday sounds.”
- Do not claim that the app literally translates dogs.
- Make a clear distinction between legitimate acoustic/vision analysis and comedic authored dialogue.
- Do not describe the two website perspectives as female/male in public copy. The intended distinction is emotion-first/simple versus system-first/technical.

## 2. Experience strategy

The website has two deliberately different presentations of the same product:

### Simple perspective

Warm, approachable, non-technical, editorial, premium, humorous, and emotion-first. It uses a beige/cream palette, serif display typography, sunlit dog imagery, soft shadows, thought bubbles, and human-readable explanations.

Public label: **SIMPLE**.

### Technical perspective

Dense, instrument-oriented, premium, dark, engineered, and system-first. It uses a black/cyan/lime palette, sans-serif and monospace typography, FFT/spectrum motifs, signal-path cards, explicit framework names, and detailed privacy architecture.

Public label: **TECHNICAL**.

Both perspectives communicate the same underlying facts but may use different section order, copy depth, composition, typography, and imagery.

## 3. Current site architecture

### Entry point

`index.html` is a full-screen split gateway. The visitor chooses one of two routes:

- `experience.html?view=simple`
- `experience.html?view=technical`

The gateway intentionally has no top navigation strip. It is meant to be clean and cinematic, with the choice itself as the only task.

### Unified experience wrapper

`experience.html` is the public destination and contains:

- A small fixed gateway-return icon.
- A fixed SIMPLE/TECHNICAL perspective switch.
- A full-viewport iframe.

`perspective.js` selects the iframe source:

- Simple → `overbark-beige.html`
- Technical → `overbark-dark.html`

This iframe architecture was chosen because the site must work when opened directly from Finder as a `file://` URL. A previous implementation used `fetch()` to inject the selected page, but Safari blocks local cross-file fetches. Do not reintroduce fetch-based composition unless direct-file support is deliberately dropped.

The iframe has a static simple-page `src` fallback in HTML. JavaScript changes it when the technical query parameter is selected. The History API call is wrapped in `try/catch` because some browsers restrict `history.replaceState()` on local files.

No view preference is persisted. The selected perspective exists only in the current URL.

### Perspective documents

- `overbark-beige.html` contains the full simple experience.
- `overbark-dark.html` contains the full technical experience.

They can also be opened directly for isolated development.

### Architectural tradeoff

The visitor experiences one unified destination, but the two content documents remain separate internally. This preserves their substantially different structure and avoids CSS collisions. It does mean shared facts must be updated in both documents.

A future production refactor may convert these pages into a shared component system, but it must preserve:

1. Direct links to each perspective.
2. No persistent browser storage.
3. The substantially different editorial depth and visual identity.
4. Local `file://` preview if that remains a project requirement.

## 4. File map

### Primary HTML

- `index.html` — split-screen gateway.
- `experience.html` — shared perspective wrapper and iframe host.
- `overbark-beige.html` — complete simple page.
- `overbark-dark.html` — complete technical page.
- `privacy.html` — privacy policy.
- `help.html` — support/help page from the broader project.

### Primary CSS

- `gateway.css` — gateway layout and hover behavior.
- `experience.css` — iframe wrapper and perspective switch.
- `beige-page.css` — core simple-page art direction and layout.
- `dark-page.css` — core technical-page art direction and layout.
- `dark-tuning.css` — later technical-page additions: six-stage signal path, context engine, privacy proof, settings cards, and responsive rules.
- `finetune.css` — shared late-stage overrides used by both perspectives: Airplane Mode card, carousel deck, FFT bars, image blending, responsive containment, navigation positioning, and other refinements.

`beige-page.css`, `dark-page.css`, `gateway.css`, and parts of other stylesheets are minified onto long lines. Use targeted edits carefully. Prefer adding a well-scoped override at the end rather than performing risky global replacements.

### JavaScript

- `perspective.js` — selects the simple or technical iframe, updates active switch state, and safely updates the query string.
- `carousel.js` — shared screenshot deck, dots, arrows, horizontal gestures, drag behavior, hover tilt, and generated FFT bars.

## 5. Gateway design

The gateway is a 50/50 viewport split on desktop and two stacked 50vh panels on mobile.

### Simple side

- Uses `img/generated/beige-terriers.png`.
- Warm paper overlay and coral accent.
- Headline: “Just show me the magic.”
- Button leads to `experience.html?view=simple`.

### Technical side

- Uses `img/generated/dark-dog-wave.png`.
- Dark overlay, cyan accent, acoustic styling.
- Headline: “Give me the signal path.”
- Button leads to `experience.html?view=technical`.

### Interaction

Pointer movement changes CSS variables `--px` and `--py`, moving a subtle local radial highlight. Hover slightly enlarges the background image. Mobile removes nonessential explanatory copy to keep both choices readable.

The centered app icon and “Same dog. Different depth.” line visually join the two halves.

## 6. Perspective switch

The perspective switch belongs to `experience.html`, outside the iframe. It remains visible while the framed page scrolls.

The gateway-return app icon sits beside it. The switch updates:

- iframe `src`;
- active button state;
- `data-view` on the root element;
- the current query parameter when the browser allows it.

The switch is centered at the top. To prevent it covering the navigation inside either framed page, `finetune.css` moves each page’s menu links toward the wordmark using:

```css
.nav nav {
  margin-left: clamp(20px, 3vw, 48px);
  margin-right: auto;
}
```

If the header is redesigned, test it inside `experience.html`, not only by opening the perspective page directly. The iframe wrapper adds an independent overlay above the page header.

## 7. Simple page content and design

The simple page currently contains:

1. Hero with two reference dogs, acoustic ribbons, product premise, privacy card, and humorous thought bubbles.
2. Live dispatch and screenshot card-deck carousel.
3. Acoustic analysis chapter: pitch, tone, tempo, Sound Analysis, Accelerate/vDSP.
4. Posture chapter: Apple Vision, two-dog tracking, sunbeam image and dialogue.
5. Context chapter: walk, beach, meal, rest, car ride, and yard symbols.
6. Two-dog bird disagreement image and copy.
7. Privacy-first section.
8. Observation deck field guide using actual app icons.
9. Palette, lettering, dog-name, temperament, motion, speech, and display settings.
10. Science/disclaimer section.
11. Closing dog image and call to action.

### Simple visual language

- Cream/beige background.
- Dark brown type.
- Coral/terracotta accent instead of cyan for contextual icons.
- Large editorial serif headlines.
- Spacious magazine-like composition.
- Soft photographic blends, especially long left-edge fades into the page background.
- Thought bubbles should feel integrated into the scene rather than pasted on.

### Simple image-specific decisions

- Hero bubbles: left dog “I am the wise one.” Right dog “You ate a sock yesterday.”
- Sunbeam image bubbles: “This is my sunbeam.” and “The sun is for everyone”.
- Footer/right dog bubble: “Hooman is looking at me”.
- The footer image must not simply repeat the hero image.
- `light-sunbeam-story.png` has deliberately reduced contrast and brightness compared with earlier variants.

## 8. Technical page content and design

The technical page currently contains:

1. Dark hero with acoustic waveform imagery, signal tags, local-engine card, and comic bark bubble.
2. Live dispatch screenshot deck.
3. Six-stage on-device signal path:
   - Audio sound isolation.
   - FFT audio frequency analysis with Accelerate/vDSP.
   - Vision body-pose tracking.
   - Scene-aware classification.
   - Neural Engine signal fusion.
   - Local selection of authored dialogue.
4. “It reads the room. Then it editorializes.” context-engine explanation.
5. Two-dog pack dynamics.
6. Expanded “Yes, it uses AI. No, nothing ever leaves your phone.” proof.
7. Observation deck using actual app instrument icons.
8. Eight-card settings gallery using every `dark_0.jpg` through `dark_7.jpg` image.
9. “The science is real. The subtitles are comedy.” methodology section.

### Technical visual language

- Near-black background.
- Cyan primary signal color.
- Lime status indicators.
- Sans-serif display type plus monospace instrumentation labels.
- Fine borders, grid structures, diagnostic labels, spectrum bars, and system vocabulary.
- Premium and engineered, not generic “gaming UI.”

### Technical claims used

- Apple Sound Analysis detects canine vocal events among everyday sounds.
- Accelerate/vDSP performs FFT audio frequency analysis for pitch, spectral character, intensity, and inter-bark tempo.
- Apple Vision tracks pose landmarks across frames.
- Scene/object/ambient-audio context changes dialogue selection.
- Apple Neural Engine accelerates local inference.
- Optional Speech and motion input remain on-device.
- Dialogue is selected from thousands of pre-written lines; it is not generated by ChatGPT, Claude, Gemini, Apple Intelligence, Private Cloud Compute, or another cloud LLM.

Keep technical claims conservative. Do not imply capabilities beyond the original product information.

## 9. Dog identity and generated imagery

The website’s dogs are based on the project reference photos:

- `img/ref1.jpeg`
- `img/ref2.jpeg`
- `img/ref3.jpeg`
- duplicate/converted references also exist under `img/references/`.

Generated final assets are under `img/generated/`. Superseded `-v1`, `-v2`, and `-v3` iterations were removed after the live-reference audit; the directory contains only the selected production artwork.

Current preferred images:

- `beige-terriers.png` — simple hero and gateway.
- `dark-dog-wave.png` — technical hero and gateway.
- `light-sunbeam-story.png` — posture/sunbeam chapter.
- `light-bird-story.png` — two-dog bird disagreement.
- `light-footer-story.png` — simple closing image.

When editing or regenerating these images:

- Preserve the identity of the two real reference dogs, especially facial proportions, ear shape, coat pattern, muzzle color, and fur texture.
- Keep the current composition, mood, bubbles, and blend where the user asked only for identity correction.
- Do not cut dog silhouettes from screenshots. Render cohesive scenes.
- Check bubble text exactly.
- Avoid excessive contrast in the light-theme story images.

## 10. App screenshots and icons

### Carousel screenshots

The carousel uses 23 files in `img/shots/`. The ordered list is declared in `carousel.js`, beginning with `bark_howl.jpg`.

Do not reintroduce the deleted legacy `hero.png` as a carousel or hero replacement. The user explicitly requested images from `img/shots/`, with `bark_howl.jpg` as the preferred first carousel image.

### Settings screenshots

- Simple settings source: `img/settile/light_0.jpg` through `light_7.jpg`.
- Technical settings source: `img/settile/dark_0.jpg` through `dark_7.jpg`.

The technical page currently uses all eight dark settings screenshots. They sit inside fixed cards, but the images use `object-fit: contain`; do not change them back to `cover`, because cropping the settings interface was explicitly rejected.

### Instrument icons

The “How to read the instruments” sections must use the real app symbols:

- YARD: `img/icons/tel_scn_yard_time.png`
- BIRD: `img/icons/tel_obj_bird.png`
- PRESENCE: `img/icons/tile_pack.png`
- HOWL: `img/icons/tel_bark_howl.png`

Do not redraw or replace these four app symbols. They represent the actual app interface. Other decorative or explanatory symbols may be redrawn or recolored.

Simple contextual icons are grayscale assets recolored via CSS into a muted terracotta/brown tone. Cyan was rejected for these icons on the beige page.

## 11. Carousel engineering

`carousel.js` initializes the first matching carousel on the current document.

Features:

- One front phone screenshot.
- Two near cards and two far cards forming an overlapped deck.
- Previous and next arrow buttons.
- Position dots.
- No automatic rotation. Auto-animation was explicitly removed.
- Horizontal pointer dragging.
- Horizontal trackpad scrolling.
- Shift + mouse wheel as an explicit horizontal gesture.
- Warframe-like front-card tilt based on pointer distance from card center.
- Slide-out/slide-in transition when changing screenshots.

### Critical scroll behavior

Vertical wheel or trackpad gestures must scroll the page even when the pointer is over the carousel. The carousel only calls `preventDefault()` for a clearly horizontal gesture or Shift + wheel.

Do not restore logic that converts ordinary vertical wheel movement into carousel movement.

Touch behavior uses `touch-action: pan-y`, allowing the page to remain vertically scrollable.

### Deck art direction

- Technical deck spreads wider toward the console edges.
- Simple deck has no heavy enclosing frame and blends into the page with cast shadows below.
- On the simple page only one deck card remains prominent on the left; it is faded to approximately 50% so it does not cover text.

## 12. FFT and waveform behavior

`carousel.js` generates `.fft-bars` elements procedurally. It also replaces the older technical observation-deck SVG waveform with FFT bars.

The visible spectrum is an aesthetic representation based on real app FFT examples, not a live microphone input on the website.

Simple hero ribbon paths use very slow CSS breathing animations. Respect `prefers-reduced-motion` and disable decorative motion when requested by the operating system.

Required terminology in the instrument deck:

**FFT audio frequency analysis · live spectrum / sound intensity**

Do not describe sound intensity as if it were unrelated to frequency analysis.

## 13. Airplane Mode privacy card

Both hero areas include a framed Airplane Mode/on-device proof card.

Requirements:

- It must remain visible at all viewport widths.
- It must not expand wider than its intended desktop width.
- Current cap: 390px.
- Its text may wrap internally on narrow screens.
- The airplane symbol must retain a fixed circular shape.
- Mobile uses tighter padding and slightly smaller type, not `display: none`.

The relevant overrides are at the end of `finetune.css`.

## 14. Calls to action

The current decision is one visible **Join beta** call to action at the top right of each perspective page. Duplicate “Request TestFlight access” buttons in the body are hidden through:

```css
main a[href^="mailto:"] {
  display: none !important;
}
```

The top navigation CTA is outside `main`, so it remains visible.

Do not reintroduce multiple competing Join Beta/TestFlight calls without explicit approval.

## 15. Privacy and storage implementation

The marketing site must not persist visitor state.

Forbidden unless the product owner explicitly changes the requirement:

- Cookies.
- `localStorage`.
- `sessionStorage`.
- IndexedDB.
- Analytics identifiers.
- Tracking pixels.
- Third-party marketing scripts.
- Remembering the visitor’s selected perspective across visits.

The view query parameter is acceptable because it is explicit navigation state in the current URL, not hidden persistence.

When adding third-party fonts, embeds, analytics, CDNs, or form services, first assess whether they violate the zero-tracking/no-network brand promise. Prefer local assets and first-party hosting.

## 16. Responsive behavior

Important breakpoints currently appear around 1050px, 900px, 850px, 620px, 520px, and 390px.

General requirements:

- Never allow horizontal page overflow.
- Keep all sections and children at `min-width: 0` where grids might overflow.
- Images must use `max-width: 100%`.
- Hide nonessential navigation links on smaller screens, but keep Join Beta and the perspective switch usable.
- Keep the Airplane Mode card visible.
- Reduce carousel side cards on narrow screens rather than shrinking the front phone beyond legibility.
- Settings cards collapse from four columns to two and then one.
- Gateway becomes vertically stacked on mobile.
- Test within the iframe wrapper because its fixed switch changes the usable header area.

## 17. Accessibility and motion

Current accessibility provisions include:

- Semantic section and heading structure.
- Alt text for meaningful images.
- `aria-label` values for carousel buttons, FFT representations, iframe, and perspective controls.
- Reduced-motion rules for card transitions and ribbon animation.

Finalization should add or verify:

- Visible keyboard focus states.
- Keyboard activation of all controls.
- Sufficient color contrast, especially muted copy on dark cards and beige backgrounds.
- Correct heading hierarchy after any restructuring.
- Meaningful iframe title.
- No focus trap between wrapper controls and iframe content.
- Screen-reader announcement when perspective changes, if the iframe architecture remains.

## 18. Local preview and deployment

### Direct-file preview

Open `index.html` or `experience.html` directly. The current iframe architecture is designed to work under `file://`.

Do not depend on:

- local cross-file `fetch()`;
- module imports that local-file browser security blocks;
- History API behavior without `try/catch`.

### Web-server preview

Any ordinary static server may serve the project root. No build step or package manager is currently required.

### Deployment

The site is static HTML, CSS, JavaScript, and local image assets. A production host should:

- Serve all assets from the same origin.
- Preserve query parameters on `experience.html`.
- Use HTTPS.
- Set sensible caching for immutable image assets.
- Avoid injecting analytics or cookie banners unless the privacy strategy is intentionally changed.
- Verify iframe headers are not blocked. Because the framed pages are same-origin files, do not send a `Content-Security-Policy` or `X-Frame-Options` policy that prevents `experience.html` from framing them.

## 19. Known technical debt and recommended finalization path

### Iframe composition

The iframe solves local-file compatibility but has tradeoffs:

- Parent and child scroll/focus contexts are separate.
- The parent switch overlays the child header.
- Deep anchor links inside the child are not reflected in the parent URL.
- Page title and metadata remain generic at the wrapper level.
- Search engines may treat framed content less favorably.

For final production, choose deliberately between:

1. Keep the iframe for zero-build simplicity and local-file support.
2. Adopt a build step that composes the two documents into one static output without runtime fetch.
3. Use server-side/static-site templating to share components while generating two complete routes.

The safest production improvement is option 3: generate `/simple/` and `/technical/` from shared components/data, retain the gateway, and make the switch navigate between routes. This removes iframe SEO/accessibility issues without requiring cookies or client persistence.

### CSS organization

Several CSS files are minified and rely on late overrides. Before major new work:

- Format the CSS mechanically.
- Separate shared carousel/privacy/header primitives from perspective-specific styling.
- Replace broad selectors and `:has()` mode detection with explicit body classes where possible.
- Preserve the current visual output during refactoring.

### Shared content facts

Create a single data source for facts repeated across both perspectives:

- Price.
- Platform support.
- Thousands of authored lines.
- Privacy claims.
- Framework names.
- Beta email address.

This will prevent the simple and technical versions from drifting.

## 20. Safe editing workflow for the next AI

Before changing anything:

1. Read this handbook completely.
2. Inspect `index.html`, `experience.html`, both perspective HTML files, `perspective.js`, `carousel.js`, and the relevant CSS.
3. Search for existing copies of the text or selector with `rg`.
4. Preserve unrelated user changes; the workspace may not be a Git repository.
5. Use targeted patches instead of rewriting minified files wholesale.

After changing anything:

1. Open `index.html` directly under `file://`.
2. Test both gateway choices.
3. Test the SIMPLE/TECHNICAL switch repeatedly.
4. Verify normal vertical scrolling over the carousel.
5. Verify horizontal trackpad, Shift + wheel, drag, arrows, dots, and hover tilt.
6. Test desktop, tablet, and narrow mobile widths.
7. Confirm the Airplane Mode card remains visible and capped.
8. Confirm no horizontal overflow.
9. Search for forbidden persistence APIs and obsolete copy:

```sh
rg -n -i 'localStorage|sessionStorage|document\.cookie|indexedDB|hundreds|19 everyday' .
```

10. Verify all referenced assets exist.
11. Recheck the page inside `experience.html`, not only as a direct perspective page.

## 21. Non-negotiable regression checklist

- [ ] Gateway is clean and has no cluttered top strip.
- [ ] Simple and Technical gateway choices both work under `file://`.
- [ ] Perspective switch does not cover child navigation text.
- [ ] No cookies or browser persistence.
- [ ] Normal vertical scrolling works over both carousels.
- [ ] Horizontal carousel gestures still work.
- [ ] Carousel does not auto-rotate.
- [ ] Airplane Mode cards remain visible at every width.
- [ ] Only one Join Beta CTA is visible per perspective.
- [ ] Copy says thousands, never hundreds.
- [ ] Copy says everyday sounds without a fixed number.
- [ ] Real app icons remain unchanged in the instrument sections.
- [ ] Technical settings screenshots are fully visible, not cropped.
- [ ] Simple contextual icons use the warm theme tone, not cyan.
- [ ] Dog identity remains faithful to the three reference photos.
- [ ] No claim of literal dog translation.
- [ ] No horizontal page overflow.
- [ ] Reduced-motion preferences are respected.

## 22. Creative north star

The website should never feel like one generic template with a palette swap.

The simple perspective should feel like a beautifully art-directed Sunday supplement about living with two opinionated dogs. The technical perspective should feel like a premium diagnostic instrument that happens to deliver jokes. Both should be clear, funny, trustworthy, and commercially persuasive.

The unifying line is:

**Same dog. Same facts. Different depth.**
