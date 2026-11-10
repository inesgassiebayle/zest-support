# Piezas para el Catálogo Común de Agentes

Las 13 piezas de Maria Clara Lopez (grupo 02) para
[Laboratorio-4-2C-2026/catalogo-agentes](https://github.com/Laboratorio-4-2C-2026/catalogo-agentes),
ya en el formato del catálogo y validadas con su `scripts/validar.py`.

| # | Pieza | Tipo | Madurez |
|---|---|---|---|
| 1 | `skills/g02-valor-ganado-evm` | skill | usado-en-proyecto |
| 2 | `skills/g02-comite-de-decisiones` | skill | usado-en-proyecto |
| 3 | `skills/g02-storytelling-de-demo` | skill | usado-en-proyecto |
| 4 | `skills/g02-deck-de-steering` | skill (con la plantilla del deck) | probado |
| 5 | `skills/g02-estimador-de-horas-reales` | skill + script | experimental |
| 6 | `skills/g02-control-de-cambios` | skill | experimental |
| 7 | `skills/g02-registro-de-riesgos` | skill | experimental |
| 8 | `skills/g02-matriz-raci` | skill | experimental |
| 9 | `comandos/g02-registro-de-decisiones-pm` | comando | experimental |
| 10 | `agentes/g02-tutor-final-dirproy` | agente | experimental |
| 11 | `agentes/g02-comite-abogado-del-diablo` | agente | usado-en-proyecto |
| 12 | `agentes/g02-comite-aliado` | agente | usado-en-proyecto |
| 13 | `agentes/g02-comite-neutral` | agente | usado-en-proyecto |

## Mantenerlas al día

- **Piezas 1–4 y 11–13** salen de `skills/` y `.claude/agents/` de este repo. Si cambiás algo allá, regenerálas:
  `python3 catalogo/armar.py`.
- **Piezas 5–10** se editan directo acá, en `catalogo/`.
- En Claude Code, dentro de este repo, todas se pueden usar: las skills desde
  `.claude/skills/`, el comando desde `.claude/commands/` y el agente desde `.claude/agents/`.

## Subirlas al catálogo

Lo hace Maria Clara con su usuario, para figurar como autora en el commit y en el PR. Los pasos
están en `CONTRIBUTING.md` del catálogo: rama `g02-...` en el repo (no fork), PR a `main` y
esperar el comentario del bot.
