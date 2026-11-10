"""Arma las piezas 1-4 del catálogo (Laboratorio-4-2C-2026/catalogo-agentes) a
partir de los archivos de este repo, para que no haya dos versiones que mantener.

    python catalogo/armar.py

Las piezas 5-10 se escriben directamente en catalogo/ y este script no las toca.
Los links a archivos que no viajan con la pieza se cambian por la ruta en
zest-support, así siguen siendo legibles fuera de este repo.
"""
import re
import shutil
from pathlib import Path

import yaml

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "catalogo"
AUTORA = {"nombre": "Maria Clara Lopez", "github": "ClaraLopez1"}
HERMANAS = {
    "skills/project-management.md": "g02-valor-ganado-evm",
    "skills/decision-committee.md": "g02-comite-de-decisiones",
    "skills/storytelling.md": "g02-storytelling-de-demo",
    "skills/steering-deck.md": "g02-deck-de-steering",
}
LINK = re.compile(r"\[([^\]]+)\]\((?!https?://|#)([^)#]+)(#[^)]*)?\)")


def ficha(name, description, tipo, area, fase, tecnologias, requiere, madurez, relacionados, extra=None):
    meta = {
        "tipo": tipo, "area": area, "fase": fase, "tecnologias": tecnologias,
        "metodologia": ["scrum"], "herramientas": ["claude-code"], "requiere": requiere,
        "grupo": "02", "autor": AUTORA, "responsables": [AUTORA["github"]],
        "madurez": madurez, "relacionados": relacionados,
    }
    datos = {"name": name, "description": description, **(extra or {}), "metadata": meta}
    texto = yaml.safe_dump(datos, allow_unicode=True, sort_keys=False, width=1000)
    return "---\n" + texto.replace("grupo: '02'", 'grupo: "02"') + "---\n\n"


def reescribir_links(texto, origen, mapa):
    """`mapa`: ruta en el repo -> ruta dentro de la pieza."""
    def cambiar(m):
        etiqueta, destino, ancla = m.group(1), m.group(2), m.group(3) or ""
        real = (origen.parent / destino).resolve()
        rel = real.relative_to(REPO).as_posix().rstrip("/") if real.is_relative_to(REPO) else destino
        for desde, hacia in mapa.items():
            if rel == desde or rel.startswith(desde + "/"):
                return f"[{etiqueta}](./{hacia}{rel[len(desde):]}{ancla})"
        if rel in HERMANAS:
            return f"{etiqueta} (skill `{HERMANAS[rel]}`)"
        return f"{etiqueta} (`zest-support/{rel}`)"
    return LINK.sub(cambiar, texto)


def pieza(carpeta, frontmatter, archivos, ejemplo, mapa_extra=None, anexo=""):
    """`archivos`: ruta en el repo -> nombre dentro de la pieza (el primero es el principal)."""
    destino = OUT / carpeta
    shutil.rmtree(destino, ignore_errors=True)
    destino.mkdir(parents=True)
    mapa = {k: v for k, v in archivos.items()}
    mapa.update(mapa_extra or {})
    for i, (desde, hacia) in enumerate(archivos.items()):
        origen = REPO / desde
        texto = reescribir_links(origen.read_text(encoding="utf-8"), origen, mapa)
        if i == 0:
            texto = frontmatter + texto.rstrip() + "\n" + anexo + "\n## Ejemplo de uso\n\n" + ejemplo.strip() + "\n"
        (destino / hacia).parent.mkdir(parents=True, exist_ok=True)
        (destino / hacia).write_text(texto, encoding="utf-8")
    return destino


