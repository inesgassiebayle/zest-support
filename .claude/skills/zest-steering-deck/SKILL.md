---
name: zest-steering-deck
description: Build the Zest Steering Committee deck (or any Zest presentation) as a React + Vite + Tailwind web deck from the working template in decks/_template — assertion headlines approved first, three visual directions to choose from, React Bits backgrounds and text effects on the Citrus brand, animated S-curve and metrics, presenter view with notes and timer, automatic layout check with screenshots, and PDF export. Use when creating, updating or converting a steering deck or any slide presentation of the project.
---

# Zest steering deck

The process lives in `skills/steering-deck.md`. **Read it first**, then as the
step needs them:

- `skills/steering-deck/design.md` — assertion–evidence, density, type, color,
  charts, motion, anti-slop list.
- `skills/steering-deck/react-bits.md` — catalogue, which effect per slide,
  `npm run add-bit`, license.
- `decks/_template/README.md` — how the template works.

## Content comes from
- Numbers → `skills/project-management.md`.
- Story, demo script and speaker notes → `skills/storytelling.md` and
  `decks/<event>/demo.md` if it exists.
- Team, scope, milestones, risks → `docs/product.md`.

## Non-negotiable
- Titles-only outline approved before building; three visual previews shown as
  screenshots before committing to a style.
- Every number in `src/data/` with source and cut date; missing data stays
  `isExample` or a visible TODO.
- `npm run check` passes and you have looked at every screenshot in `check/`
  before showing the deck. `npm run pdf` before presenting.
- Free React Bits only: the team has no React Bits Pro license.
- This repo is public: no credentials, no real user data. Never modify the `zest` app repo.
- Slide copy in Spanish.
