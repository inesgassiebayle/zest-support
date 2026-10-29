# Zest — Producto y proyecto

Contexto de negocio y de proyecto en un solo lugar: para qué existe Zest, para
quién, qué se prometió en el Project Charter y qué está construido hoy. Lo usan
las skills de storytelling, de steering y de gestión de proyecto. El esquema de
datos sigue estando en [`db.md`](./db.md) y el stack en
[`tech-stack.md`](./tech-stack.md).

> Fuentes: *Project Charter - Zest* (aprobado 18/06/2026), *Steering 1 - Zest*
> (17/09/2026) y *Zest - Steering 2* (15/10/2026), en el Drive del equipo. Si
> algo de acá contradice al código o a un steering más nuevo, gana lo más nuevo:
> actualizá este archivo.

## Objetivo

Desarrollar una plataforma web que transforme la manera en que las personas
organizan sus comidas, permitiéndoles gestionar recetas y planificar su semana
en un único lugar, para sumar variedad a su alimentación y reducir el tiempo que
dedican a decidir qué cocinar cada día.

## Visión (product pitch)

> Para personas que cocinan o planifican sus comidas, que usan recetas
> dispersas en distintos medios, **Zest** es una plataforma web que permite
> descubrir recetas, organizarlas y planificar la semana en un único lugar.
> Al contrario de Cookpad y Mealime, unifica el descubrimiento, la organización
> personal y la planificación semanal en una sola experiencia.

## El problema

- Las personas gestionan sus recetas en **3 o más fuentes a la vez**: redes
  sociales, apps, papel, WhatsApp. Dispersión y pérdida de tiempo.
- Sin un lugar central cuesta retomar recetas guardadas y mantener variedad: se
  terminan repitiendo siempre los mismos platos.

## La situación propuesta

- Todas las recetas en un único lugar.
- Planificar la semana de forma simple, con más variedad y menos repetición.
- Descubrir recetas de la comunidad y organizar las propias con una interfaz
  clara.

## KPIs de negocio

- **≥ 70%** de los usuarios activos gestionan sus recetas exclusivamente en Zest.
- **≥ 50%** de los usuarios activos usan el planificador.

Desde octubre se miden a diario en el reporte de KPIs (`zest/kpis/`):
`active_users_30d`, `platform_managed_users` y `platform_managed_rate`, junto con
siete KPIs técnicos y de salud.

## Interesados

- **Usuarios finales**: cocineros y planificadores (consumen, organizan,
  planifican), creadores de contenido (publican y buscan visibilidad), empresas
  de alimentos (visibilidad de sus productos).
- **Equipo del proyecto** (gestión desde Lab IV, desarrollo desde Lab II).
- **Cátedra de Dirección de Proyectos / Lab IV** — stakeholders de negocio.
- **Cátedra de Laboratorio II** — stakeholders técnicos; controla el recurso
  crítico (los devs).
- Inversores o sponsors.

## Equipo

Seis roles. Los roles de gestión **rotan entre steerings**: verificá quién tiene
cada uno antes de poner nombres en una slide.

| Rol | Steering 1 (17/09) | Steering 2 (15/10) |
|---|---|---|
| Project Manager | Maria Clara Lopez | Ines Gassiebayle |
| Product Owner | Luz Laura | Liz Lubelczyk |
| Tech Lead | Liz Lubelczyk | Maria Clara Lopez |
| QA | Ines Gassiebayle | Luz Laura |
| Dev | Santiago Blanco Pan (backend) | Santiago Blanco Pan (frontend) |
| Dev | Thiago Serebrinsky (frontend) | Thiago Serebrinsky (backend) |

Restricción que lo explica todo: **6 horas semanales por desarrollador**.

## Alcance

| Requisito | Qué es | Estado (Steering 2) |
|---|---|---|
| RF-01 Gestión de usuarios | Registro, login (Auth0), perfil propio y público | Hecho |
| RF-02 Gestión de recetas | Crear, editar y eliminar recetas con ingredientes, pasos e imagen | Hecho |
| RF-03 Exploración y búsqueda | Feed de la comunidad con búsqueda por texto y filtros (categoría, dificultad, ingredientes) | Hecho |
| RF-04 Organización | Guardar recetas y armarlas en colecciones | Hecho |
| RF-05 Planificación | Planificador: qué receta se cocina qué día | Sprint 3, MVP 12/11 |

No funcionales: **RNF-01** primera receta en menos de 5 minutos sin
capacitación · **RNF-02** accesible por navegador, mínimo 50 usuarios
concurrentes · **RNF-03** ≥ 75% de cobertura de tests de backend.

**Fuera de alcance** (la "lista de NOs"): app mobile nativa, integración con
supermercados o delivery, publicidad, sistema social (seguir usuarios,
calificaciones, reseñas), importar recetas de redes, e-commerce o pagos,
asistente de IA, multi-idioma.

Recortado por control de cambios (13/10, challenge de KPIs): el **stepper de
porciones** y la **acción rápida del planificador**. No vuelven.

## Qué está construido (ver el código antes de afirmarlo)

Pantallas en `zest/frontend/src/features/`:

- **auth** — login y signup con Auth0.
- **feed** — feed paginado de recetas con búsqueda y filtros en la URL.
- **recipe-detail** — detalle con ingredientes (cantidad + unidad) y pasos.
- **recipe-create / recipe-edit** — formulario con ingredientes del catálogo,
  pasos ordenados, dificultad, tiempo, porciones e imagen de portada (S3).
- **collections** — grilla de colecciones, detalle, crear, eliminar, agregar
  recetas desde un modal, guardar una receta en una colección sin salir de la
  página.
- **profile** — perfil propio (mis recetas, mis colecciones, configuración) y
  perfil público de otro usuario.

Plataforma: frontend en Vercel, backend en Render (Docker), base en Neon,
imágenes en S3, CI en GitHub Actions y reporte diario de 10 KPIs por GitHub
Actions (sin agentes de IA).

## Hitos

| Hito | Fecha |
|---|---|
| Project Charter aprobado (GO) | 18/06/2026 |
| Kick-off / capacitación | 06/08/2026 |
| Steering 1 | 17/09/2026 |
| Deploy intermedio | 01/10/2026 |
| Steering 2 | 15/10/2026 |
| MVP en producción | 12/11/2026 |
| Cierre del ciclo (Periodo 16) | 23/11/2026 |

Sprints: Sprint 1 — recetas y explorador · Sprint 2 — usuarios, autenticación,
colecciones, challenge de KPIs, producción · Sprint 3 — planificador, corrección
de errores y cierre.

## Riesgos vigentes (Steering 2)

| # | Riesgo | P | Impacto | Estrategia |
|---|---|---|---|---|
| R1 | Disponibilidad del equipo | 0,5 | Alto | Mitigar — tickets replanificados |
| R2 | Stack NestJS / React | 0,4 | Alto | Mitigar — capacitación y apoyo del TL |
| R3 | Subestimación de tareas | 0,5 | Medio | Mitigar + aceptar — contingencia |
| R4 | Abandono de un dev | 0,2 | Alto | Mitigar — seguimiento semanal |
| R5 | Competencia | 0,2 | Alto | Mitigar — foco en diferenciadores |
| O1 | Devs que ya conocen parte del stack | 0,4 | Alto | Explotar |
| O2 | Equipo adelantado al schedule | 0,3 | Medio | Explotar (margen usado en el challenge) |
| O3 | Gasto por debajo del presupuesto | 0,4 | Bajo | Mejorar (herramientas gratuitas) |
