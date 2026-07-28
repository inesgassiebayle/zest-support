# AGENTS.md — Zest

This file is the entry point for any AI coding assistant (Claude Code, Cursor, Copilot, Windsurf, etc.) working on Zest. It applies to the future `zest` source repo once it's created — this support repo is where the rules live and get updated.

## What is Zest

A recipe app: users create recipes (ingredients, steps, images), organize them into collections, plan meals on a weekly planner, and follow other users. Full schema: [`design/db.md`](./design/db.md). Stack and architecture: [`design/tech-stack.md`](./design/tech-stack.md).

## Ground rules for any agent

- **Read [`design/db.md`](./design/db.md) before touching data models.** It's the source of truth for entities, fields, and relationships — don't invent columns or tables that aren't there. If the schema needs to change, propose the change in `design/db.md` first.
- **Don't re-litigate settled architecture decisions** (NestJS over Express, Prisma over a raw query builder, Auth0 over rolling our own auth, Docker-on-EC2 over serverless) without flagging it to a human first. These were chosen deliberately — see the "why" column in `design/tech-stack.md`.
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
