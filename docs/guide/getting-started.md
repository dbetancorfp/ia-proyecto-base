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
- [PostgreSQL 16](https://www.postgresql.org/) instalado localmente

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

El archivo `.claude/settings.json` incluye tres MCPs preconfigurados:

| MCP | Qué hace | Cuándo lo usa Claude |
|---|---|---|
| `github` | Lee y escribe Issues, PRs y comentarios en GitHub | `/enrich-us`, `/review-pr`, `/commit`, `/deploy` |
| `sequential-thinking` | Descompone problemas complejos en pasos estructurados | `/plan-backend-ticket`, `/plan-frontend-ticket` |
| `context7` | Consulta documentación actualizada de librerías (Nuxt, Prisma, Vue…) | `/develop-backend`, `/develop-frontend` |

Añade tu `GITHUB_TOKEN` a `.env.local`:
```bash
GITHUB_TOKEN=ghp_tu_token_aqui
```

> Los MCPs se activan automáticamente — no necesitas invocarlos manualmente. Claude los usa cuando el comando que estás ejecutando los necesita.

## Iniciar tu primera sesión

Abre el proyecto en VS Code con la extensión de Claude Code y prueba:

```
/explain
```

Claude leerá los estándares y te dará una visión general del proyecto.

## Tu primer día: ejemplo paso a paso

Supón que tienes un Issue #1 "Como usuario quiero registrarme con email y contraseña":

```bash
# 1. Enriquece el Issue con criterios de aceptación
/enrich-us 1

# 2. Revisa y aprueba el Issue enriquecido en GitHub, luego planifica
/plan-backend-ticket 1
# → Genera ai-specs/changes/GH-1_backend.md — aprueba el plan antes de continuar

# 3. Implementa con TDD (tests primero, código después)
/develop-backend 1
# → Crea feature/GH-1-backend, escribe tests en RED, implementa hasta GREEN

# 4. Revisa el PR antes de mergear
/review-pr 1

# 5. Mergea y despliega a staging
gh pr merge 1 --squash
/deploy staging
```

Desde ahí, sigue el [Resumen del flujo de trabajo](/guide/workflow) o la guía completa para [Iniciar un proyecto nuevo](/guide/new-project).
