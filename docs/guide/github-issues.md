# Trabajar con GitHub Issues

Todos los tickets en este proyecto usan **GitHub Issues** — sin Jira, sin Linear.

## Convención de IDs

Los GitHub Issues son simplemente números (`#42`). En nombres de archivos y ramas usamos el prefijo `GH-N` para mayor claridad:

| Contexto | Formato | Ejemplo |
|---|---|---|
| Nombre de rama | `feature/GH-N-descripcion` | `feature/GH-42-user-auth` |
| Archivo del plan | `GH-N_backend.md` | `GH-42_backend.md` |
| Mensaje de commit | `GH-42: Add user auth endpoint` | — |
| Cuerpo del PR | `Closes #42` | cierra el issue automáticamente al hacer merge |

## Etiquetas

| Etiqueta | Significado |
|---|---|
| `needs-refinement` | La historia necesita enriquecimiento antes de planificar |
| `pending-validation` | Enriquecida — esperando aprobación del Product Owner |
| `ready` | Aprobada y lista para planificar/implementar |
| `in-progress` | En proceso de implementación |
| `blocked` | Esperando una dependencia o respuesta |

## Flujo con comandos

```bash
# 1. Ver issues abiertos
gh issue list

# 2. Ver un issue específico
gh issue view 42

# 3. Enriquecer un issue sin detalle (añade criterios de aceptación)
/enrich-us 42

# 4. Generar plan de implementación backend
/plan-backend-ticket 42

# 5. Generar plan de implementación frontend
/plan-frontend-ticket 42

# 6. Implementar
/develop-backend ai-specs/changes/GH-42_backend.md

# 7. Revisar antes del merge
/review-pr 42

# 8. Commit + PR (cierra el issue automáticamente)
/commit
```

## Handoffs de sesión

Cuando necesitas parar a mitad de una funcionalidad y retomar más tarde, guarda el estado de la sesión:

```
Guarda el estado actual de la sesión en .claude/sessions/context_session_GH-42.md
Sigue la plantilla en ai-specs/handoffs/_template.md
```

Para retomar:
```
Lee .claude/sessions/context_session_GH-42.md y retoma donde lo dejamos.
Confírmame el siguiente paso antes de escribir cualquier código.
```
