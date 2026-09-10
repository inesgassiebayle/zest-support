# Infra — Render + Vercel + Neon

## Current decision
Backend en **Render** (Web Service Docker), frontend en **Vercel**, base de datos en **Neon** (Postgres serverless), imágenes en **S3**. Ver [`../docs/tech-stack.md`](../docs/tech-stack.md) para el diagrama y el porqué. Don't switch back to a self-managed EC2 box (or introduce Terraform) without checking with the team — moving off that option was a deliberate call, not an oversight.

## Docker
- Backend only: one multi-stage `Dockerfile` (`backend/Dockerfile`) — Render builds and runs it directly, no docker-compose in prod. The frontend builds natively on Vercel, no Dockerfile needed there.
- Local dev still uses `docker-compose` (backend + postgres) so "works on my machine" actually means something — see [`backend.md`](./backend.md).
- `.env.example` stays in git with placeholder values; real `.env` files never get committed.

## Database (Neon)
- Two connection strings: `DATABASE_URL` (pooled, used by the running app) and `DIRECT_URL` (direct, used only for `prisma migrate`) — set both `url` and `directUrl` in `schema.prisma`.
- Migrations run automatically via Render's `preDeployCommand` (`prisma migrate deploy`) before traffic is routed to the new version. Never run migrations by hand against prod.

## Object storage (S3)
- One bucket per environment (e.g. `zest-images-dev`, `zest-images-prod`) — don't share a bucket across environments.
- The backend only ever hands out pre-signed URLs; it doesn't proxy file bytes. See [`backend.md`](./backend.md#images-s3).
- Bucket policy should block public write, and only allow public (or CDN-fronted) read for object keys the app actually generated. The IAM user needs `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject`, `s3:HeadObject` on the object keys **and** `s3:ListBucket` on the bucket itself — without `ListBucket`, a `HeadObject` on a missing key returns 403 instead of 404 and the backend turns that into a 500.

## Deploy
- **Backend (Render)**: push to `main` with CI green → Render builds `backend/Dockerfile` and deploys automatically (`render.yaml`, "wait for CI to pass before deploying"). `healthCheckPath: /health` — a deploy that leaves `/health` down doesn't replace the previous version.
- **Frontend (Vercel)**: push to `main` → production deploy; every PR gets its own preview URL. `frontend/vercel.json` rewrites all routes to `/index.html` so deep-linked routes don't 404 on refresh.
- HTTPS is automatic on both platforms — no certs to manage, no Let's Encrypt/Certbot.
- Don't introduce a different deploy mechanism (e.g. a manual SSH/`docker compose up` step) without updating `docs/tech-stack.md` to match.
- Full setup checklist lives in the Multica tickets ZEST-77 through ZEST-80 — see [`multica.md`](./multica.md) before re-provisioning something from scratch.
