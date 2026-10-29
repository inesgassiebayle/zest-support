# Project management — effort, budget and earned value

Helps whoever is acting as PM (the role rotates) estimate effort, build or
revise the budget, compute earned value metrics (PV, EV, AC, SPI, CPI, EAC...)
and, above all, **understand** what the numbers say about the project. It
answers in Spanish, the language the team and the course use.

This is not a calculator that spits out numbers. Every metric it gives comes
with the formula, the inputs it used, where each input came from, and a
one-paragraph reading of what it means for Zest.

## Where the numbers come from

Never invent a PV, EV or AC. Ask for it or read it from one of these sources,
and say which one you used and as of what date.

| What | Source |
|---|---|
| Baseline (PV per period, BAC, reserves) | Spreadsheet **"10B-Equipo 02 - EVM y Curva S - Avance por %"** (Google Drive, sheet `PRESUPUESTO`) |
| Cost assumptions (rates, HH per role) | Spreadsheet **"Zest_Presupuesto_EVM"**, sheet `Supuestos` |
| Why each number is what it is | Doc **"Memo_Respaldo_Gestion_Financiera_Zest"** |
| How the team runs EVM week to week | Doc **"Guía EVM"** |
| Latest numbers presented to the committee | Deck **"Zest - Steering 2"** (15/10/2026), slides *Presupuesto* and *Valor ganado* |
| Ticket progress (input for EV of discrete work) | Multica — see [`multica.md`](./multica.md) (`multica issue list --project ... --status done`) |
| What actually shipped | `git log` / merged PRs in the `zest` repo |
| Platform health (not EVM, but useful context) | KPI report in `zest/kpis/` — see its README |

If the session has a Google Drive connector, read the spreadsheets directly.
If not, ask the user to paste the current row values. If Multica is not
reachable, say so and ask for the ticket counts instead of guessing them.

## Last known snapshot (Steering 2, cut 15/10/2026, baseline v2)

Use it as a sanity check and as context, **not** as current data: check the
spreadsheet for anything newer.

| | Value |
|---|---|
| Total project budget | USD 7.916 |
| BAC (cost baseline) | USD 7.256 |
| Management reserve | USD 660 |
| Development | 192 HH plan (2 devs × 6 h/week = 180 h + 12 h of the KPI challenge) at USD 10/h → USD 1.920; 159 HH real |
| Management (PM, PO, TL, QA) | 384 HH plan at USD 10/h → USD 3.840; 240 HH real |
| Infra, domain and tools | USD 956 |
| Activity contingency | 54 of 66 h left (8%) |
| PV | USD 4.493 (61,9% of the project) |
| EV | USD 6.124 (84,4%) |
| AC | USD 4.591 (399 h incurred + services) |
| SPI / CPI | 1,36 / 1,33 |
| SV / CV | +USD 1.631 / +USD 1.533 |
| MVP in production | 12/11/2026 |

Baseline v2 was approved through change control on 13/10: the KPI-reporting
challenge added 46 h (19 dev + 27 management) and cost USD 460, covered by
USD 70 freed from the planner (the portion stepper and the planner quick
action were dropped and will not come back), USD 120 of contingency and
USD 270 of the management budget. BAC did not change.

History worth knowing when reading trends: the first baseline (memo of
01/09, in ARS) had SPI 1,00 → 0,42 → 0,75 → 0,89 over periods 1–4. The dip
was a measurement artifact (tickets closed on 27/08 were only recognised at the
end of period 3), not a real slowdown. At that point AC only counted cash
outlays, so CPI was meaningless; the team started logging real hours later.

## Course theory (Dirección de Proyectos / Laboratorio IV)

### Earned value

| Metric | Formula | Reads as |
|---|---|---|
| PV — planned value | baseline cost of the work scheduled to date | what the plan promised by now |
| EV — earned value | % really done × BAC (at plan prices) | what we finished, valued at plan |
| AC — actual cost | what was really spent (hours × rate + services) | what it cost us |
| SV | EV − PV | ahead (+) or behind (−) schedule, in money |
| CV | EV − AC | under (+) or over (−) budget for the work done |
| SPI | EV / PV | < 1 late, > 1 ahead |
| CPI | EV / AC | < 1 inefficient, > 1 efficient. The most important EVM indicator |
| EAC | BAC / CPI (if the current efficiency continues) · AC + (BAC − EV) (if the deviation was a one-off) · AC + (BAC − EV) / (CPI × SPI) (if both cost and schedule keep pressing) | what the project will cost at the end |
| ETC | EAC − AC | what is left to spend |
| VAC | BAC − EAC | the margin (or hole) we will close with |
| TCPI | (BAC − EV) / (BAC − AC) | the efficiency needed from now on to finish on BAC; > 1 means we have to do better than so far |

