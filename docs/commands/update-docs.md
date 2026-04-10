# /update-docs

Sincroniza la documentación técnica después de cambios en el código. Claude revisa los estándares de documentación del proyecto y actualiza los artefactos que hayan quedado desfasados.

## Cuándo usarlo

- Tras añadir o modificar endpoints de API
- Cuando el modelo de datos ha cambiado (nuevas entidades, campos, relaciones)
- Después de cualquier cambio que afecte a los contratos públicos del sistema

## Cómo usarlo

```
/update-docs
```

No requiere argumentos. Claude usará el contexto de la conversación actual para determinar qué ha cambiado y qué documentación necesita actualizarse.

## Qué actualiza

- `ai-specs/specs/api-spec.yml` — contrato OpenAPI 3.0 con los endpoints del proyecto
- `ai-specs/specs/data-model.md` — entidades de dominio y esquema de base de datos

## Referencia

Usa `ai-specs/specs/documentation-standards.mdc` como guía para decidir qué y cómo actualizar.
