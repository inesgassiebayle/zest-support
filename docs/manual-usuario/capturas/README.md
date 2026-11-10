# Capturas del manual

Todas se sacan de **producción** (https://zest-frontend-five.vercel.app), así cumplen el criterio de ZEST-140. Guardalas en esta carpeta con el nombre exacto de la tabla: el manual ya las referencia y aparecen solas al subirlas.

Recomendaciones:
- Ventana de escritorio de unos 1280 px de ancho, en PNG.
- Usá una cuenta demo con al menos dos recetas propias (con foto) y una colección con recetas, para que las pantallas no se vean vacías.
- No captures datos personales reales: ni emails de otras personas ni nombres de usuarios reales.

| Archivo | Pantalla | Qué tiene que verse |
|---|---|---|
| `01-registro.png` | `/signup` sin sesión | Pantalla "Create your account" con el botón "Sign up" |
| `02-login.png` | `/login` sin sesión | Pantalla "Log in" |
| `03-barra-superior.png` | Cualquier pantalla con sesión | Recorte de la barra: logo, "Feed", "Collections", "New recipe" y el avatar con el menú abierto ("Edit profile" / "Log out") |
| `04-feed.png` | `/` | Feed "Discover" con el buscador, los filtros y varias tarjetas |
| `05-filtro-ingredientes.png` | `/` | Filtro de ingredientes abierto con uno o dos marcados |
| `06-detalle-receta.png` | `/recipes/:id` | Receta con foto, autor, datos (Time, Level, Servings), ingredientes y pasos |
| `07-crear-receta.png` | `/recipes/new` | Formulario completo con foto, al menos dos ingredientes y dos pasos, antes de "Publish" |
| `08-crear-receta-errores.png` | `/recipes/new` | El cartel "Please fix the following" con algún error (por ejemplo, sin título) |
| `09-tarjeta-propia.png` | `/` o perfil | Recorte de una tarjeta propia con los íconos de editar y eliminar |
| `10-eliminar-receta.png` | Cualquier lista | El cartel "Delete recipe?" abierto (cancelalo después) |
| `11-nueva-coleccion.png` | `/collections` | La ventana de "New collection" con nombre y color elegidos |
| `12-guardar-en-coleccion.png` | `/recipes/:id` | La ventana "Save to collection" con una colección marcada |
| `13-detalle-coleccion.png` | `/collections/:id` | Colección con nombre, cantidad de recetas, "Add recipes" y tarjetas |
| `14-perfil.png` | `/profile` | Perfil propio en la pestaña "My recipes" |
| `15-perfil-settings.png` | `/profile` | Pestaña "Settings" con "Save name" y "Change password" |

El planificador semanal no tiene captura porque todavía no está en producción (ver la sección 9 del manual).
