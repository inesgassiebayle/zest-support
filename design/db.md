# Modelo de Base de Datos

Motor: **PostgreSQL**. 

## Diagrama (ERD editable)

🔗 [Ver / editar en Lucidchart](https://lucid.app/lucidchart/86c7ca25-b806-491e-ab7c-cc99829d15a9/edit)

## Entidades

### `users`
Usuarios de la app. La autenticación la maneja Auth0 — por eso **no hay campo de contraseña**.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `auth0_sub` | varchar | Identificador único que devuelve Auth0 (campo `sub` del JWT). Conecta el usuario de Auth0 con el usuario de nuestra DB. |
| `username` | varchar | |
| `email` | varchar | |
| `avatar_url` | varchar | |

### `recipes`
| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid (FK → users) | Quién subió la receta |
| `name` | varchar | |
| `prep_time_minutes` | int | Tiempo de preparación |

### `recipe_steps`
Los pasos de una receta, en tabla aparte para poder ordenarlos.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `recipe_id` | uuid (FK → recipes) | |
| `step_number` | int | Orden del paso |
| `description` | text | |

### `ingredients`
Catálogo de ingredientes (no texto libre dentro de la receta), para poder buscar recetas por ingrediente sin problemas de "tomate" vs "Tomate" vs "tomates".

| Campo | Tipo |
|---|---|
| `id` | uuid (PK) |
| `name` | varchar |

### `recipe_ingredients`
Tabla intermedia: qué ingredientes usa cada receta, con cantidad y unidad.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `recipe_id` | uuid (FK → recipes) | |
| `ingredient_id` | uuid (FK → ingredients) | |
| `quantity` | decimal | |
| `unit` | varchar | Ej: "g", "ml", "unidades" |

### `labels`
Catálogo de etiquetas ("vegano", "rápido", "sin gluten", etc).

| Campo | Tipo |
|---|---|
| `id` | uuid (PK) |
| `name` | varchar |

### `recipe_labels`
Tabla intermedia: relación muchos-a-muchos entre recetas y labels.

| Campo | Tipo |
|---|---|
| `recipe_id` | uuid (FK → recipes, PK compuesta) |
| `label_id` | uuid (FK → labels, PK compuesta) |

### `recipe_images`
| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `recipe_id` | uuid (FK → recipes) | |
| `image_url` | varchar | URL al objeto en S3 (la imagen no se guarda en la DB) |
| `position` | int | Orden de la imagen |
| `is_cover` | boolean | Si es la imagen principal |

### `collections`
Listas de recetas armadas por un usuario (ej: "Postres", "Semana saludable").

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid (FK → users) | Dueño de la colección |
| `name` | varchar | |
| `description` | text | |
| `image_url` | varchar (nullable) | Opcional |

### `collection_recipes`
Tabla intermedia. Permite guardar en una colección tanto recetas propias como de otros usuarios.

| Campo | Tipo |
|---|---|
| `collection_id` | uuid (FK → collections, PK compuesta) |
| `recipe_id` | uuid (FK → recipes, PK compuesta) |

### `weekly_plans`
Cada usuario puede tener varios plannings, uno por semana.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid (FK → users) | |
| `week_start_date` | date | Fecha de inicio de esa semana |

### `planning_entries`
Qué receta va en qué día de un planning, y cuántas porciones.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `weekly_plan_id` | uuid (FK → weekly_plans) | |
| `day_of_week` | int (0-6) | |
| `recipe_id` | uuid (FK → recipes) | Puede ser propia o de otro usuario |
| `servings` | int | Cantidad que piensa cocinar |

### `follows`
Modela que un usuario siga a otro.

| Campo | Tipo |
|---|---|
| `follower_id` | uuid (FK → users, PK compuesta) |
| `followed_id` | uuid (FK → users, PK compuesta) |

## Decisiones de diseño

- **Sin campos de auditoría** (`created_at`/`updated_at`): se dejaron afuera para mantener el modelo simple. Se pueden agregar en cualquier momento con una migración de Prisma sin romper nada de lo existente.
- **Catálogos separados para ingredientes y labels**: evita duplicar/ensuciar datos y permite búsquedas y filtros confiables.
- **Tablas intermedias** (`recipe_ingredients`, `recipe_labels`, `collection_recipes`) para todas las relaciones muchos-a-muchos — patrón estándar en bases relacionales.