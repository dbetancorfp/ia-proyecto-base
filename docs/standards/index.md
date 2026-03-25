# Standards Overview

The `ai-specs/specs/` folder contains the technical standards that Claude reads automatically at the start of every session (via `CLAUDE.md → base-standards.mdc`).

## Files

| File | Purpose |
|---|---|
| `base-standards.mdc` | Core principles: TDD, type safety, English-only, incremental changes |
| `backend-standards.mdc` | Nuxt 4 server layer: Nitro/H3, DDD, Prisma, Valibot, Vitest |
| `frontend-standards.mdc` | Vue 3, Pinia, PrimeVue, composables, Playwright |
| `documentation-standards.mdc` | Docs structure, API spec maintenance, VitePress |
| `api-spec.yml` | OpenAPI 3.0 contract — updated as endpoints are added |
| `data-model.md` | Domain entities, Prisma schema, relationships |
| `development_guide.md` | Environment setup, scripts, project structure |

## How Claude uses them

`CLAUDE.md` is a symlink to `base-standards.mdc`. Claude Code loads it automatically and applies all rules in every session — no need to paste instructions manually.

The `globs` field in each `.mdc` file tells Claude which files each standard applies to:

```yaml
---
globs: ["server/**/*.ts", "server/db/prisma/**/*.{prisma,ts}"]
alwaysApply: true
---
```

## Adapting to your project

1. **Replace the examples** in `api-spec.yml` and `data-model.md` with your own domain
2. **Keep `base-standards.mdc` as-is** — it contains universal principles
3. **Update `development_guide.md`** with your repo URL and any custom setup steps
4. **Add project-specific rules** to `backend-standards.mdc` or `frontend-standards.mdc` as you discover patterns
