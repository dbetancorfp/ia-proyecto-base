# /review-pr

Realiza una revisión de código previa al merge combinando las perspectivas de tech lead, QA y seguridad. Publica el resultado como comentario en el PR.

## Uso

```
/review-pr 42
```

También acepta un nombre de rama o número de PR:

```
/review-pr feature/GH-42-backend
/review-pr 137
```

## Qué comprueba

**Capa de servidor (Nuxt `server/`):**
- Capas DDD respetadas (sin Prisma en servicios, sin lógica en manejadores H3)
- Validación con Valibot presente antes de operaciones de base de datos
- `createError()` con códigos de estado HTTP correctos

**Capa frontend (Nuxt `app/`):**
- `<script setup lang="ts">` — sin Options API
- Componentes de PrimeVue usados apropiadamente
- Sin `window`/`document` fuera de `onMounted`

**Ambas capas:**
- Tipado estricto de TypeScript (sin `any`)
- Sin `console.log` en rutas de producción
- Nomenclatura descriptiva, DRY

**Tests:**
- Patrón AAA, nombres descriptivos
- Casos de éxito + casos de error cubiertos
- Umbral de cobertura del 90%

**Seguridad:**
- Sin secretos hardcodeados
- Middleware de autenticación en rutas protegidas
- Queries de Prisma parametrizadas

**Documentación:**
- `api-spec.yml` actualizado si cambiaron endpoints
- `data-model.md` actualizado si cambió el esquema

## Veredictos

| Veredicto | Significado |
|---|---|
| `APPROVE` | Todos los checks pasados — `gh pr review --approve` |
| `APPROVE WITH NOTES` | Advertencias menores — abordar antes del próximo sprint |
| `REQUEST CHANGES` | Problemas encontrados — deben corregirse antes del merge |
| `BLOCK` | Problema bloqueante — no hacer merge |
