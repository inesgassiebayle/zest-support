# Frontend — React + TypeScript + Vite + Tailwind

## Follow the design — before writing any UI
[`../design/`](../design) has two things, both authoritative — check them before building any screen or component. This is not optional context, it's the spec.

- **[`design/zest/Zest.dc.html`](../design/zest/Zest.dc.html)** — a single-file interactive prototype covering the full app: auth, feed, recipe detail, create recipe, collections grid + detail, meal planner, and modals (edit profile, save to collection, add recipe to collection, create collection, recipe picker). Open it in a browser and click through it before building the equivalent screen — copy its layout, states, and text, don't improvise a different version.
- **[`design/uploads/zest-wireframe-design/`](../design/uploads/zest-wireframe-design)** — a coded reference implementation (Next.js + TypeScript + Tailwind v4 + shadcn/ui) with real component code (`components/recipe-card.tsx`, `components/feed.tsx`, `components/planner.tsx`, `components/ui/button.tsx`, etc.) and mock data (`lib/data.ts`) shaped close to the real schema. It's **Next.js (App Router)**, not Vite — don't copy Next-only APIs (`next/image`, `next/link`, server components) into the app, but do carry over the component breakdown, Tailwind classes, and styling logic directly.

### Design tokens (from `design/uploads/zest-wireframe-design/app/globals.css`, matches the prototype)
- Palette ("Citrus"): primary `#e8415a` (grapefruit), `#f2735a` (coral), `#f5c842` (lemon/accent), `#7dc242` (lime). Background `#faf7f2`, foreground `#2c2c2c`, card `#ffffff`, secondary `#f5efe5`, muted `#f1ebe0`/`#7a756c`, border/input `#e7e0d3`.
- Fonts: **Playfair Display** (serif) for headings/logo, **Geist** (sans) for body text, **Geist Mono** for anything numeric/tabular.
- Radius: pill (`9999px`) for buttons, avatars, and badges; a `--radius: 0.75rem` base scale (sm/md/lg/xl/2xl/3xl/4xl multiples of it) for cards and modals.
- A dark mode palette is already defined in that file — if dark mode gets built, use those values rather than inventing new ones.
- Set these up as Tailwind theme values (mirroring the `@theme`/CSS custom properties in `globals.css`), and use them (`bg-primary`, `text-foreground`) instead of arbitrary one-off values (`bg-[#3a3a3a]`, `text-[13px]`).

### Known discrepancies — don't silently pick one, ask
- The prototype's mobile nav comment says the bottom tab bar was **removed in favor of a top menu drawer**, but the coded reference app still has a working `components/bottom-nav.tsx`. These two design artifacts disagree — check with whoever owns design before building either, and [file a skill-miss](./README.md#reporting-a-miss) if it's still unresolved when you get there.
- The prototype and mock data show recipe "tags" (e.g. "Vegan", "Gluten-free") as UI chips, but `docs/db.md` explicitly dropped `labels`/`recipe_labels` from the schema — see [`database.md`](./database.md#explicitly-out-of-scope-dont-build-these). Don't build a tags feature backed by a real table without confirming that's actually back in scope.

### General
- If a screen, state (empty/error/loading), or component genuinely isn't covered by either design artifact, flag it to whoever owns design before shipping a freehand version — don't guess at a look that will likely need to be redone.
- Before building a new UI pattern (another button style, another card layout), check whether an existing component already covers it — in the coded reference, or already built in this app's `components/`. Reuse it instead of creating a near-duplicate.

## Components
- Function components with hooks only — no class components.
- One component per file, `PascalCase.tsx` filename matching the component name.
- Keep components small: if a component mixes data-fetching, business logic, and layout, split it (e.g. a hook for data, a presentational component for layout).
- Props get an explicit `interface` or `type`, never `any`.

## Structure (suggested, adjust as the team settles on one)
```
src/
  components/   # reusable, presentational
  pages/        # route-level components
  hooks/        # custom hooks (useRecipes, useAuth, ...)
  services/     # API client calls, one file per backend resource
  types/        # shared TS types/interfaces (mirror backend DTOs where possible)
```

## Styling
- Tailwind utility classes directly in JSX. Don't hand-write CSS files unless Tailwind genuinely can't express something.
- If the same utility combo shows up 3+ times, extract it into a component — not a `@apply` class.

## API calls
- Centralize all HTTP calls in `services/` — no `fetch`/`axios` calls scattered inside components.
- Type request/response shapes to match the backend DTOs (see [`../docs/db.md`](../docs/db.md) for entity fields).
- Handle loading/error states explicitly; don't silently swallow failed requests.

## Auth
- Use the official Auth0 React SDK (`@auth0/auth0-react`) for login/logout/session — don't hand-roll token storage or refresh logic. Details: [`auth.md`](./auth.md).

## Image uploads
- Images go straight to the S3 bucket, not through the backend as file bytes: request a pre-signed upload URL from the backend, `PUT` the file to that URL directly, then send the resulting object URL to the backend to persist as a `recipe_images` row. See [`backend.md`](./backend.md#images-s3).

## General
- TypeScript strict mode on. Fix type errors, don't suppress them with `@ts-ignore` unless there's a documented reason.
- No unused imports/variables — clean up before committing.
