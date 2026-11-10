# Database — PostgreSQL + Prisma

## Source of truth
[`../docs/db.md`](../docs/db.md) is the schema spec — 9 entities: `users`, `recipes`, `recipe_steps`, `ingredients`, `recipe_ingredients`, `recipe_images`, `collections`, `collection_recipes`, `planner_entries`. It mirrors `backend/prisma/schema.prisma`; [`../docs/tech-stack.md`](../docs/tech-stack.md) only summarizes it. If code and that doc disagree, fix the doc and the code together in the same PR — don't let them drift.

## Explicitly out of scope (don't build these)
- **No `labels`/`recipe_labels`** — dropped. Recipes have a single `category` field, not a many-to-many tag system. The design mockups show recipe "tags" (e.g. "Vegan", "Gluten-free") as UI chips — those aren't backed by a table; don't wire up a labels CRUD/filter feature for them without checking with the team first, since the schema was deliberately simplified to drop this.
- **No `follows`** — following other users is out of scope for this version. Don't add a follow/unfollow feature or a followers list.
- **No `weekly_plans`** — planning isn't grouped by week anymore. `planner_entries` links a user directly to a recipe on a specific `date`, with no week-grouping entity above it.
- **No `saved_recipes`** — there's no separate bookmark table. Saving a recipe means adding it to a collection (`collection_recipes`).
- **Minimal audit columns** — only `users` (`created_at`, `updated_at`) and `recipes` (`created_at`, which orders the feed). No other table has them, and there are no ordering columns (`recipe_images` has no `position`, `collections`/`collection_recipes` have no `added_at`) — kept out on purpose to stay simple. Add them later as an additive Prisma migration if actually needed; don't treat their absence as a bug.

## Conventions
- `uuid` for every primary/foreign key — never auto-increment ints.
- Entity tables (`users`, `recipes`, `recipe_steps`, `ingredients`, `recipe_images`, `collections`, `planner_entries`) each have their own surrogate `id`.
- Pure join tables (`recipe_ingredients`, `collection_recipes`) have **no separate `id`** — their primary key is the composite of the two FK columns. Don't bolt a surrogate `id` onto these.
- `recipe_ingredients.amount` is a free-text `varchar` (e.g. "2", "1/4") and the unit lives in a separate `unit` enum (`IngredientUnit`). Don't assume `amount` is parseable as a number.
- `recipe_images` carries no ordering or "is cover" flag — every image for a recipe has equal weight. If the UI needs a hero/cover image, it has to pick one at render time (e.g. first uploaded), not read a flag that doesn't exist.
- Catalog table for `ingredients` is separate from free text specifically so search/filter stays reliable — don't reintroduce free-text ingredient fields on `recipes`.
- No `password` field on `users` — Auth0 owns authentication. `auth0_sub` is the link between an Auth0 identity and the local user row.

## Migrations
- Every schema change is a Prisma migration (`prisma migrate dev --name <description>`), committed alongside the code that needs it.
- Never edit a migration that's already been applied/merged — create a new one instead.
- Migration names should describe the change (`add_recipe_prep_time`, not `update1`).

## Queries
- Prefer Prisma's relation includes/filters over N+1 loops in application code.
- `planner_entries.recipe_id` can point to a recipe authored by a different user than `planner_entries.user_id` — don't add a constraint requiring them to match.
