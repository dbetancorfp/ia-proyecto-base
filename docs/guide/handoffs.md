# Handoffs de sesión

Claude Code no retiene memoria entre sesiones por defecto. Los handoffs te permiten guardar el estado del trabajo en curso para poder retomarlo exactamente donde lo dejaste.

## Cómo funciona

Al final de una sesión, Claude guarda un archivo de contexto en `.claude/sessions/`. Al inicio de la siguiente sesión, apuntas a Claude a ese archivo.

Estos archivos están en el **gitignore** — son documentos de trabajo, no fuente de verdad.

## Guardar un handoff

```
Guarda el estado actual de la sesión en .claude/sessions/context_session_GH-42.md
Sigue la plantilla en ai-specs/handoffs/_template.md
```

O usa la plantilla directamente — el archivo captura:
- Rama actual y último paso completado
- Tareas completadas y en curso
- Decisiones clave tomadas
- Preguntas abiertas a resolver
- Contexto importante (soft deletes, rutas de auth, etc.)

## Retomar una sesión

```
Lee .claude/sessions/context_session_GH-42.md y retoma donde lo dejamos.
Antes de escribir cualquier código, dime cuál es el siguiente paso y confírmalo.
```

## Plantilla de handoff

Consulta `ai-specs/handoffs/_template.md` para la estructura completa. Secciones clave:

```markdown
# Handoff: {feature} — GH-N

## Estado al final de la sesión
## Completado esta sesión
## En progreso (incompleto)
## Siguiente paso (empieza aquí la próxima sesión)
## Decisiones clave tomadas
## Preguntas abiertas
## Contexto importante
## Archivos modificados
## Cómo retomar
```

## Handoffs más largos: la carpeta `changes/`

Para funcionalidades de múltiples sesiones, el plan de implementación en `ai-specs/changes/GH-N_backend.md` también sirve como handoff — registra qué pasos están hechos y cuáles vienen a continuación. Mantenlo actualizado a medida que avanzas.
