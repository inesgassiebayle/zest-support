---
name: zest-steering-deck
description: Build the Zest Steering Committee deck as a React + Vite + Tailwind app with React Bits animations and an Awwwards-style editorial design on Zest's Citrus brand — slide structure, data files, deck shell with notes and PDF export. Use when creating or updating a steering deck or any slide presentation of the project.
---

# Zest steering deck

The rules live in `skills/steering-deck.md`. **Read it first.** The deck
is built in this repo, under `decks/steering-<n>/`.

## Always read
- `skills/steering-deck.md` — structure, visual direction, React Bits
  usage, deck shell and checks.

## Content comes from
- Numbers → the `zest-project-management` skill.
- Narrative, demo script and speaker notes → the `zest-storytelling` skill.
- Team, scope, milestones, risks → `docs/product.md`.
- Brand tokens → `design/uploads/zest-wireframe-design/app/globals.css`.

## Non-negotiable
- Every number lives in `src/data/` with its source and cut date; no invented
  numbers — leave a visible TODO and ask.
- One hero effect per slide, animations play once, `prefers-reduced-motion`
  respected.
- `npm run build` passes and the PDF backup is exported before presenting.
- Slide copy in Spanish.
