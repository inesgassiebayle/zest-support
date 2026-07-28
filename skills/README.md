# Skills / conventions for AI agents

Each file here is a set of rules for one part of the Zest stack. They're plain markdown on purpose — no tool-specific format — so they work regardless of which AI coding assistant a contributor uses.

- [`frontend.md`](./frontend.md) — React + TypeScript + Vite + Tailwind
- [`backend.md`](./backend.md) — Node.js + TypeScript + NestJS
- [`database.md`](./database.md) — PostgreSQL + Prisma
- [`auth.md`](./auth.md) — Auth0
- [`infra.md`](./infra.md) — Docker + Terraform
- [`git-workflow.md`](./git-workflow.md) — branches, commits, PRs

These are a starting point, not a finished spec. As the team hits real decisions (state management, testing library, folder structure) update the relevant file so the next person — human or agent — doesn't relitigate it.

If you're using an agent that supports auto-loaded rule files, point it here:
- **Claude Code**: reference these files from `.claude/skills/` or your project's `CLAUDE.md`.
- **Cursor**: reference these files from `.cursor/rules/`.
- **Other tools**: paste the relevant file into your system prompt / context, or link it in your tool's config.
