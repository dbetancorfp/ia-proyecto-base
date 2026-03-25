# /plan-backend-ticket

Genera un plan de implementación backend paso a paso para un GitHub Issue. **No se escribe código** — solo el plan.

## Uso

```
/plan-backend-ticket 42
```

## Qué hace

1. Lee el issue con `gh issue view 42`
2. Adopta el rol del agente `backend-developer`
3. Analiza los requisitos contra `ai-specs/specs/backend-standards.mdc`
4. Genera un plan detallado siguiendo la secuencia de capas DDD
5. Guarda el plan en `ai-specs/changes/GH-42_backend.md`

## Estructura del plan

```
Paso 0: Crear rama de funcionalidad (feature/GH-42-backend)
Paso 1: Esquema Valibot (server/domain/schemas/)
Paso 2: Entidad de dominio (server/domain/entities/)
Paso 3: Interfaz de repositorio (server/domain/repositories/)
Paso 4: Repositorio con Prisma (server/infrastructure/repositories/)
Paso 5: Método de servicio (server/services/)
Paso 6: Manejador de ruta H3 (server/api/)
Paso 7: Tests unitarios con Vitest
Paso N: Actualizar documentación (api-spec.yml, data-model.md)
```

## Man-in-the-loop

**Revisa el plan antes de ejecutar `/develop-backend`.** El plan es tu contrato con Claude. Si algo parece incorrecto, corrígelo ahora — es mucho más barato arreglar un plan que deshacer código implementado.
