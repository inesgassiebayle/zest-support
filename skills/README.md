# Skills / conventions for AI agents

Each file here is a set of rules for one part of the Zest stack. They're plain markdown on purpose — no tool-specific format — so they work regardless of which AI coding assistant a contributor uses.

- [`frontend.md`](./frontend.md) — React + TypeScript + Vite + Tailwind
- [`backend.md`](./backend.md) — Node.js + TypeScript + NestJS
- [`database.md`](./database.md) — PostgreSQL + Prisma
- [`auth.md`](./auth.md) — Auth0
- [`infra.md`](./infra.md) — Docker + Terraform
- [`git-workflow.md`](./git-workflow.md) — branches, commits, PRs

These are a starting point, not a finished spec. As the team hits real decisions (state management, testing library, folder structure) update the relevant file so the next person — human or agent — doesn't relitigate it.

The two tools in use on this project auto-load rule files, so nobody has to paste these in manually:
- **Codex** reads [`../AGENTS.md`](../AGENTS.md) natively — no extra setup.
- **Claude Code** looks for `CLAUDE.md`; see [`../templates/agent-config/`](../templates/agent-config) for a `CLAUDE.md` that points it at `AGENTS.md`, plus a `zest-convention-check` skill that reviews a branch's changes against these files before a PR goes up.

## Reporting a miss

If your agent ignores one of these rules, gets it wrong, or you hit a situation none of these files cover, [file a "Skill / convention miss" issue](../../issues/new?template=skill-miss.yml) — don't just work around it silently. These docs are only useful if they stay accurate as the real codebase grows, and the fastest way for that to happen is for gaps to get reported instead of quietly re-discovered by the next person (or agent).
