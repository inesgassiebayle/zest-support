# Agent config templates

The two devs on this project use different AI coding agents — one Codex, one Claude Code. `AGENTS.md` and `skills/` at the root of this repo already cover Codex (it reads `AGENTS.md` natively). This folder holds the extra pieces Claude Code needs, ready to drop into the real `zest` source repo once it exists.

## When the source repo is created, copy in:

1. This repo's root [`AGENTS.md`](../../AGENTS.md) and [`skills/`](../../skills) — the actual conventions, unchanged.
2. From here: [`CLAUDE.md`](./CLAUDE.md) → repo root (points Claude Code at `AGENTS.md`, so the two files can't drift out of sync).
3. From here: [`.claude/skills/zest-convention-check/`](./.claude/skills/zest-convention-check) → `.claude/skills/zest-convention-check/` at the repo root — a Claude Code skill that reviews a branch's changes against `skills/*.md` before a PR goes up. Codex has no equivalent mechanism (no user-invoked skill system), so there's nothing to build for that side beyond `AGENTS.md` itself.

Same pattern already applied to the [ingredients CRUD challenge repo](https://github.com/lizlubelczyk/zest-ingredients-crud-challenge) — see its `AGENTS.md`/`CLAUDE.md` for a working example at smaller scope.
