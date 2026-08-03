# Backend — Node.js + TypeScript + NestJS + Prisma

## Module structure
- One NestJS module per resource, mirroring the entities in [`../docs/db.md`](../docs/db.md): `users`, `recipes` (with nested `recipe_steps`/`recipe_ingredients`/`recipe_images`), `ingredients`, `collections` (with nested `collection_recipes`), `saved-recipes`, `planner-entries`.
- There's no `labels`, `follows`, or `weekly-plans` module — those entities were cut from scope. See [`database.md`](./database.md#explicitly-out-of-scope-dont-build-these) before adding anything that resembles them.
- Each module: `*.controller.ts` (routes only), `*.service.ts` (business logic), `*.module.ts`, `dto/` (request/response shapes).
- Controllers stay thin — no Prisma calls or business logic directly in a controller method. That belongs in the service.

## Validation
- Every incoming request body gets a DTO class with `class-validator` decorators (`@IsString()`, `@IsUUID()`, etc.). Never trust `req.body` untyped.
- Use Nest's global `ValidationPipe` (whitelist + forbid non-whitelisted properties) so unexpected fields are rejected, not silently accepted.

## Prisma
- Schema changes go through `prisma migrate dev` — never edit the database by hand, never edit an already-applied migration file.
- Use Prisma's generated types (`Prisma.RecipeCreateInput`, etc.) instead of hand-written interfaces for anything that touches the DB.
- Keep query logic in services, not controllers. For anything beyond a simple query, prefer Prisma's relation filters over multiple round-trips.
- Table/column names and relationships must match [`../docs/db.md`](../docs/db.md) — that file is the source of truth, not the other way around.

## Auth
- JWT validation via a Nest guard that checks tokens against Auth0's JWKS endpoint. No passwords, no server-side sessions. Details: [`auth.md`](./auth.md).
- `users.auth0_sub` is how a validated token maps to an internal user row — look the user up by that field, don't assume `sub` is a local UUID.

## Images (S3)
- Images never touch the database as binary data — `recipe_images.image_url` stores only the URL, per [`../docs/db.md`](../docs/db.md).
- Don't stream file uploads through the NestJS server. Have the backend issue a pre-signed S3 upload URL, let the client (frontend) upload the file bytes directly to the bucket, then have the client send the resulting object URL to the backend to save as a `recipe_images` row.
- `recipe_images` has no `position` or `is_cover` column — every image for a recipe is equal weight. Don't add ordering/cover logic on the backend unless the schema is extended for it first.

## Errors & responses
- Use Nest's built-in `HttpException` subclasses (`NotFoundException`, `BadRequestException`, etc.) instead of throwing raw errors or returning ad-hoc error objects.
- Consistent response shapes across endpoints — don't mix "return the entity directly" and "return `{ data: entity }`" across different controllers.

## Config & secrets
- All config (DB URL, Auth0 domain/audience, S3 bucket, etc.) via `@nestjs/config` reading from `.env`. Never hardcode credentials or commit `.env`.
