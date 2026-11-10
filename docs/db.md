# Modelo de Base de Datos

Motor: **PostgreSQL**, accedido con **Prisma**.

Este documento describe lo que hay en `backend/prisma/schema.prisma` del repo [`proyecto-zest/zest`](https://github.com/proyecto-zest/zest) (rama `dev`, verificado el 2026-11-10). Si el código y este documento no coinciden, se corrigen los dos en el mismo PR.

## Diagrama (ERD editable)

🔗 [Ver / editar en Lucidchart](https://lucid.app/lucidchart/62182a1e-ddbb-4c8d-bc5d-768f2d1016b0/edit?viewport_loc=-463%2C-154%2C2245%2C1310%2Cpage1&invitationId=inv_df020b47-0193-41b1-9de2-b344beb3679d)

## Entidades

9 tablas: `users`, `recipes`, `recipe_steps`, `ingredients`, `recipe_ingredients`, `recipe_images`, `collections`, `collection_recipes` y `planner_entries`.

Los nombres de columna van en `snake_case` en la base y en `camelCase` en Prisma (`auth0_sub` ↔ `auth0Sub`).

### `users`
Usuarios de la app. La autenticación la maneja Auth0, por eso **no hay campo de contraseña**.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `auth0_sub` | varchar, único | Identificador que devuelve Auth0 (campo `sub` del JWT). Conecta el usuario de Auth0 con el de nuestra DB. |
| `name` | varchar | |
| `email` | varchar, único | |
| `email_verified` | boolean | Default `false`. Viene del claim de Auth0. |
| `avatar_url` | varchar, opcional | |
| `created_at` | timestamp | Default `now()` |
| `updated_at` | timestamp | Se actualiza solo en cada cambio |

### `recipes`
| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `author_id` | uuid (FK → users) | Quién subió la receta. `onDelete: Restrict`: no se puede borrar un usuario con recetas. |
| `title` | varchar | |
| `description` | text | |
| `category` | enum `RecipeCategory` | `DESAYUNO`, `ALMUERZO`, `MERIENDA`, `CENA`, `ENTRADA`, `POSTRE`, `SNACK`, `BEBIDA` |
| `time` | int | Tiempo de preparación, en la unidad de `time_unit` |
| `time_unit` | enum `RecipeTimeUnit` | `MINUTOS`, `HORAS` |
| `difficulty` | enum `RecipeDifficulty` | `FACIL`, `MEDIA`, `DIFICIL` |
| `servings` | int | |
| `created_at` | timestamp | Default `now()`. Ordena el feed. |

### `recipe_steps`
Los pasos de una receta, en tabla aparte para poder ordenarlos.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `recipe_id` | uuid (FK → recipes) | |
| `step_number` | int | Orden del paso |
| `text` | text | |

### `ingredients`
Catálogo de ingredientes (no texto libre dentro de la receta), para poder buscar recetas por ingrediente sin problemas de "tomate" vs "Tomate" vs "tomates". Se carga con datos semilla en las migraciones.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `name` | varchar, único | |

### `recipe_ingredients`
Tabla intermedia: qué ingredientes usa cada receta, con cantidad.

| Campo | Tipo | Notas |
|---|---|---|
| `recipe_id` | uuid (FK → recipes, PK compuesta) | |
| `ingredient_id` | uuid (FK → ingredients, PK compuesta) | |
| `amount` | varchar | Cantidad como texto (ej: `2`, `1/2`). No asumir que se puede parsear como número. |
| `unit` | enum `IngredientUnit` | `SIN_UNIDAD`, `UNIDAD`, `GRAMO`, `KILOGRAMO`, `MILILITRO`, `LITRO`, `CUCHARADITA`, `CUCHARADA`, `TAZA`, `ONZA`, `LIBRA`, `PIZCA`, `DIENTE`, `LATA`, `PAQUETE`, `A_GUSTO` |

### `recipe_images`
Sin orden ni bandera de portada: todas las imágenes de una receta tienen el mismo peso.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `recipe_id` | uuid (FK → recipes) | Indexado: la query principal siempre es "todas las imágenes de esta receta" |
| `s3_key` | varchar | Key del objeto en S3. El backend genera una URL firmada (presigned) para leerla a partir de `AWS_S3_BUCKET`/`AWS_S3_REGION`. No se guarda la URL final. |

### `collections`
Listas de recetas armadas por un usuario (ej: "Postres", "Semana saludable"). Pueden tener recetas propias y de otros usuarios (vía `collection_recipes`). **Es la única forma de "guardar" una receta**: no hay un bookmark aparte.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `owner_id` | uuid (FK → users) | Dueño de la colección. Indexado. `onDelete: Restrict`. |
| `name` | varchar | No es único por usuario (pendiente de decisión del equipo, ver ZEST-89) |
| `cover_image_key` | varchar, opcional | Key en S3 de la portada, mismo criterio que `recipe_images.s3_key` |
| `accent_color` | varchar | |

### `collection_recipes`
Tabla intermedia entre colecciones y recetas. Si se borra la colección o la receta, la fila se borra sola (`onDelete: Cascade`).

| Campo | Tipo |
|---|---|
| `collection_id` | uuid (FK → collections, PK compuesta) |
| `recipe_id` | uuid (FK → recipes, PK compuesta) |

### `planner_entries`
Qué receta cocina un usuario en qué fecha, sin agrupamiento semanal ni distinción de comida (desayuno/almuerzo/cena).

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid (PK) | |
| `user_id` | uuid (FK → users) | `onDelete: Restrict` |
| `recipe_id` | uuid (FK → recipes) | Puede ser propia o de otro usuario. `onDelete: Cascade`: si se borra la receta, desaparece del planner. |
| `date` | date | |
| `quantity` | int | Cantidad que piensa cocinar. Default `1`. Un `CHECK` en la base la limita a 1–100 (migración `20261020130000_constrain_planner_quantity`; Prisma no puede modelar `CHECK`). |

Restricciones: `(user_id, recipe_id, date)` es único (si se agenda la misma receta otra vez el mismo día, se suma a `quantity` en vez de crear otra fila) e índice en `(user_id, date)` para traer la semana.

## Decisiones de diseño

- **Sin `labels` / `recipe_labels`**: se descartaron del alcance actual. La receta tiene una sola `category`.
- **Sin `follows`**: la función de seguir usuarios quedó fuera de esta versión.
- **Sin `weekly_plans`**: el planning no se agrupa por semana. `planner_entries` referencia directamente al usuario y a una fecha puntual.
- **Sin `saved_recipes`**: guardar una receta es agregarla a una colección. No hay una tabla de favoritos aparte.
- **Auditoría mínima**: solo `users` (`created_at`, `updated_at`) y `recipes` (`created_at`, para ordenar el feed). El resto de las tablas no tiene campos de auditoría ni de orden (`position` en imágenes, `added_at` en colecciones). Se pueden agregar con una migración de Prisma sin romper nada.
- **Catálogo separado para ingredientes**: evita duplicar/ensuciar datos y permite búsquedas y filtros confiables por ingrediente.
- **Búsqueda sin tildes**: la extensión `unaccent` de Postgres está habilitada (migraciones `20261019000000_enable_unaccent_search` y `20261020000000_index_accent_search`), así "limon" encuentra "limón".
- **Tablas intermedias** (`recipe_ingredients`, `collection_recipes`) sin `id` propio: su PK es la combinación de las dos FK.
- **Autenticación con Auth0**: no hay tabla ni campo de contraseña. `users.auth0_sub` conecta el usuario de Auth0 con el registro local.
- **Enums para `category`, `difficulty`, `time_unit` y `unit`**: evitan texto libre inconsistente ("facil"/"Facil"/"FACIL") que rompería los filtros de búsqueda (RF-03).
- **`amount` + `unit` separados en `recipe_ingredients`**: la unidad se elige de un selector en vez de escribirse dentro de un string libre.
- **Keys de S3 en vez de URLs** (`recipe_images.s3_key`, `collections.cover_image_key`): no se hardcodea bucket ni región en cada fila, y la URL de lectura se genera en el momento como presigned URL.
