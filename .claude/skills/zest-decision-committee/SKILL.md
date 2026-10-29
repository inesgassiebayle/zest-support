---
name: zest-decision-committee
description: Convene a committee of three Claudes — devil's advocate (argues against), advocate (argues for) and neutral (weighs the trade-off) — so the user thinks a decision through without bias. Use whenever the user wants to decide something (technical, scope, budget, team, how to present) or asks for "el comité", "pros y contras" or a second opinion.
---

# Zest decision committee

The protocol lives in `skills/decision-committee.md`. **Read it first.**

Pass the subagents the path to that file: they read the protocol themselves.

## How to run it here
1. Frame the decision (options, which one the user leans towards, deadline).
   Ask one clarifying question if it is vague.
2. Gather the shared facts the decision depends on (`AGENTS.md`,
   `docs/product.md`, `skills/project-management.md`, and the `zest` app code if
   it is available).
3. Launch the three subagents **in parallel, in one message**, each with the
   same framing and facts:
   - `committee-devils-advocate`
   - `committee-advocate`
   - `committee-neutral`
   Put the facts in the prompt itself: the subagents can only read repo files,
   not Drive or Multica.
4. Merge their answers into the output format from the support doc and finish
   with the questions for the user. The user decides.

If subagents are not available, write the three positions one after the other,
each in full before the next.

Answer in Spanish.
