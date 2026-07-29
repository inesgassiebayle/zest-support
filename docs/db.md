# Modelo de Base de Datos

Motor: **PostgreSQL**.

## Diagrama (ERD editable)

🔗 [Ver / editar en Lucidchart](https://lucid.app/lucidchart/62182a1e-ddbb-4c8d-bc5d-768f2d1016b0/edit?viewport_loc=-463%2C-154%2C2245%2C1310%2Cpage1&invitationId=inv_df020b47-0193-41b1-9de2-b344beb3679d)

## Entidades

### `users`
Usuarios de la app. La autenticación la maneja Auth0 — por eso **no hay campo de contraseña**.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `auth0_sub` | varchar | Identificador único que devuelve Auth0 (campo `sub` del JWT). Conecta el usuario de Auth0 con el usuario de nuestra DB. |
| `name` | varchar | |
| `email` | varchar | |
| `avatar_url` | varchar | |

### `recipes`
| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `author_id` | uuid (FK → users) | Quién subió la receta |
| `title` | varchar | |
| `description` | text | |
| `category` | varchar | |
| `time` | int | Tiempo de preparación (minutos) |
| `difficulty` | varchar | |
| `servings` | int | |

### `recipe_steps`
Los pasos de una receta, en tabla aparte para poder ordenarlos.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `recipe_id` | uuid (FK → recipes) | |
| `step_number` | int | Orden del paso |
| `text` | text | |

### `ingredients`
Catálogo de ingredientes (no texto libre dentro de la receta), para poder buscar recetas por ingrediente sin problemas de "tomate" vs "Tomate" vs "tomates".

| Campo | Tipo |
|---|---|
| `id` | uuid (PK) |
| `name` | varchar |

### `recipe_ingredients`
Tabla intermedia: qué ingredientes usa cada receta, con cantidad.

| Campo | Tipo | Notas |
|---|---|---|
| `recipe_id` | uuid (FK → recipes, PK compuesta) | |
| `ingredient_id` | uuid (FK → ingredients, PK compuesta) | |
| `amount` | varchar | |

### `recipe_images`
Sin orden ni bandera de portada — todas las imágenes de una receta tienen el mismo peso.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `recipe_id` | uuid (FK → recipes) | |
| `image_url` | varchar | URL al objeto en S3 (la imagen no se guarda en la DB) |

### `collections`
Listas de recetas armadas por un usuario (ej: "Postres", "Semana saludable"). Permite guardar tanto recetas propias como de otros usuarios (vía `collection_recipes`).

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `owner_id` | uuid (FK → users) | Dueño de la colección |
| `name` | varchar | |
| `cover_image_url` | varchar | |
| `accent_color` | varchar | |

### `collection_recipes`
Tabla intermedia entre colecciones y recetas.

| Campo | Tipo |
|---|---|
| `collection_id` | uuid (FK → collections, PK compuesta) |
| `recipe_id` | uuid (FK → recipes, PK compuesta) |

### `saved_recipes`
Recetas que un usuario guardó/marcó como favoritas (bookmark), independiente de las colecciones.

| Campo | Tipo |
|---|---|
| `user_id` | uuid (FK → users, PK compuesta) |
| `recipe_id` | uuid (FK → recipes, PK compuesta) |

### `planner_entries`
Qué receta cocina un usuario en qué fecha, sin agrupamiento semanal ni distinción de comida (desayuno/almuerzo/cena).

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid (FK → users) | |
| `recipe_id` | uuid (FK → recipes) | Puede ser propia o de otro usuario |
| `date` | date | |
| `quantity` | int | Cantidad que piensa cocinar |

## Decisiones de diseño

- **Sin campos de auditoría** (`created_at`/`updated_at`) en ninguna entidad, ni tampoco campos de orden (`position` en imágenes, `added_at` en colecciones). Se dejaron afuera para mantener el modelo simple. Se pueden agregar en cualquier momento con una migración de Prisma sin romper nada de lo existente.
- **Sin `labels` / `recipe_labels`**: se descartaron del alcance actual.
- **Sin `follows`**: la función de seguir usuarios quedó fuera de esta versión.
- **Sin `weekly_plans`**: el planning ya no se agrupa por semana — `planner_entries` referencia directamente al usuario y a una fecha puntual.
- **Catálogo separado para ingredientes**: evita duplicar/ensuciar datos y permite búsquedas y filtros confiables por ingrediente.
- **Tablas intermedias** (`recipe_ingredients`, `collection_recipes`, `saved_recipes`) para todas las relaciones muchos-a-muchos — patrón estándar en bases relacionales.
- **Autenticación con Auth0**: no hay tabla ni campo de contraseña; `users.auth0_sub` conecta el usuario de Auth0 con el registro local.