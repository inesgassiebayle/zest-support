# Frontend — React + TypeScript + Vite + Tailwind

## Follow the design — before writing any UI
- [`../design/`](../design) is where the design system and wireframes for Zest live — check it before building any screen or component. It's not optional context, it's the spec for what you're building.
- Match what's there: layout, spacing, colors, typography, and component patterns (buttons, cards, form fields, etc.) should come from the design system, not be improvised in code.
- If a screen, state (empty/error/loading), or component isn't covered by the design docs yet, flag it to whoever owns design before shipping a freehand version — don't guess at a look that will likely need to be redone once the real design lands.
- Before building a new UI pattern (another button style, another card layout), check whether an existing component in `components/` already covers it. Reuse it instead of creating a near-duplicate.
- Tailwind's theme config (`tailwind.config.*`) should mirror the design system's tokens (colors, spacing scale, font sizes) once those exist. Prefer theme values (`bg-primary`, `text-lg`) over arbitrary one-off values (`bg-[#3a3a3a]`, `text-[13px]`) so the UI can't silently drift from the design system component by component.

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
- Type request/response shapes to match the backend DTOs (see [`../design/db.md`](../design/db.md) for entity fields).
- Handle loading/error states explicitly; don't silently swallow failed requests.

## Auth
- Use the official Auth0 React SDK (`@auth0/auth0-react`) for login/logout/session — don't hand-roll token storage or refresh logic. Details: [`auth.md`](./auth.md).

## Image uploads
- Images go straight to the S3 bucket, not through the backend as file bytes: request a pre-signed upload URL from the backend, `PUT` the file to that URL directly, then send the resulting object URL to the backend to persist as a `recipe_images` row. See [`backend.md`](./backend.md#images-s3).

## General
- TypeScript strict mode on. Fix type errors, don't suppress them with `@ts-ignore` unless there's a documented reason.
- No unused imports/variables — clean up before committing.
