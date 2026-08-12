---
name: zest-convention-check
description: Review the current branch's changes against Zest's AGENTS.md/skills/ conventions before opening a PR. Use when asked to check conventions, review changes before a PR, or "does this follow our conventions".
---

# Zest convention check

A pre-PR self-review pass against this project's own conventions — catch what the human reviewer would flag, before they have to.

1. Run `git diff main --name-only` (or the relevant base branch) to see what changed on this branch.
2. For each changed file, read the skill doc(s) that apply:
   - `backend/**` → `skills/backend.md`; also `skills/auth.md` if it touches auth, `skills/database.md` if it touches Prisma/the schema.
   - `frontend/**` → `skills/frontend.md`.
   - `prisma/schema.prisma` or a new migration → `skills/database.md`, and cross-check field/entity names against `docs/db.md` directly (not from memory).
   - `docker-compose.yml`, `Dockerfile`, `terraform/**` → `skills/infra.md`.
3. Check the actual diff against each rule in the relevant file(s) — DTO validation present, controllers thin, no hardcoded colors where a theme token exists, correct entity/field names, migrations not hand-edited, etc.
4. Report findings as a short list: file, the rule it violates, a concrete fix. If nothing's wrong, say so plainly — don't invent issues to look thorough.
5. If a change touches something no skill doc covers, say that explicitly and suggest filing a skill-miss issue rather than guessing at a rule that isn't written down anywhere.

Report only — don't modify files unless the dev explicitly asks you to apply the fixes.
