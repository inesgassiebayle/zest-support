# Skills / conventions for AI agents

Each file here is a set of rules for one part of the Zest stack. They're plain markdown on purpose — no tool-specific format — so they work regardless of which AI coding assistant a contributor uses.

- [`frontend.md`](./frontend.md) — React + TypeScript + Vite + Tailwind
- [`backend.md`](./backend.md) — Node.js + TypeScript + NestJS
- [`database.md`](./database.md) — PostgreSQL + Prisma
- [`auth.md`](./auth.md) — Auth0
- [`infra.md`](./infra.md) — Render + Vercel + Neon
- [`git-workflow.md`](./git-workflow.md) — branches, commits, PRs
- [`multica.md`](./multica.md) — project tracking: connecting to the Multica CLI and ticket conventions

These are a starting point, not a finished spec. As the team hits real decisions (state management, testing library, folder structure) update the relevant file so the next person — human or agent — doesn't relitigate it.

If you're using an agent that supports auto-loaded rule files, point it here:
- **Claude Code**: reference these files from `.claude/skills/` or your project's `CLAUDE.md`.
- **Cursor**: reference these files from `.cursor/rules/`.
- **Other tools**: paste the relevant file into your system prompt / context, or link it in your tool's config.

## Reporting a miss

If your agent ignores one of these rules, gets it wrong, or you hit a situation none of these files cover, [file a "Skill / convention miss" issue](../../issues/new?template=skill-miss.yml) — don't just work around it silently. These docs are only useful if they stay accurate as the real codebase grows, and the fastest way for that to happen is for gaps to get reported instead of quietly re-discovered by the next person (or agent).