Always say which EAC formula you used and why. For Zest the default is
`BAC / CPI`, unless the deviation has a known one-off cause (then
`AC + (BAC − EV)`).

Rules the course stresses and the team agreed on:

- **"Done" has to be defined** with PO and Tech Lead (works, tested, can be
  shown) before EV means anything. Work in progress earns nothing.
- **Hours worked ≠ earned value.** Being busy is not progress.
- **LOE (level of effort) lines** — management, infra, tools, domain,
  contingencies — have no discrete deliverable: by convention EV = PV for them.
  Only development (tickets) is measured as discrete work.
- **EV of development** = weighted % complete per WBS activity (weighted by its
  number of tickets) × the development line budget.
- **Look at the S-curve, not one cut.** One bad week can be noise; EV below PV
  for several weeks in a row is a real problem.
- **CPI < 1 and SPI < 1 together = double alert.** Ask: unreported blockers?
  QA showing up only at the end? PO adding scope instead of trimming it? Too
  many fronts open at once?
- **An EVM meeting ends with a decision**: trim scope (PO), simplify the
  technical solution (TL), unblock something (PM), or recalculate EAC and warn
  early that the budget will not be enough.
- A positive CV is **remaining margin, not savings** (that is how the team
  phrased it at Steering 2).
- Once a measuring criterion is chosen (the two templates: "Avance por EV" and
  "Avance por %"), keep it for the whole project.

### Estimating effort and cost

- **Analogous** (from a similar past task), **parametric** (unit × rate,
  e.g. HH × USD/h), **bottom-up** (sum of the WBS work packages),
  **expert judgement / Delphi**, **Planning Poker** for story points.
- **PERT three-point**: E = (O + 4M + P) / 6, σ = (P − O) / 6. Triangular:
  E = (O + M + P) / 3. Give the range, not just the expected value.
- Zest's binding constraint (theory of constraints) is **6 h/week per
  developer**. Any estimate in calendar time goes through that number.
- Typical estimation mistakes the course lists: misreading scope, a wrong WBS,
  optimistic deadlines, the wrong technique.

### Budget

- **Cost baseline (BAC)** = sum of the estimates, periodised (1 period = 1
  week, aligned with the Thursday classes).
- **Contingency reserve** covers *known* risks (the risk log) and is part of the
  baseline. **Management reserve** covers unknown unknowns, sits above it and
  needs approval to use.
- Calibrate the contingency against the **EMV** of the known risks
  (EMV = probability × impact in money). In the Charter the EMV of the five
  threats was ~USD 3.180 against a contingency of ~USD 830 — a gap the team
  already acknowledged.
- Separate OPEX (people's hours) from CAPEX (infra, licences, tools).
- Market rates, not made-up ones. The ARS baseline used the Sysarmy/OpenQube
  2026.1 salary survey and the BNA official rate; baseline v2 values every hour
  at USD 10.
- The project runs on free tiers (real cash outlay ≈ 0). The budget values the
  project **as if it were real**, at market prices — say so whenever someone
  asks why we "spend" money.

### Change control

Any change to scope, time or cost that touches the baseline goes through change
control (like the KPI challenge on 13/10): what is added, what is dropped, how
many hours and from where (released work, contingency, management budget), and
whether BAC changes. The "short blanket": stretching one dimension forces you to
shrink another.

## How to answer

1. **Get the inputs** from the sources above. List them with their date and
   source. If one is missing, ask — do not fill it in.
2. **Compute** with the formula written out (`SPI = EV / PV = 6.124 / 4.493 =
   1,36`). Two decimals for indices, whole dollars for money, Spanish number
   format (`1.234,56`).
3. **Interpret**: what it means for Zest specifically, compared with the
   previous cut (trend, not a snapshot), and whether there is a double alert.
4. **Recommend a decision** and who owns it (PO / TL / PM), per the Guía EVM.
5. **Flag what is shaky**: AC without real hours, EV based on tickets that are
   not really "done", a baseline changed without change control, rounding
   artifacts like the −USD 7 of period 2.

When the user is studying rather than reporting, explain the concept first, then
apply it to Zest's real numbers — the course rewards linking theory to the
project.

## What NOT to do

- Don't present a CPI computed from an AC that leaves out people's hours as if
  it measured efficiency.
- Don't move the baseline (PV/BAC) to make the indices look better. Only a
  formal scope change does that.
- Don't mix currencies or baselines in one calculation (the ARS baseline of
  September and the USD baseline v2 are different series).
- Don't write anything to the spreadsheet or Multica without the user asking
  for it explicitly.
