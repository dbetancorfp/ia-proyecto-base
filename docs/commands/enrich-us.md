# /enrich-us

Enriquece un GitHub Issue sin detalle añadiendo criterios de aceptación completos, notas técnicas y reglas de validación — para que el desarrollador pueda ser totalmente autónomo al implementar.

## Uso

```
/enrich-us 42
```

## Qué hace

1. Lee el issue con `gh issue view 42`
2. Evalúa si la historia tiene suficiente detalle (endpoints, campos, casos extremos, escenarios de test)
3. Si no, produce una versión mejorada
4. Actualiza el cuerpo del issue en GitHub con secciones `## [original]` y `## [enriquecido]`
5. Cambia la etiqueta de `needs-refinement` a `pending-validation`

## Cuándo usarlo

Antes de ejecutar `/plan-backend-ticket` o `/plan-frontend-ticket`. Un issue bien enriquecido produce un mejor plan y menos sorpresas durante la implementación.

## Ejemplo de salida

El issue enriquecido contendrá:
- Historia de usuario (persona, objetivo, beneficio)
- Criterios de aceptación en formato Given/When/Then
- Especificación del endpoint de API (método, URL, request/response)
- Reglas de validación (campo por campo)
- Requisitos de seguridad
- Casos extremos
- Checklist de Definition of Done

## Cuándo omitirlo

Cuando el issue ya tiene criterios de aceptación detallados, specs de endpoints y reglas de validación. No todos los issues necesitan enriquecimiento.
