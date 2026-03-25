# Primeros pasos

## ¿Qué es esto?

**IA Proyecto Base** es una plantilla de proyecto para construir aplicaciones web con asistencia de IA usando Claude Code.

Proporciona:
- Un **flujo de desarrollo** estructurado (cliente → specs → TDD → código → revisión → despliegue)
- **Slash commands** que activan roles especializados de IA en cada paso
- **Archivos de estándares** que le indican a Claude exactamente cómo escribir código para tu stack
- **Plantillas** para discovery, historias de usuario, handoffs y planes de implementación

El stack tecnológico es **Nuxt 4** (fullstack), **Vue 3**, **Pinia**, **PrimeVue 4**, **Prisma 7**, **Vitest** y **Playwright** — todo preconfigurado en los archivos de estándares.

## Prerequisitos

- [Claude Code](https://claude.ai/code) instalado (CLI o extensión de VS Code)
- [Git](https://git-scm.com/) y una cuenta de GitHub
- [Node.js](https://nodejs.org/) v20+
- [Docker](https://www.docker.com/) (para PostgreSQL en desarrollo)

## Importar en tu proyecto

```bash
# Clonar esta plantilla
git clone https://github.com/dbetancorfp/ia-proyecto-base.git mi-proyecto
cd mi-proyecto

# Eliminar el historial git de la plantilla y empezar desde cero
rm -rf .git
git init
git add .
git commit -m "Initial commit from ia-proyecto-base template"
```

## Adaptar a tu proyecto

Los archivos en `ai-specs/specs/` son el núcleo de la plantilla. Debes actualizarlos antes de empezar:

| Archivo | Qué actualizar |
|---|---|
| `specs/base-standards.mdc` | Principios fundamentales — déjalo como está salvo que tengas reglas específicas |
| `specs/backend-standards.mdc` | Ya configurado para la capa de servidor de Nuxt 4 |
| `specs/frontend-standards.mdc` | Ya configurado para Vue 3 + Pinia + PrimeVue |
| `specs/development_guide.md` | Actualiza la URL del repositorio y los pasos de configuración específicos del proyecto |
| `specs/api-spec.yml` | Reemplaza el ejemplo de User con tu propio dominio |
| `specs/data-model.md` | Reemplaza el ejemplo de User con tus propias entidades |

## Configurar MCPs (opcional pero recomendado)

El archivo `.claude/settings.json` incluye tres MCPs:

```json
{
  "mcpServers": {
    "github": { ... },               // integración con gh CLI
    "sequential-thinking": { ... },  // razonamiento estructurado
    "context7": { ... }              // consulta de docs de librerías
  }
}
```

Añade tu `GITHUB_TOKEN` a `.env.local`:
```bash
GITHUB_TOKEN=ghp_tu_token_aqui
```

## Iniciar tu primera sesión

Abre el proyecto en VS Code con la extensión de Claude Code y prueba:

```
/explain
```

Claude leerá los estándares y te dará una visión general del proyecto. Desde ahí, sigue el [Resumen del flujo de trabajo](/guide/workflow).
