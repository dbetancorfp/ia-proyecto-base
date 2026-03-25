# /plan-frontend-ticket

Genera un plan de implementación frontend paso a paso para un GitHub Issue. **No se escribe código** — solo el plan.

## Uso

```
/plan-frontend-ticket 42
```

## Qué hace

1. Lee el issue con `gh issue view 42`
2. Adopta el rol del agente `frontend-developer`
3. Analiza los requisitos contra `ai-specs/specs/frontend-standards.mdc`
4. Genera un plan detallado siguiendo la secuencia de capas frontend de Nuxt
5. Guarda el plan en `ai-specs/changes/GH-42_frontend.md`

## Estructura del plan

```
Paso 0: Crear rama de funcionalidad (feature/GH-42-frontend)
Paso 1: Store de Pinia (app/stores/) — si se necesita estado compartido
Paso 2: Composable (app/composables/) — fetching de datos + lógica
Paso 3: Componentes Vue SFC (app/components/) — PrimeVue
Paso 4: Página (app/pages/) — ruta basada en archivo
Paso 5: Tests E2E con Playwright (e2e/)
Paso N: Actualizar documentación
```

## Man-in-the-loop

**Revisa el plan antes de ejecutar `/develop-frontend`.** Presta atención a:
- Qué componentes de PrimeVue se proponen (verifica que existan en v4)
- Si realmente se necesita un store de Pinia o basta con un composable
- Consideraciones de SSR señaladas en el plan
