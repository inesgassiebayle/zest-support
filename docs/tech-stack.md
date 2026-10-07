# Zest — Tecnologías y Arquitectura

## Stack tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend | React + TypeScript + Vite | SPA responsive, mismo lenguaje que el backend |
| Estilos | Tailwind CSS | Rápido de aplicar, sin escribir CSS a mano |
| Backend | Node.js + TypeScript + NestJS | Estructura ordenada, poca curva de aprendizaje |
| ORM | Prisma | Migraciones y queries tipadas contra la DB |
| Base de datos | PostgreSQL | Relacional — encaja con las relaciones many-to-many (ingredientes, labels, colecciones) |
| Imágenes | S3 | No van en la DB, solo se guarda la URL |
| Autenticación | Auth0 | Login, passwords y tokens los maneja Auth0, no nosotros |
| Contenedores | Docker (solo backend) | El backend se empaqueta igual en cualquier entorno; el frontend se buildea nativo en Vercel |
| Hosting | Render (backend) + Vercel (frontend) + Neon (DB) | PaaS gestionado: deploys automáticos y HTTPS sin mantener un servidor propio |

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

## Arquitectura de despliegue

🔗 Diagrama: [ver en Lucidchart](https://lucid.app/lucidchart/b9e47df1-c281-429c-80bd-9d240c7a5e9b/edit) *(dibujado para la opción PaaS anterior con App Runner/RDS — actualizar para reflejar Render/Neon)*

El frontend de producción fue provisionado en **Vercel** mediante ZEST-102: [URL y configuración verificadas del despliegue](./deployments.md).

```
Internet ─▶ Vercel (frontend, HTTPS automático, preview por PR)
         └─▶ Render (backend en contenedor Docker, HTTPS automático)
                    │
              Neon PostgreSQL (serverless, pooled + direct connection)
                    │
              S3 (imágenes, el browser las carga directo vía pre-signed URLs)
```

- **Frontend en Vercel**: build de Vite (`frontend/`, output `dist`). Merge a `main` publica producción; cada PR genera su propio preview URL navegable.
- **Backend en Render**: Web Service Docker (`backend/Dockerfile`). Merge a `main` con CI en verde dispara el deploy automáticamente; `healthCheckPath: /health` evita que una versión caída reemplace a la anterior.
- **Base de datos en Neon**: Postgres serverless con dos connection strings — `DATABASE_URL` (pooled, la usa la app) y `DIRECT_URL` (direct, la usa `prisma migrate`). Las migraciones corren en el `preDeployCommand` de Render antes de rutear tráfico a la versión nueva.
- **Imágenes en S3**: sin cambios — el backend solo entrega pre-signed URLs, nunca proxya los bytes.
- Todo PaaS gestionado: sin EC2, nginx, Terraform ni certbot que mantener a mano. HTTPS automático en ambas plataformas desde el día uno.

Esta fue la decisión original de este documento como "Opción B" (frente a Docker en EC2 con RDS), adoptada finalmente para minimizar la infraestructura que el equipo tiene que operar a mano — con Render en vez de App Runner para el backend. Es una decisión deliberada — no volver a Docker-en-EC2 sin avisar al equipo.

Detalle de implementación (variables de entorno, `render.yaml`, `vercel.json`, permisos de S3) en los tickets ZEST-77 a ZEST-80 de Multica — ver [`skills/multica.md`](../skills/multica.md).

## Archivos del proyecto

- `render.yaml` — configuración del Web Service de backend en Render (build, `preDeployCommand`, health check)
- `frontend/vercel.json` — rewrite de SPA para Vercel (todas las rutas → `/index.html`)
- `.env.example` (backend y frontend) — variables de entorno, sin valores reales
- `README.md` — instrucciones paso a paso de deploy
