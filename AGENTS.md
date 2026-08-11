# AGENTS.md — Zest

This file is the entry point for any AI coding assistant (Claude Code, Cursor, Copilot, Windsurf, etc.) working on Zest. It applies to the future `zest` source repo once it's created — this support repo is where the rules live and get updated.

## What is Zest

A recipe app: users create recipes (ingredients, steps, images), bookmark recipes and organize them into collections, and plan which recipe to cook on which date. Full schema: [`docs/db.md`](./docs/db.md). Stack and architecture: [`docs/tech-stack.md`](./docs/tech-stack.md). Design system and wireframes: [`design/`](./design) — see [`skills/frontend.md`](./skills/frontend.md).

> `docs/tech-stack.md` hasn't caught up with the current schema yet — it still mentions `labels`, `follows`, and `weekly_plans`, none of which exist in `docs/db.md` anymore (no tagging system, no following other users, no weekly grouping for meal planning). Treat `docs/db.md` as authoritative until that's reconciled.

## Ground rules for any agent

- **Read [`docs/db.md`](./docs/db.md) before touching data models.** It's the source of truth for entities, fields, and relationships — don't invent columns or tables that aren't there, and don't rebuild `labels`, `follows`, or `weekly_plans` just because an older doc or a stale mockup mentions them. If the schema needs to change, propose the change in `docs/db.md` first.
- **Don't re-litigate settled architecture decisions** (NestJS over Express, Prisma over a raw query builder, Auth0 over rolling our own auth, Docker-on-EC2 over serverless) without flagging it to a human first. These were chosen deliberately — see the "why" column in `docs/tech-stack.md`.
- **This is a student project.** Prefer straightforward, readable code over clever abstractions. Don't add infrastructure, patterns, or dependencies beyond what the current task needs.
- **Never commit secrets** (`.env` files, API keys, Auth0 client secrets, DB credentials). Only `.env.example` belongs in git.

## Per-layer rules

| Layer | File |
|---|---|
| Frontend (React/TS/Vite/Tailwind) | [`skills/frontend.md`](./skills/frontend.md) |
| Backend (NestJS/TypeScript) | [`skills/backend.md`](./skills/backend.md) |
| Database (PostgreSQL/Prisma) | [`skills/database.md`](./skills/database.md) |
| Auth (Auth0) | [`skills/auth.md`](./skills/auth.md) |
| Infra (Docker/Terraform) | [`skills/infra.md`](./skills/infra.md) |
| Git & PR workflow | [`skills/git-workflow.md`](./skills/git-workflow.md) |

If your tool supports a specific skills/rules format (e.g. Claude Code's `.claude/skills/`, Cursor's `.cursor/rules/`), point it at the relevant file(s) in `skills/` rather than duplicating the content.

## Found a gap?

If an agent ignores one of these rules or you hit something none of these files cover, [file a "Skill / convention miss" issue](../../issues/new?template=skill-miss.yml) instead of silently working around it — see [`skills/README.md`](./skills/README.md#reporting-a-miss).
