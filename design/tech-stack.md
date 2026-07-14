# Zest — Tecnologías y Arquitectura

## Stack tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend | React + TypeScript + Vite | SPA responsive, mismo lenguaje que el backend |
| Estilos | Tailwind CSS | Rápido de aplicar, sin escribir CSS a mano |
| Backend | Node.js + TypeScript + NestJS | Estructura ordenada, poca curva de aprendizaje |
| ORM | Prisma | Migraciones y queries tipadas contra la DB |
| Base de datos | PostgreSQL | Relacional — encaja con las relaciones many-to-many (ingredientes, labels, colecciones) |
| Imágenes | Bucket de object storage (S3 o equivalente) | No van en la DB, solo se guarda la URL |
| Autenticación | Auth0 | Login, passwords y tokens los maneja Auth0, no nosotros |
| Contenedores | Docker | Empaqueta frontend y backend igual en cualquier entorno |

## Autenticación (Auth0)

El browser redirige a Auth0 para loguearse. Auth0 devuelve un JWT con un campo `sub` (identificador único del usuario). El backend valida ese JWT contra las claves públicas de Auth0 (JWKS) en cada request — no se guardan passwords ni sesiones en nuestro servidor. La tabla `users` guarda `auth0_sub` como referencia a esa identidad externa.

## Base de datos — resumen del modelo

13 entidades: `users`, `recipes`, `recipe_steps`, `ingredients`, `recipe_ingredients`, `labels`, `recipe_labels`, `recipe_images`, `collections`, `collection_recipes`, `weekly_plans`, `planning_entries`, `follows`.

Puntos clave del diseño:
- **Ingredientes y labels** son catálogos separados (no texto libre dentro de la receta) para poder buscar y filtrar de forma confiable.
- **Tablas intermedias** (`recipe_ingredients`, `recipe_labels`, `collection_recipes`) resuelven las relaciones muchos-a-muchos.
- **`collection_recipes`** permite guardar en una colección tanto recetas propias como de otros usuarios.
- **`follows`** modela seguir a otros usuarios (follower/followed, ambos apuntando a `users`).
- **`weekly_plans` + `planning_entries`**: cada usuario tiene varios plannings (uno por semana), y cada entrada asigna una receta a un día con una cantidad de porciones.
- Sin campos de auditoría (`created_at`/`updated_at`) para mantenerlo simple — se pueden agregar después sin romper nada.

🔗 Diagrama editable (ERD): [ver en Lucidchart](https://lucid.app/lucidchart/86c7ca25-b806-491e-ab7c-cc99829d15a9/edit) — más detalle en [`docs/database/modelo.md`](./database/modelo.md)

## Dos alternativas de arquitectura

### Opción A — Docker en EC2 (la elegida)

🔗 Diagrama: [ver en Lucidchart](https://lucid.app/lucidchart/b06b157d-6290-49b0-a5c4-c00cb6b7a74a/edit)

```
Internet ─▶ EC2 (nginx: reverse proxy + TLS) ─▶ contenedor frontend (React)
                                              └─▶ contenedor backend (NestJS)
                                                        │
                                                  RDS PostgreSQL (privada)
                                                        │
                                                  S3 (imágenes)
```

- Un solo servidor EC2 corriendo `docker compose`: nginx + frontend + backend.
- HTTPS con Let's Encrypt/Certbot, renovado automáticamente.
- Base de datos RDS en subnet privada, solo accesible desde el backend.
- **Usa los créditos de estudiante de AWS/Azure.**
- Requiere que el equipo entienda Docker, nginx y un poco de Linux/redes.
- Todo el código de Terraform + `docker-compose.yml` + `nginx.conf` ya está armado.

### Opción B — PaaS híbrido (Vercel + App Runner)

🔗 Diagrama: [ver en Lucidchart](https://lucid.app/lucidchart/b9e47df1-c281-429c-80bd-9d240c7a5e9b/edit)

```
Internet ─▶ Vercel (frontend, HTTPS automático)
         └─▶ AWS App Runner (backend en contenedor, HTTPS automático)
                    │
              RDS PostgreSQL (privada)
                    │
              S3 (imágenes, el browser las carga directo)
```

- El frontend se despliega en Vercel (plan Hobby, gratis para uso no comercial, sin límite de tiempo — solo límites de uso mensual).
- El backend corre en AWS App Runner: mismo Dockerfile que la Opción A, pero sin EC2, nginx ni certbot — AWS maneja el HTTPS y el deploy.
- La base de datos y el bucket S3 son los mismos que en la Opción A.
- **El backend sigue consumiendo créditos de AWS**, pero el frontend queda afuera (gratis en Vercel).
- Mucho menos mantenimiento de infraestructura: no hay servidor que administrar.

### Comparación rápida

| | A: Docker en EC2 | B: PaaS híbrido |
|---|---|---|
| Setup inicial | Terraform + Docker + nginx + certbot | Conectar repo a Vercel + App Runner |
| HTTPS | Manual (Let's Encrypt) | Automático |
| Deploy | `git pull` + `docker compose up` por SSH | Push a `main` → deploy automático |
| Créditos usados | Todo (frontend + backend + DB) | Solo backend + DB |
| Aprendizaje de infra | Alto (Docker, nginx, Linux) | Bajo |

**Decisión actual: Opción A (Docker en EC2)**, ya que es la que más aprovecha los créditos de estudiante y le da al equipo experiencia real con Docker e infraestructura.

## Archivos del proyecto

- `terraform/` — infraestructura como código (VPC, EC2, RDS, S3, security groups)
- `app/docker-compose.yml` — orquesta frontend, backend, nginx y certbot
- `app/nginx.conf` — reverse proxy + TLS
- `app/.env.example` — variables de entorno del backend
- `README.md` — instrucciones paso a paso de deploy