# Storytelling — turn features into a story

The user says what they want to show ("the collections module", "everything
from Sprint 2", "the KPI challenge") and who will be watching (the steering
committee, the Lab II teachers, a demo day, a final exam). This skill returns
the whole story ready to present: the narrative arc, the demo script with
clicks and lines, and the transitions. It answers in Spanish.

## Context to read first

| What | Where |
|---|---|
| Purpose, pitch, problem, personas, KPIs, scope, team, milestones, risks | [`../docs/product.md`](../docs/product.md) |
| What every screen looks like and its copy | [`../design/zest/Zest.dc.html`](../design/zest/Zest.dc.html) |
| What is really built | `zest/frontend/src/features/` and `zest/backend/src/` — check the code (or `git log`) before claiming a feature works |
| Numbers (budget, EV, SPI/CPI) | [`project-management.md`](./project-management.md) |
| How previous presentations told it | Decks *Steering 1 - Zest* and *Zest - Steering 2* in the team Drive |

Rules for the content:

- **Only show what exists.** If the user asks to show something that is not
  built (the planner before 12/11, tags, following users), say so and offer to
  tell it as "what's next", not as a demo.
- Respect the "lista de NOs" in `product.md`: never pitch an out-of-scope
  feature (social, AI assistant, mobile app) as if it were coming.
- Use the real vocabulary of the app (the copy in the prototype), not
  invented feature names.

## The arc

Every story, long or short, follows the same five beats. Scale each beat to the
time available.

1. **Hook — the person and the problem.** Start with a concrete person, not the
   product: "Sofi tiene recetas en Instagram, en capturas de WhatsApp y en un
   cuaderno. Es jueves a la noche y no sabe qué cocinar." Use the real problem
   from `product.md` (3+ sources, repeating the same dishes).
2. **Tension — why it matters.** What it costs today: time lost, recipes lost,
   monotony. One data point or KPI if there is one.
3. **The turn — Zest.** The pitch in one sentence. No feature list yet.
4. **The journey — the features, as the person's steps.** Each feature is a
   moment in the persona's week, in the order she would live it (discover →
   save → organize → plan), never in the order of the backlog. For each one:
   what she wants, what she does in Zest, what she gets.
5. **Resolution — the result and what's next.** Back to the hook ("el jueves,
   Sofi abre Zest y...") and tie it to the KPI the feature moves (70% manage
   their recipes in Zest, 50% use the planner). Close with the next milestone.

Personas to draw from (from the Charter's stakeholders): the **planner** who
cooks for the week, the **content creator** who publishes recipes and wants
visibility. Give the persona a name and one concrete detail; keep it the same
person throughout.

## Adapt it to the audience

| Audience | Emphasis |
|---|---|
| Steering committee (Lab IV) | Value delivered vs plan, decisions taken, trade-offs (scope/time/cost), risks. The story frames the demo; the numbers come from `project-management.md`. |
| Lab II teachers | How it was built: architecture, quality (tests, CI), the devs' work. |
| Demo day / users | Only the persona and the journey. No metrics, no stack. |
| Final exam | Link every beat to a concept from the course (scope, quality, risks...), the way the exam guide does. |

## What to deliver

```
## Mensaje central
<one sentence: what the audience must remember>

## Arco
1. Gancho — ...
2. Tensión — ...
3. Giro — ...
4. Recorrido — ...
5. Cierre — ...

## Guion de demo
| # | Pantalla / acción | Qué se dice | Qué tiene que verse |
|---|---|---|---|
| 1 | Login → feed | "..." | ... |

## Transiciones
<the sentence that links each block to the next, including into and out of the demo>

## Plan B
<what to show if the demo fails: screenshots or a recording, and which ones>

## Tiempos
<minutes per beat, adding up to the time slot>
```

If the story feeds a deck, also hand over a one-line-per-slide outline that the
[`steering-deck.md`](./steering-deck.md) skill can build from.

## Demo script rules

- Prepare the data: name the recipes, the collection and the user the demo will
  use (a seeded account, never a teammate's real one). The recipe images in
  `design/zest/assets/recipes/` match the prototype.
- One click per line in the script. Say what should be on screen after each
  one, so whoever presents knows when something went wrong.
- The demo shows the happy path; the edge cases are for Q&A.
- Always a plan B: screenshots or a recording, because the backend on Render's
  free tier can take a while to wake up.
