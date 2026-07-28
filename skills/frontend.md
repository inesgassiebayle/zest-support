# Frontend — React + TypeScript + Vite + Tailwind

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

## General
- TypeScript strict mode on. Fix type errors, don't suppress them with `@ts-ignore` unless there's a documented reason.
- No unused imports/variables — clean up before committing.
