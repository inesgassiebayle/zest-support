# Infra — Docker + Terraform

## Current decision
Option A from [`../docs/tech-stack.md`](../docs/tech-stack.md): a single EC2 instance running `docker compose` (nginx reverse proxy + TLS, frontend container, backend container), RDS PostgreSQL in a private subnet, S3 for images. Don't switch to the PaaS alternative (Vercel + App Runner) without checking with the team — it's a documented, deliberate tradeoff, not an oversight.

## Docker
- One `Dockerfile` per service (frontend, backend), multi-stage builds so the final image doesn't ship build tools/dev dependencies.
- Local dev should use `docker-compose` mirroring the prod topology (nginx + frontend + backend + db) so "works on my machine" actually means something.
- `.env.example` stays in git with placeholder values; real `.env` files never get committed.

## Terraform
- Infra changes go through Terraform, not manual changes in the AWS console. If someone changes something by hand, reconcile it back into Terraform (`terraform plan` should show no drift) as soon as possible.
- Always run `terraform plan` and read the diff before `terraform apply` — especially for anything touching RDS or security groups.
- Secrets (DB passwords, Auth0 keys) go through a secrets mechanism (e.g. `.tfvars` excluded from git, or a secrets manager) — never hardcoded in `.tf` files.

## Object storage (S3)
- One bucket per environment (e.g. `zest-images-dev`, `zest-images-prod`) — don't share a bucket across environments.
- The backend only ever hands out pre-signed URLs; it doesn't proxy file bytes. See [`backend.md`](./backend.md#images-s3).
- Bucket policy should block public write, and only allow public (or CDN-fronted) read for object keys the app actually generated — don't make the whole bucket world-writable to work around CORS issues.

## Deploy
- Deploy is `git pull` + `docker compose up -d --build` over SSH on the EC2 box (per the current architecture decision). Don't introduce a different deploy mechanism (e.g. a CI/CD pipeline to a different target) without updating `docs/tech-stack.md` to match.
- HTTPS via Let's Encrypt/Certbot, auto-renewed — don't disable TLS or fall back to plain HTTP, including for "quick testing" on the shared server.
