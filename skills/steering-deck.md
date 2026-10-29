# Steering deck — React + React Bits, Awwwards level

Builds the deck for a Steering Committee as a small React app: full-screen
slides, keyboard navigation, speaker notes, motion from
[React Bits](https://reactbits.dev) and an editorial look you'd expect on
[Awwwards](https://www.awwwards.com), on Zest's brand. Slide copy is in Spanish.

The content comes from the other skills; this one is about structure and
craft:

- Numbers (budget, HH, PV/EV/AC, SPI/CPI, EAC) → [`project-management.md`](./project-management.md)
- Narrative and demo script → [`storytelling.md`](./storytelling.md)
- Product, team, scope, milestones, risks → [`../docs/product.md`](../docs/product.md)
- Hard calls about the content (what to cut, how to present bad news) → [`decision-committee.md`](./decision-committee.md)

## Where it lives

`decks/steering-<n>/` in this repo, one folder per steering, so previous decks
stay as they were presented:

```
decks/steering-3/
  package.json        # vite, react, typescript, tailwind + the React Bits deps
  index.html
  src/
    main.tsx
    Deck.tsx          # navigation, progress, notes, print mode
    slides/           # one file per slide: 01-Portada.tsx, 02-Equipo.tsx ...
    components/       # SlideLayout, Kicker, Metric, Table — and React Bits under components/bits/
    data/             # numbers.ts, team.ts, risks.ts — every number in one place
    styles/tokens.css # Zest tokens (see below)
  public/assets/      # copied from design/zest/assets
```

Same stack as the app's frontend (Vite + React + TypeScript + Tailwind) so the
team already knows it. No other framework (no Next, no reveal.js, no
Spectacle). Before starting a new deck, copy the previous one if it exists and
change the content: same shell, new data.

## Slide structure

The skeleton the committee already knows from Steering 1 and 2. Keep the order
unless the user asks otherwise; drop or add slides only for a reason you can
state.

| # | Slide | Content |
|---|---|---|
| 1 | Portada | "Steering <n>", "Laboratorio II y IV", date, Zest logo |
| 2 | Equipo y roles | The six roles with names **as of this steering** (they rotate — see `product.md`) |
| 3 | Visión del producto | The pitch, unchanged from the Charter |
| 4 | Avance por módulo | Table modules × backend / frontend / QA / total, grouped by sprint, status completed / in progress / pending |
| 5 | Cronograma | Gantt by stage with the cut date line, milestones and anything that changed |
| 6 | Cambios / challenges | What came in, what went out, hours and money moved, whether BAC changed (change control) |
| 7 | Presupuesto y esfuerzo (HH) | Concepts × HH plan, rate, plan cost, real HH; BAC, contingency left, management reserve |
| 8 | Valor ganado | PV, EV, AC with one-line explanations; SPI, CPI, SV, CV with their formula; EAC if it changed |
| 9 | Curva S | PV, EV and AC cumulative curves, BAC line, cut date and MVP marker |
| 10 | Riesgos — amenazas | R1…Rn: P, impact, level, strategy, response |
| 11 | Riesgos — oportunidades | O1…On, same columns |
| 12 | Próximos pasos | Three or four, numbered |
| 13 | Demo | Full-bleed transition slide; the script comes from `storytelling.md` |
| 14 | Gracias / ¿Preguntas? | |
| — | Anexo | Probability × impact matrix, detail tables |

Every number on a slide is imported from `src/data/`, never typed inside JSX,
and `data/numbers.ts` states its source and cut date in a comment. Check
SPI = EV / PV and CPI = EV / AC add up before presenting.

## Visual direction

Editorial and confident, not a template: large serif headlines, plenty of
space, one idea per slide, motion that guides the eye instead of decorating.

- **Brand tokens** — use Zest's Citrus palette and fonts from
  `design/uploads/zest-wireframe-design/app/globals.css` (summarised in
  [`frontend.md`](./frontend.md#design-tokens-from-designuploadszest-wireframe-designappglobalscss-matches-the-prototype)):
  grapefruit `#e8415a`, coral `#f2735a`, lemon `#f5c842`, lime `#7dc242`,
  background `#faf7f2`, foreground `#2c2c2c`. **Playfair Display** for
  headlines, **Geist** for text, **Geist Mono** for every number. Define them
  as CSS variables in `tokens.css` and map them to Tailwind; no one-off hex
  values in slides.
- **Type scale** — headlines 72–120 px, kicker (the small all-caps label above
  the title, like "ESTADO DEL PROYECTO") 14–16 px with letter-spacing, body
  never below 24 px. Big numbers (SPI 1,36) 120 px+ in Geist Mono.
- **Grid** — 16:9 canvas at 1920×1080, scaled to fit the screen; a 12-column
  grid with wide margins. Left-aligned text; centring only on the cover, demo
  and closing slides.
- **Colour meaning** — lime = on track / done, lemon = in progress / watch,
  grapefruit = alert / pending. Same meaning on every slide. Never rely on
  colour alone: add the label or an icon.
- **Charts** — the S-curve and any other chart are inline SVG or Recharts,
  styled with the tokens: PV dashed, EV solid grapefruit, AC solid foreground,
  BAC as a labelled horizontal line, direct labels at the end of each line
  instead of a legend.

## React Bits

React Bits is a library of animated React components that you copy into the
project (they become your code, not a dependency). Install each one in its
**TypeScript + Tailwind** variant, for example:

```
npx shadcn@latest add https://reactbits.dev/r/SplitText-TS-TW
```

Check the command on the component's page at reactbits.dev before running it:
the registry format can change. Components land under `src/components/`; move
them to `src/components/bits/`. Some need peer dependencies (`gsap` and
`@gsap/react`, `motion`, `ogl` or `three`): install only what the chosen
components ask for.

What to use where — at most one "hero" effect per slide:

| Slide | Suggested components |
|---|---|
| Cover | A subtle background (`Aurora`, `Silk`, `Threads` or `DotGrid`) tinted with the Citrus palette + `SplitText` or `BlurText` for "Zest" |
| Section kickers and titles | `SplitText`, `BlurText`, `ShinyText` |
| Big metrics (SPI, CPI, % progress, hours) | `CountUp` — animates from 0 to the real value when the slide enters |
| Team | `ProfileCard`, `TiltedCard` or `SpotlightCard` with the photos |
| Module progress, risks | `AnimatedContent` / `FadeContent` to reveal rows in order; `SpotlightCard` for highlighted items |
| Product / features | `MagicBento` or `ChromaGrid` with real screenshots of the app |
| Demo | Full-bleed background (`Hyperspeed`, `Beams` or `Iridescence`) + `RotatingText` |
| Closing | Reuse the cover background so the deck feels like a loop |

Motion rules:

- Animations play **once**, when the slide enters, and finish within ~1 s.
  Nothing loops behind a table or a chart someone has to read.
- Respect `prefers-reduced-motion`: show the final state with no animation.
- WebGL backgrounds only on cover, demo and closing slides, and paused when the
  slide is not visible — a projector laptop has to run the deck smoothly.

## Deck shell (`Deck.tsx`)

- `→` / `Space` / click: next; `←`: previous; `Home` / `End`; slide number in
  the URL hash (`#7`) so a reload stays on the same slide.
- `N` toggles speaker notes (each slide exports a `notes` string — the
  presenter lines from `storytelling.md`, like the notes in Steering 1 and 2).
- `F` full screen. A thin progress bar at the bottom.
- `?print` renders every slide stacked at 1920×1080 with animations at their
  final state, for the PDF.

## Export and checks before presenting

1. `npm run build` passes with no TypeScript errors.
2. Export the PDF with Playwright from the `?print` view (one page per slide)
   and keep it next to the deck: it is the backup if the laptop fails.
3. Go through every slide at 1920×1080 and on a 13" laptop: nothing cut off,
   nothing overlapping, text readable from the back of the room.
4. Re-check every number against the spreadsheet and the date of the cut.
5. Names and roles match this steering.

## What NOT to do

- Don't invent numbers, dates or progress to fill a slide — leave a visible
  `TODO` and ask.
- Don't stack effects: a slide with three animated components reads as a demo
  of React Bits, not as a steering.
- Don't put a screenshot of a feature that isn't built yet into the demo or
  the bento.
- Don't commit secrets or production data (real user e-mails) into the deck.