# 1. Valor ganado ----------------------------------------------------------
pieza(
    "skills/g02-valor-ganado-evm",
    ficha(
        "g02-valor-ganado-evm",
        "Usar para estimar esfuerzo y costo, armar o revisar el presupuesto y calcular, auditar y defender el valor ganado de Zest (PV, EV, AC, SPI, CPI, EAC, ETC, VAC, TCPI) con la teoría de Dirección de Proyectos de la cátedra. Separa líneas de nivel de esfuerzo del desarrollo, muestra cada cuenta y propone la decisión.",
        "skill", ["gestion"], ["planificacion", "revision"], ["agnostico"], ["multica", "google-drive"],
        "usado-en-proyecto",
        ["g15-evm-calculator", "g04-earned-value-presentacion", "g11-auditar-steering", "g02-status-report-format",
         "g02-estimador-de-horas-reales", "g02-control-de-cambios"],
    ),
    {
        "skills/project-management.md": "SKILL.md",
        "skills/project-management/evm-manual.md": "evm-manual.md",
        "skills/project-management/course.md": "course.md",
        "skills/project-management/README.md": "guia-de-uso.md",
    },
    """
**Pedido:** "Calculá el valor ganado de Zest al corte del 05/11: PV acumulado 5.600, tickets terminados por actividad [lista], horas reales dev 190 y gestión 300. Quiero los índices globales y los de desarrollo."

**Resultado:** Lista los datos con su fuente y fecha, mide gestión e infraestructura como nivel de esfuerzo (EV = PV) y desarrollo por tickets terminados, muestra cada cuenta (`SPI = EV / PV = ...`), compara con el corte anterior, avisa si los índices globales están inflados por composición y cierra con la decisión que corresponde y quién la toma.
""",
    {"skills/project-management": "."},
)

# 2. Comité ------------------------------------------------------------------
pieza(
    "skills/g02-comite-de-decisiones",
    ficha(
        "g02-comite-de-decisiones",
        "Usar cuando haya que tomar una decisión del proyecto Zest (técnica, de alcance, de presupuesto, de equipo o de cómo presentar algo) y se quiera una mirada sin sesgo: convoca a tres subagentes en paralelo, un abogado del diablo, un aliado y un neutral, y devuelve sus posiciones con preguntas para que decida la persona.",
        "skill", ["gestion"], ["planificacion", "analisis"], ["agnostico"], [], "usado-en-proyecto",
        ["g08-devils-advocate", "g11-analizar-cambio-alcance", "g02-control-de-cambios"],
    ),
    {
        "skills/decision-committee.md": "SKILL.md",
        ".claude/agents/committee-devils-advocate.md": "agents/committee-devils-advocate.md",
        ".claude/agents/committee-advocate.md": "agents/committee-advocate.md",
        ".claude/agents/committee-neutral.md": "agents/committee-neutral.md",
    },
    """
**Pedido:** "/g02-comite-de-decisiones ¿En el Steering 3 recalculamos el EV midiendo gestión e infraestructura como nivel de esfuerzo, aunque el SPI baje, o seguimos con el método del Steering 2?"

**Resultado:** Encuadra la decisión, lanza los tres subagentes en paralelo con los mismos datos y devuelve las tres posiciones (el abogado del diablo marcó que el CPI también cae, el aliado defendió recalcular y el neutral dijo qué dato da vuelta la decisión), cerrando con preguntas para la persona, sin decidir por ella.
""",
    anexo="""
## Instalación de los subagentes

Los tres miembros del comité son subagentes de Claude Code y están en
[`agents/`](./agents). Copialos a `.claude/agents/` del repo donde vayas a usar
la skill. En sus archivos dicen `support/skills/decision-committee.md`: si la
skill vive en otra ruta, pasales la ruta real en el pedido (la skill ya lo
indica).
""",
)

