# Estándares de documentación

> Referencia completa: `ai-specs/specs/documentation-standards.mdc`

## Fuentes de verdad

| Documento | Se actualiza cuando |
|---|---|
| `api-spec.yml` | Se añade, cambia o elimina un endpoint de API |
| `data-model.md` | Se añade o modifica un modelo de Prisma |
| `backend-standards.mdc` | Se establece un nuevo patrón o convención de backend |
| `frontend-standards.mdc` | Se establece un nuevo patrón o convención de frontend |
| Docs de VitePress (`docs/`) | Una nueva guía, estándar o comando merece documentarse públicamente |

## Reglas

- **Solo español en esta web** — el sitio público va en español para la audiencia objetivo
- **Código, specs e internos en inglés** — commits, nombres de variables, archivos `.mdc`, todo lo técnico sigue en inglés
- **Actualiza los docs en el mismo PR** que el cambio de código — nunca dejes los docs desincronizados
- El comando `/update-docs` se encarga de esto automáticamente al final de cada paso de implementación

## VitePress (este sitio)

Este sitio de documentación está construido con [VitePress](https://vitepress.dev) y desplegado en GitHub Pages.

### Ejecutar en local

```bash
npm run docs:dev
# Abre en http://localhost:5173
```

### Compilar

```bash
npm run docs:build
# Salida en docs/.vitepress/dist/
```

### Estructura

```
docs/
├── .vitepress/config.ts   ← Navegación, tema, metadatos del sitio
├── index.md               ← Página de inicio
├── guide/                 ← Guías de uso
├── standards/             ← Resúmenes de estándares técnicos
└── commands/              ← Referencia de slash commands
```

### Añadir una nueva página

1. Crea el archivo `.md` en la carpeta de sección correspondiente
2. Añádelo al `sidebar` en `docs/.vitepress/config.ts`
3. Enlázalo desde una página existente relevante

### Despliegue

Los pushes a `main` disparan el workflow de GitHub Actions en `.github/workflows/docs.yml`, que compila y publica en GitHub Pages automáticamente.
