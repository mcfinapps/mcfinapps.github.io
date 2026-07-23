# Overtiles Website — Creative and Production Brief

## Positioning

**Overtiles is a memory game you can feel.** It turns Memory and Focus into a synchronized material
experience: visual motion, authored sound and Core Haptics peak and settle together across seven
complete material worlds—Walnut, Optical Glass, Anodized Aluminium, Glazed Porcelain, Saddle
Leather, Honed Basalt and Piano Lacquer.

Supporting copy:

> Every surface has a voice. Light, motion, sound and haptics are tuned as one—so changing material
> changes how the entire game feels.

Public wording should prefer **feel physical** or **feel distinct** over “physically accurate.”

## Direction — Material Atelier

One light-leaning editorial theme. It borrows the spacious elegance of Overbark's light page but
replaces its storybook warmth with industrial-design precision and tactile product imagery.

| Role | Color |
|---|---|
| Page ground | Pearl mineral `#F1EEE8` |
| Elevated surface | Warm porcelain `#FAF8F3` |
| Primary ink | Carbon `#17191A` |
| Secondary ink | Graphite `#5F615F` |
| Hairlines | Stone `#D4D0C8` |
| Walnut | `#573A29` |
| Champagne metal | `#C8AD79` |
| Optical-glass edge | `#CFE2E4` |
| Precision accent | Cobalt `#168BF2` |
| Dark interlude | Atelier black `#111415` |

Cobalt is a small precision highlight, never a large page fill.

Typography:

- Display: Iowan Old Style → Baskerville → Georgia.
- Body/UI: Avenir Next → Avenir → system sans-serif.
- Technical labels: SF Mono → ui-monospace.
- Desktop hero: 80–108 px, line-height 0.93. Body: 18–20 px.
- Fine mineral grain, physically plausible shadows, no arbitrary decorative gradients.

## Desktop hero — first laptop viewport

Full viewport (`100svh`, minimum 760 px), asymmetric 42/58 composition.

- Transparent navigation: McFin mark + Overtiles; Materials, Experience, Privacy; App Store CTA.
- Left: eyebrow **MEMORY, MADE MATERIAL**.
- Headline: **Remember with _all your senses._**
- Intro: “Overtiles turns two timeless mental challenges into something remarkably physical. Every
  touch aligns motion, sound and haptics so seven materials feel distinct in your hand.”
- Right: large authored mixed-material 4×5 board on pearl mineral worktop, cropped beyond the right
  and bottom edges. One edge-on tile exposes the teal/cobalt inner stratum. One matched pair has a
  restrained cobalt contact glow.
- Footer line: “Designed for iPhone and iPad. Completely offline.”
- Optional pointer motion moves only a plausible highlight 4–8 px. No floating-card gimmick.

## Scroll structure

1. **Hero — Remember with all your senses.**
2. **Two ways to play.** Memory matching and timed ascending-number Focus, within the same material.
3. **Seen. Heard. Felt—as one.** Precisely synchronized visual, sound and haptic tracks.
4. **Every surface has a voice.** Seven complete material instruments, not cosmetic skins.
5. **Turn the tile. Feel its weight.** Face → visible edge → revealed symbol.
6. **Feel the whole board move.** Shuffle panorama; tiles travel, overshoot and settle to their
   material-specific rhythm.
7. **Portrait boards, beautifully filled.** 3×5, 4×6, 5×7 and 5×8; iPad retains counts and scales tiles.
8. **Progress without pressure.** Local history by mode and grid.
9. **Quietly private.** Atelier-black interlude: “No account. No ads. No analytics. No network.”
10. **Turn one over.** Matched-pair final image, App Store CTA and one-purchase statement.

## Authored asset manifest

Generate every marketing image in the approved AI-rendered tile language.

| Asset | Size | Purpose |
|---|---:|---|
| `hero-atelier-16x10` | 3200×2000 | Desktop hero, negative space left |
| `hero-atelier-mobile-4x5` | 1440×1800 | Mobile hero board |
| Seven material card exports | up to 1500 px | Material-voice chapter |
| Current Memory + Focus captures | native portrait | Product-mode proof |
| Flip face / edge / reveal | 1600×1600 each | Synchronized flip story |
| `shuffle-panorama` | 2800×1400 | Overshoot/shuffle chapter |
| `matched-pair-final` | 2400×1600 | Closing CTA |
| UI captures | native | Portrait Memory/Focus plus iPad scale proof |
| `og-overtiles` | 2400×1260 | Social sharing |

Keep symbols in the grayscale sculpted FactoryAssets family. No emoji or unrelated icon language.

## Responsive and motion rules

- At 900 px, copy may overlay a softened full-bleed hero crop.
- Below 700 px: copy first, board second; never place text over busy tiles.
- Material sections alternate only on desktop; mobile order is title → image → explanation.
- Crop images instead of shrinking tiles until they become unreadable.
- `prefers-reduced-motion`: static final states and timing markers.
- Audio demos require an explicit user tap; never autoplay.
- No persistent storage, tracking, analytics or third-party runtime scripts.

## Build sequence

1. Generate and approve desktop/mobile hero assets.
2. Build semantic single-page HTML/CSS shell from this brief.
3. Add real simulator captures and the synchronized flip visualization.
4. Generate material macros, shuffle panorama and final CTA art.
5. Responsive, accessibility, local-file and performance QA.
6. Add privacy/support pages and publish only after Mika approves.

## Local build status — 2026-07-22

Steps 1–5 and the local portion of step 6 are complete. Production files are `index.html`,
`styles.css`, `site.js`, `privacy.html`, `support.html` and `site.webmanifest`. The site is fully
self-contained; it loads no third-party fonts, scripts, trackers or remote imagery. Browser QA
passed at desktop and 390×844 with reduced-motion support, keyboard-friendly semantic controls,
no horizontal overflow and no console errors. The current build includes all seven materials,
Memory + Focus, current portrait grids and local progress. Publishing remains Mika-gated.

The hero was generated with the built-in image generator from the accepted walnut, glass
and aluminium QA images. Prompt summary: premium elevated-orthographic Material Atelier board on a
warm pearl mineral surface; mixed thick rounded walnut/glass/champagne tiles; restrained grayscale
symbols; one teal-edged tile mid-flip; a matched pair with subtle cobalt halo; right-weighted 16:10
composition with clean left copy space; no device frame, UI, text, logo, hand or watermark. Master:
`img/generated/hero-material-atelier.png`.

The hero master is intentionally preserved unchanged during the 2026-07-22 product update.
