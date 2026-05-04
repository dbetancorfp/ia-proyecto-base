Crea un nuevo componente Lit Web Component para el renderer de esta aplicación Electron.

Nombre del componente: $ARGUMENTS

Sigue estas convenciones del proyecto:
- Archivo en `src/renderer/src/components/<nombre>.ts`
- Nombre del custom element en kebab-case (ej: `grade-card`)
- Clase en PascalCase (ej: `GradeCard`)
- Shadow DOM activo (no sobreescribir `createRenderRoot`)
- CSS con variables globales del proyecto (`var(--color-primary)`, `var(--space-4)`, etc.)
- Decoradores `@customElement`, `@property`, `@state` de `lit/decorators.js`
- TypeScript estricto, tipos importados desde `../../../shared/types` si aplica
- Sin comentarios salvo que el WHY sea no obvio

Después de crear el archivo, muéstrame cómo importarlo en el componente padre que corresponda.
