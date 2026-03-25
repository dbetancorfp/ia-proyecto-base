# Slash Commands

Los slash commands son prompts preconfigurados almacenados en `ai-specs/.commands/`. Escríbelos en Claude Code para activar un paso especializado del flujo de trabajo.

## Lista completa

| Comando | Cuándo usarlo | Salida |
|---|---|---|
| [`/enrich-us`](/commands/enrich-us) | El GitHub Issue carece de detalle | Issue enriquecido con criterios de aceptación |
| [`/plan-backend-ticket`](/commands/plan-backend-ticket) | Antes de escribir código de servidor | Plan de implementación `GH-N_backend.md` |
| [`/plan-frontend-ticket`](/commands/plan-frontend-ticket) | Antes de escribir código frontend | Plan de implementación `GH-N_frontend.md` |
| [`/develop-backend`](/commands/develop-backend) | Implementar a partir del plan de backend | Rama de funcionalidad + tests pasando |
| [`/develop-frontend`](/commands/develop-frontend) | Implementar a partir del plan de frontend | Rama de funcionalidad + tests pasando |
| [`/review-pr`](/commands/review-pr) | Antes de hacer merge de un PR | Informe de revisión publicado como comentario en el PR |
| [`/commit`](/commands/commit) | Tras la implementación | Commit + PR con `Closes #N` |
| [`/deploy`](/commands/deploy) | Después de que el PR está mergeado | Despliegue a staging o producción |
| `/explain` | En cualquier momento | Explicación didáctica del código seleccionado |
| `/update-docs` | Tras cambios de código | Sincroniza `api-spec.yml` y `data-model.md` |
| `/meta-prompt` | Para mejorar un prompt | Versión refinada del prompt dado |

## Cómo funcionan

Cada archivo de comando en `ai-specs/.commands/` es una plantilla de prompt en Markdown. Claude Code lee el archivo cuando escribes el comando, sustituye `$ARGUMENTS` con lo que has pasado y ejecuta las instrucciones.

```
/plan-backend-ticket 42
         ↓
Claude lee ai-specs/.commands/plan-backend-ticket.md
Sustituye $ARGUMENTS = "42"
Ejecuta: gh issue view 42
Genera: ai-specs/changes/GH-42_backend.md
```

## Argumentos

La mayoría de comandos aceptan un número de GitHub Issue:

```
/enrich-us 42
/plan-backend-ticket 42
/develop-backend ai-specs/changes/GH-42_backend.md
/review-pr 42
```
