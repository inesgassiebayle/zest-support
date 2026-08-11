# Auth — Auth0

## How it works
The browser redirects to Auth0 to log in. Auth0 returns a JWT with a `sub` claim. Nothing about passwords or sessions is handled by our servers — the backend validates every request's JWT against Auth0's public keys (JWKS). `users.auth0_sub` stores that `sub` to link an Auth0 identity to our local user row.

## Frontend
- Use `@auth0/auth0-react` (or the equivalent official SDK) for login/logout/redirect and token retrieval — don't hand-write OAuth redirect handling or manually parse JWTs.
- Don't store access/ID tokens in `localStorage`; let the SDK manage token storage/refresh (it defaults to memory + refresh token rotation).
- Attach the access token to API requests via an `Authorization: Bearer <token>` header, retrieved through the SDK's `getAccessTokenSilently()` (or equivalent) — not a manually cached token.

## Backend
- Validate every protected route's JWT with a guard/middleware that checks the signature against Auth0's JWKS endpoint and verifies `aud`/`iss` claims. Don't skip verification "for now."
- No server-side session store, no password hashing/storage anywhere in this codebase — if you find yourself adding a `password` column or a session table, stop and check with a human first, since that duplicates what Auth0 already does.
- On first request from a new `sub`, create the corresponding `users` row (lazy user creation) rather than requiring a separate signup step, unless the team decides otherwise.

## Never
- Never log full JWTs or Auth0 client secrets.
- Never commit Auth0 domain/client ID *secrets* (the public client ID and domain are fine in frontend config; the client *secret* and API audience keys are not).
