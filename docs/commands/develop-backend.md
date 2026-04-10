# /develop-backend

Implementa el backend de un GitHub Issue siguiendo estrictamente TDD: **tests primero, código después**.

## Uso

```
/develop-backend 42
```

O pasando directamente el plan generado por `/plan-backend-ticket`:

```
/develop-backend ai-specs/changes/GH-42_backend.md
```

## Qué hace

### 1. Crea la rama

```bash
git checkout -b feature/GH-42-backend
# El sufijo -backend permite trabajo paralelo en feature/GH-42-frontend
```

### 2. RED — Tests fallidos primero

Escribe los tests de Vitest en `tests/` **antes** de escribir ningún código de implementación. Los tests deben fallar al ejecutarse.

```bash
npm test  # todos los nuevos tests deben estar en RED
```

### 3. GREEN — Implementación mínima

Implementa en este orden estricto:

1. **Valibot schema** — `server/services/{domain}/{domain}Schema.ts`
2. **Entidad de dominio** — `server/domain/entities/` (si es nueva)
3. **Interfaz de repositorio** — `server/domain/repositories/` (si es nueva)
4. **Servicio** — `server/services/{domain}/{domain}Service.ts`
5. **Repositorio Prisma** — `server/infrastructure/` (si es nueva entidad)
6. **Handler H3** — `server/api/{resource}/{action}.{method}.ts`

Solo el código mínimo para que los tests pasen. Sin abstracciones prematuras.

### 4. REFACTOR

Limpieza sin romper tests: eliminar duplicación, mejorar nombres, extraer helpers solo si se usan en más de un sitio.

### 5. Calidad

```bash
npm run typecheck   # cero errores
npm run lint        # cero warnings
```

### 6. Commit y PR

```bash
git add <ficheros del issue>
git commit -m "GH-42: Add user creation endpoint"
git push -u origin feature/GH-42-backend
gh pr create --title "[GH-42] Add user creation" --body "Closes #42"
```

> Para staging complejo de ficheros parciales, usa `/commit 42` en su lugar.

## Ubicación de los tests

| Tipo | Carpeta |
|---|---|
| Tests unitarios (servicios, schemas, entidades) | `tests/` |
| Tests E2E | `e2e/` |
| Co-locados con la fuente | Solo para funciones de utilidad |

## Al terminar la sesión

Si la implementación queda incompleta, guarda el estado antes de cerrar:

```
Copia .claude/sessions/_template.md → .claude/sessions/context_session_GH-42.md
Rellena: paso actual, pasos completados, decisiones clave, preguntas abiertas.
```

En la siguiente sesión:

```
Lee .claude/sessions/context_session_GH-42.md y retoma GH-42 donde lo dejamos.
Antes de escribir código, confirma conmigo el siguiente paso.
```

## Puntos de control man-in-the-loop

Claude pausará y pedirá aprobación antes de:
- Mostrar el plan de tests (antes de escribirlos)
- Cada capa de implementación (muestra qué planea escribir)
- El commit final (muestra el diff)

Puedes rechazar cualquier paso y redirigir antes de que continúe.
