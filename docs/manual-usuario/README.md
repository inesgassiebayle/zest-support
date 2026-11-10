# Manual de usuario de Zest

Zest es una app de recetas: publicás tus recetas con ingredientes, pasos y foto, buscás recetas de otros usuarios y guardás las que te gustan en colecciones.

- **Dirección de la app:** https://zest-frontend-five.vercel.app
- **Versión descrita:** la que está en producción (rama `main` de `proyecto-zest/zest`, commit `16ef3e8`), revisada el 10/11/2026.
- **Idioma de la app:** las pantallas están en inglés. En este manual los botones y textos aparecen entre comillas tal como se ven en la app, por ejemplo "Publish".

> Funciona en computadora y en celular. En celular, el menú de arriba se reemplaza por el ícono ☰, que abre las mismas opciones.

## Índice

1. [Registrarse e iniciar sesión](#1-registrarse-e-iniciar-sesión)
2. [Moverse por la app](#2-moverse-por-la-app)
3. [Buscar recetas](#3-buscar-recetas)
4. [Ver una receta](#4-ver-una-receta)
5. [Crear una receta](#5-crear-una-receta)
6. [Editar y eliminar tus recetas](#6-editar-y-eliminar-tus-recetas)
7. [Colecciones](#7-colecciones)
8. [Perfil](#8-perfil)
9. [Planificador semanal](#9-planificador-semanal)
10. [Problemas frecuentes](#10-problemas-frecuentes)

---

## 1. Registrarse e iniciar sesión

Para usar Zest necesitás una cuenta. Sin sesión iniciada solo se ven las pantallas de ingreso y registro.

### Crear una cuenta

1. Entrá a https://zest-frontend-five.vercel.app. Si no tenés sesión, la app te lleva a la pantalla de ingreso.
2. Abajo del botón, hacé clic en "Sign up". Se abre la pantalla "Create your account".
3. Hacé clic en "Sign up". Te lleva a la página de registro de Auth0, el servicio que maneja las cuentas y contraseñas de Zest.
4. Completá tu email y una contraseña y confirmá.
5. Al terminar, volvés a Zest con la sesión iniciada y ves el feed.

![Pantalla "Create your account"](./capturas/01-registro.png)

### Iniciar sesión

1. En la pantalla "Log in", hacé clic en "Log in".
2. En la página de Auth0, ingresá tu email y contraseña.
3. Volvés a Zest con la sesión iniciada.

![Pantalla "Log in"](./capturas/02-login.png)

> Zest nunca ve ni guarda tu contraseña: la maneja Auth0. Por eso, para cambiarla hay que pedir un email de cambio de contraseña (ver [Perfil](#8-perfil)).

### Cerrar sesión

Hacé clic en tu avatar (arriba a la derecha) y elegí "Log out".

---

## 2. Moverse por la app

La barra superior tiene:

| Elemento | Qué hace |
|---|---|
| Logo **Zest** | Vuelve al feed |
| "Feed" | Todas las recetas publicadas, de todos los usuarios |
| "Collections" | Tus colecciones |
| "New recipe" | Abre el formulario para crear una receta |
| Tu avatar | Menú con "Edit profile" (tu perfil) y "Log out" |

![Barra superior con Feed, Collections, New recipe y el avatar](./capturas/03-barra-superior.png)

---

## 3. Buscar recetas

El feed ("Discover") muestra todas las recetas, de la más nueva a la más vieja, en páginas. Usá las flechas de abajo para cambiar de página.

![Feed con buscador y filtros](./capturas/04-feed.png)

### Buscar por nombre o por autor

1. En la barra de búsqueda, elegí el criterio en el desplegable de la izquierda: "Recipe" (nombre de la receta) o "Author" (nombre de quien la publicó).
2. Escribí el texto. Los resultados se actualizan solos mientras escribís.
3. Para borrar la búsqueda, usá la ✕ del campo.

### Filtrar

Además del buscador, podés combinar estos filtros:

| Filtro | Opciones |
|---|---|
| Categoría ("Any category") | Desayuno, almuerzo, merienda, cena, entrada, postre, snack, bebida |
| Dificultad ("Any difficulty") | Fácil, media, difícil |
| Ingredientes ("Search ingredients…") | Elegí uno o varios ingredientes del catálogo |

![Filtro de ingredientes abierto](./capturas/05-filtro-ingredientes.png)

Si ninguna receta cumple los filtros, aparece "No recipes match these filters.". Sacá algún filtro para ver más resultados.

> Los filtros quedan en la dirección de la página: si copiás el link y lo compartís, la otra persona ve la misma búsqueda.

---

## 4. Ver una receta

Hacé clic en cualquier tarjeta del feed. La página de la receta muestra:

- La foto, el título, la descripción y el autor. Hacé clic en el autor para ver su perfil.
- Categoría, tiempo ("Time"), dificultad ("Level") y porciones ("Servings").
- Los ingredientes ("Ingredients") con cantidad y unidad.
- Los pasos ("Instructions"), numerados.
- El botón para guardarla en una colección (ver [Colecciones](#7-colecciones)).

![Detalle de una receta](./capturas/06-detalle-receta.png)

---

## 5. Crear una receta

1. Hacé clic en "New recipe". Se abre "Create a recipe".
2. **Foto de portada** (opcional): hacé clic en "Add a cover photo" y elegí una imagen JPEG, PNG o WebP de hasta 5 MB. Para cambiarla, sacala con la ✕ y subí otra.
3. **Datos de la receta:**

   | Campo | Reglas |
   |---|---|
   | "Recipe title" | Obligatorio, hasta 100 caracteres |
   | "Description" | Obligatoria, hasta 500 caracteres |
   | "Category" | Obligatoria |
   | "Servings" | Obligatorio, de 1 a 100 |
   | "Time" + "Time unit" | Obligatorios. En minutos, hasta 59; para más tiempo, cambiá la unidad a horas (hasta 23) |
   | "Difficulty" | Obligatoria |

4. **Ingredientes ("Ingredients"):** por cada ingrediente, elegilo de la lista, escribí la cantidad ("Amount", hasta 12 caracteres, por ejemplo `2` o `1/2`) y elegí la unidad ("Unit"): gramos, tazas, cucharadas, unidades, "a gusto", etc. Con "Add ingredient" agregás otra fila y con la ✕ la sacás. Hace falta al menos uno.
5. **Pasos ("Instructions"):** escribí cada paso en su fila (hasta 500 caracteres). Con "Add step" agregás otro. Hace falta al menos uno.
6. Hacé clic en "Publish". Si subiste foto, primero vas a ver "Uploading image…" y después "Publishing…".
7. Cuando termina, la receta ya aparece en el feed para todos los usuarios.

![Formulario "Create a recipe" completo](./capturas/07-crear-receta.png)

Si falta algo, arriba aparece "Please fix the following" con la lista de lo que hay que corregir (por ejemplo, "Title is required." o "Add at least one step."), y el botón "Publish" queda deshabilitado hasta que lo arregles.

![Errores de validación](./capturas/08-crear-receta-errores.png)

"Cancel" vuelve al feed sin guardar nada.

---

## 6. Editar y eliminar tus recetas

Solo podés editar o eliminar recetas que publicaste vos. En tus tarjetas (en el feed y en tu perfil) aparecen dos íconos extra: lápiz (editar) y tacho (eliminar).

![Tarjeta propia con los íconos de editar y eliminar](./capturas/09-tarjeta-propia.png)

### Editar

1. Hacé clic en el lápiz. Se abre "Edit recipe" con los datos cargados.
2. Cambiá lo que quieras: es el mismo formulario y tiene las mismas reglas que al crear.
3. Hacé clic en "Save changes" y confirmá en el cartel "Save changes?".

"Cancel" vuelve a la receta sin guardar.

### Eliminar

1. Hacé clic en el tacho.
2. Confirmá en el cartel "Delete recipe?" con "Delete".

**No se puede deshacer.** La receta desaparece del feed y de las colecciones donde estaba guardada.

![Confirmación "Delete recipe?"](./capturas/10-eliminar-receta.png)

---

## 7. Colecciones

Una colección es una lista de recetas con nombre y color, por ejemplo "Postres" o "Cenas rápidas". Puede tener recetas tuyas y de otros usuarios. **Guardar una receta en Zest es siempre agregarla a una colección.**

### Crear una colección

1. Andá a "Collections" ("My Collections").
2. Hacé clic en "New collection".
3. Escribí el nombre ("Collection name") y elegí un color ("Accent color").
4. Confirmá. La colección aparece en la lista.

![Ventana "New collection"](./capturas/11-nueva-coleccion.png)

### Guardar una receta en una colección

1. En una tarjeta (ícono de marcador) o en el detalle de una receta, hacé clic en "Save to collection".
2. Se abre la lista de tus colecciones. Hacé clic en una para agregar la receta, y otra vez para sacarla.
3. Si no tenés la colección todavía, creala desde ahí mismo con "New collection".

![Ventana "Save to collection"](./capturas/12-guardar-en-coleccion.png)

### Ver y completar una colección

1. En "Collections", hacé clic en una colección. Se ve el nombre, la cantidad de recetas y sus tarjetas.
2. Con "Add recipes" podés buscar recetas por nombre o por ingrediente y agregarlas sin salir de la colección.
3. Para volver, usá "All collections".

![Detalle de una colección](./capturas/13-detalle-coleccion.png)

### Eliminar una colección

1. En "Collections", hacé clic en el ícono de eliminar de la tarjeta de la colección.
2. Confirmá en "Delete collection?" con "Delete".

Se borra la colección, **pero no las recetas que tenía**. No se puede deshacer.

---

## 8. Perfil

Abrí tu avatar y elegí "Edit profile". El perfil tiene tres pestañas:

| Pestaña | Qué muestra |
|---|---|
| "My recipes" | Las recetas que publicaste, con los íconos de editar y eliminar |
| "Collections" | Tus colecciones |
| "Settings" | Tu nombre y el cambio de contraseña |

![Perfil propio](./capturas/14-perfil.png)

### Cambiar tu nombre

En "Settings", editá "Name" y hacé clic en "Save name". Si sale bien, aparece "Your name was updated.". El nombre no puede quedar vacío.

### Cambiar tu contraseña

En "Settings", hacé clic en "Change password". Zest te manda un email a tu dirección para elegir una contraseña nueva ("We sent a password reset email to …").

![Pestaña "Settings"](./capturas/15-perfil-settings.png)

### Ver el perfil de otro usuario

Hacé clic en el nombre del autor en una receta. Ves su perfil público con sus recetas. No podés editarlas.

---

## 9. Planificador semanal

**Todavía no está disponible en la app.** El backend ya permite asignar una receta a un día y traer el plan de la semana (tickets ZEST-118, ZEST-119 y ZEST-122), pero la pantalla del planificador no está en la versión de producción. Cuando se publique, esta sección va a explicar cómo:

- Agregar una receta a un día, con la cantidad a cocinar.
- Ver el plan de la semana.

---

## 10. Problemas frecuentes

| Problema | Qué hacer |
|---|---|
| La app me manda a "Log in" | Tu sesión venció. Volvé a iniciar sesión. |
| Aparece "Couldn't load recipes" o un error parecido | Esperá unos segundos y hacé clic en "Try again" o recargá la página. Si sigue, avisale al equipo. |
| No puedo subir la foto | Revisá que sea JPEG, PNG o WebP y pese menos de 5 MB. |
| "Publish" está gris | Falta completar o corregir algún campo. Mirá la lista "Please fix the following". |
| No veo el lápiz para editar una receta | Solo aparece en las recetas que publicaste vos. |
| No encuentro una receta que guardé | Las recetas guardadas están dentro de tus colecciones, en "Collections". |
| No me llega el email para cambiar la contraseña | Revisá la carpeta de spam. El email lo manda Auth0. |
