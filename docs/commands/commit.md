# /commit

Crea un commit enfocado y abre un Pull Request. Gestiona automáticamente el scope, el staging y la descripción del PR.

## Uso

```
/commit          # hace commit de todos los cambios relevantes
/commit 42       # hace commit solo de los cambios del issue #42
/commit 42 43    # hace commit de los cambios de múltiples issues
```

## Qué hace

1. Ejecuta `git status` y `git diff` para inspeccionar todos los cambios
2. Si se dan números de issue: prepara solo los archivos pertenecientes a esos issues
3. Escribe un mensaje de commit descriptivo en inglés
4. Hace push de la rama
5. Crea (o actualiza) el PR con `Closes #42` en el cuerpo

## Formato del mensaje de commit

```
GH-42: Add user creation endpoint

- Valibot schema for CreateUserInput
- PrismaUserRepository.create() implementation
- UserService.create() with duplicate email check
- POST /api/users H3 handler
- 12 Vitest tests, 94% coverage
```

## Descripción del PR

El cuerpo del PR siempre incluye `Closes #42` para que GitHub cierre el issue automáticamente cuando se mergea el PR.

## Dry run (sin git)

```
/commit only description
```

Claude muestra el mensaje de commit propuesto y la lista de archivos sin ejecutar ningún comando de git.
