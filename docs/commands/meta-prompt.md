# /meta-prompt

Mejora un prompt existente aplicando buenas prácticas de ingeniería de prompts: rol, objetivo, formato, restricciones y ejemplos.

## Cuándo usarlo

- Cuando un prompt que usas habitualmente no da los resultados esperados
- Cuando quieres estructurar mejor una instrucción antes de convertirla en un slash command
- Cuando necesitas que Claude sea más preciso o exhaustivo en una tarea concreta

## Cómo usarlo

```
/meta-prompt [el prompt que quieres mejorar]
```

**Ejemplo:**

```
/meta-prompt Resume este artículo en 3 puntos clave
```

Claude analizará el prompt original y devolverá una versión mejorada con:
- **Rol** claro para el modelo
- **Objetivo** preciso y delimitado
- **Formato de salida** especificado
- **Restricciones** explícitas (qué no debe hacer)
- **Criterio de éxito** — cómo saber si el resultado es bueno

## Lo que NO hace

- No amplía el alcance del prompt original — se ciñe estrictamente a lo que pediste
- No añade objetivos que no estaban en el original
