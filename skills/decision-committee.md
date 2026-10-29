# Decision committee — three views before you decide

For any decision (technical, scope, budget, team, how to present something),
Claude convenes a committee of three roles so the user gets an unbiased view
and has to think before choosing. The point is not that Claude decides: it is
that the user decides knowing the best case for, the best case against, and a
cold reading of the trade-off.

Answer in Spanish.

## The three members

| Member | Job | Must not |
|---|---|---|
| **Abogado del diablo** (critic) | Argue against the option the user is leaning towards. Find the risks, hidden costs, false assumptions, what can go wrong and what it would cost Zest. Propose the strongest alternative. | Be negative for the sake of it, or attack a strawman. Every objection points to something concrete. |
| **Aliado** (advocate) | Make the strongest honest case for the option. Why it is a good idea, what it unlocks, how to mitigate the critic's objections. | Flatter. If the option is weak, say what would have to be true for it to work. |
| **Neutral** (arbiter) | Weigh both sides without a stake. Lay out the trade-off, the criteria that really decide it, what information is missing and how cheaply it could be obtained, and how reversible the decision is. | Pick the middle by default, or repeat the other two. It adds what both missed. |

## How to run it

1. **Frame the decision** in one or two sentences: what is being decided, the
   options on the table, which one the user leans towards (if any), and the
   deadline. If the question is vague, ask one clarifying question first.
2. **Gather context** relevant to the decision — the Zest rules in
   [`../AGENTS.md`](../AGENTS.md), the schema in [`../docs/db.md`](../docs/db.md),
   the budget and schedule in [`project-management.md`](./project-management.md),
   the relevant tickets in Multica. Every member argues from the same facts.
3. **Hear each member independently.** When the tool can run subagents (Claude
   Code's `Agent` tool), run the three as separate subagents in parallel, each
   with the framing, the shared context and only its own role, so none of them
   is anchored by the others. Without subagents, write each position in full
   before reading the next, and do not let a later member just rebut the
   earlier one.
4. **One round of replies** (optional, only when the positions clash on a
   fact): the critic and the advocate each answer the other's strongest point
   in two or three lines.
5. **Hand it back to the user** in this format:

```
## La decisión
<one or two sentences>

## 😈 Abogado del diablo
<3–5 points, the strongest first>

## 🤝 Aliado
<3–5 points, the strongest first>

## ⚖️ Neutral
- Lo que realmente decide esto: <the 1–3 criteria>
- Lo que no sabemos: <missing info, and how to get it>
- Reversibilidad: <easy / costly / one-way, and why>
- Lectura: <which way the evidence leans and under what condition it flips>

## Preguntas para vos
<2–3 questions that make the user take a position>
```

6. **Let the user decide.** Don't close with "I recommend X" as the last word —
   the neutral member's reading is as far as the committee goes. If the user
   asks for Claude's own opinion explicitly, give it, labelled as such.

## Scale it to the decision

- Small, reversible decision (a name, the order of two slides): a short version
  of each member, a few lines each.
- Costly or one-way decision (changing the stack, dropping a module, moving the
  baseline): the full format, and the neutral member says what a wrong call
  would cost to undo.

## Zest-specific guardrails

- Settled architecture decisions (NestJS, Prisma, Auth0, the Render/Vercel/Neon
  deploy) can be put before the committee, but the result is a proposal to the
  team, never a change made on the spot — see [`../AGENTS.md`](../AGENTS.md).
- A decision that changes scope, time or cost goes through change control
  afterwards (see [`project-management.md`](./project-management.md#change-control)).
- Nobody in the committee invents data: missing numbers are listed under "Lo
  que no sabemos", not estimated silently.
