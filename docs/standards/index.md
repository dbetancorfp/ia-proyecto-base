# Resumen de estándares

La carpeta `ai-specs/specs/` contiene los estándares técnicos que Claude lee automáticamente al inicio de cada sesión (a través de `CLAUDE.md → base-standards.mdc`).

## Archivos

| Archivo | Propósito |
|---|---|
| `base-standards.mdc` | Principios fundamentales: TDD, tipado estricto, solo inglés en código, cambios incrementales |
| `backend-standards.mdc` | Capa de servidor Nuxt 4: Nitro/H3, DDD, Prisma, Valibot, Vitest |
| `frontend-standards.mdc` | Vue 3, Pinia, PrimeVue, composables, Playwright |
| `documentation-standards.mdc` | Estructura de docs, mantenimiento del API spec, VitePress |
| `api-spec.yml` | Contrato OpenAPI 3.0 — se actualiza conforme se añaden endpoints |
| `data-model.md` | Entidades de dominio, esquema de Prisma, relaciones |
| `development_guide.md` | Configuración del entorno, scripts, estructura del proyecto |

## Cómo los usa Claude

`CLAUDE.md` es un symlink a `base-standards.mdc`. Claude Code lo carga automáticamente y aplica todas las reglas en cada sesión — sin necesidad de pegar instrucciones manualmente.

El campo `globs` en cada archivo `.mdc` indica a Claude a qué archivos aplica cada estándar:

```yaml
---
globs: ["server/**/*.ts", "server/db/prisma/**/*.{prisma,ts}"]
alwaysApply: true
---
```

## Adaptar a tu proyecto

1. **Reemplaza los ejemplos** en `api-spec.yml` y `data-model.md` con tu propio dominio
2. **Deja `base-standards.mdc` como está** — contiene principios universales
3. **Actualiza `development_guide.md`** con la URL de tu repositorio y los pasos de configuración personalizados
4. **Añade reglas específicas del proyecto** a `backend-standards.mdc` o `frontend-standards.mdc` conforme descubras patrones
