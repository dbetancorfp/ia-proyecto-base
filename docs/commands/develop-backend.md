# /develop-backend

Implementa el plan de backend generado por `/plan-backend-ticket`. Sigue TDD: primero los tests, luego la implementación.

## Uso

```
/develop-backend ai-specs/changes/GH-42_backend.md
```

## Qué hace

1. Lee el archivo del plan
2. Crea la rama `feature/GH-42-backend`
3. Ejecuta cada paso del plan en orden
4. Escribe los tests fallidos **antes** de escribir el código de implementación
5. Implementa el código mínimo para que los tests pasen
6. Ejecuta `npm test` para verificar
7. Ejecuta `npm run typecheck` y `npm run lint`
8. Prepara solo los archivos relacionados con el issue
9. Crea un commit: `GH-42: Add user creation endpoint`
10. Hace push y abre un PR con `Closes #42` en el cuerpo

## Puntos de control man-in-the-loop

Claude pausará y pedirá aprobación antes de:
- Escribir el primer test (muestra el plan de tests)
- Cada paso de implementación (muestra lo que planea escribir)
- El commit final (muestra el diff)

Puedes rechazar cualquier paso y redirigir a Claude antes de que continúe.