# 3. Storytelling ----------------------------------------------------------
pieza(
    "skills/g02-storytelling-de-demo",
    ficha(
        "g02-storytelling-de-demo",
        "Usar para preparar o ensayar la demo de Zest en un steering, en Lab II, en un demo day o en el final: verifica qué está terminado, arma la historia con una persona y entrega el paquete completo (guion clic por clic con quién habla y qué hacer si falla, versiones de 30 s, 2 y 5 minutos, preguntas probables, plan B y checklists). También hace de público para ensayar.",
        "skill", ["gestion", "documentacion"], ["revision"], ["agnostico"], ["multica"], "usado-en-proyecto",
        ["g04-guion-de-demo", "g09-preparar-demo-sprint", "g05-watchparty-steering-rehearsal",
         "g02-demo-data-generator", "g02-deck-de-steering"],
    ),
    {
        "skills/storytelling.md": "SKILL.md",
        "skills/storytelling/frameworks.md": "frameworks.md",
        "skills/storytelling/personas.md": "personas.md",
        "skills/storytelling/demo-kit.md": "demo-kit.md",
        "skills/storytelling/README.md": "guia-de-uso.md",
    },
    """
**Pedido:** "Armame la demo del Steering 3 con colecciones y el planificador: 10 minutos, presentan Santi y Thiago."

**Resultado:** Revisa el código y el cronograma, detecta que el planificador todavía no está terminado y arma dos guiones (A con el planificador, B sin él), con la historia de Sofi, tarjetas funcionalidad → valor, un guion clic por clic con quién habla y qué hacer si falla cada paso, versiones cortas, preguntas probables, plan B y checklists para el ensayo y el día.
""",
    {"skills/storytelling": "."},
    anexo="""
## Datos de la demo

Para cargar los datos que necesita la historia, usá la skill del grupo
`g02-demo-data-generator`: genera recetas, colecciones y usuarios ficticios a
partir del esquema real. Esta skill solo dice qué datos hacen falta.
""",
)

# 4. Deck ------------------------------------------------------------------
destino = pieza(
    "skills/g02-deck-de-steering",
    ficha(
        "g02-deck-de-steering",
        "Usar para armar el deck de un Steering Committee de Zest (o cualquier presentación del proyecto) como una app web en React, Vite y Tailwind en vez de un PowerPoint: primero aprueba los títulos, después muestra tres estilos para elegir y construye con fondos y efectos de React Bits gratuitos, vista de presentador, chequeo automático de layout con capturas y exportación a PDF.",
        "skill", ["gestion", "diseno"], ["revision"], ["react", "vite", "typescript", "tailwindcss", "playwright"],
        ["google-drive"], "probado",
        ["g15-steering-deck-builder", "g04-estructura-de-presentacion", "g11-auditar-steering",
         "g02-storytelling-de-demo", "g02-valor-ganado-evm"],
    ),
    {
        "skills/steering-deck.md": "SKILL.md",
        "skills/steering-deck/design.md": "design.md",
        "skills/steering-deck/react-bits.md": "react-bits.md",
        "skills/steering-deck/README.md": "guia-de-uso.md",
    },
    """
**Pedido:** "Armame el deck del Steering 3 a partir del Steering 2."

**Resultado:** Propone los títulos de las 16 slides como aseveraciones y espera la aprobación, muestra capturas de tres estilos (Citrus editorial, Cocina de noche y Recetario) con la portada y la slide de valor ganado, copia la plantilla, construye las slides con los números en un solo archivo con su fuente, corre el chequeo de layout, revisa cada captura y exporta el PDF de respaldo.
""",
    {"skills/steering-deck": ".", "decks/_template": "plantilla", "decks": "plantilla"},
)
shutil.copytree(
    REPO / "decks/_template", destino / "plantilla",
    ignore=shutil.ignore_patterns("node_modules", "dist", "check", "deck.pdf"),
)
for md in destino.rglob("*.md"):
    texto = md.read_text(encoding="utf-8").replace("decks/_template", "plantilla")
    texto = texto.replace("[`../../skills/steering-deck.md`](../../skills/steering-deck.md)", "[`../SKILL.md`](../SKILL.md)")
    md.write_text(texto, encoding="utf-8")

print("Piezas 1-4 armadas en catalogo/.")
