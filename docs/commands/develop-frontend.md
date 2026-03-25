# /develop-frontend

Implementa el plan de frontend generado por `/plan-frontend-ticket`. Trabaja a partir de Figma + plan, produce SFCs de Vue 3 con PrimeVue y tests de Playwright.

## Uso

```
/develop-frontend ai-specs/changes/GH-42_frontend.md
```

O con una URL de Figma:

```
/develop-frontend 42 https://figma.com/file/...
```

## Qué hace

1. Lee el archivo del plan (y el diseño de Figma si se proporciona)
2. Crea la rama `feature/GH-42-frontend`
3. Implementa en orden: store → composable → componentes → página → tests
4. Todos los componentes usan `<script setup lang="ts">` — sin Options API
5. Usa componentes de PrimeVue — sin UI personalizada para cosas que PrimeVue cubre
6. Escribe tests E2E con Playwright y tests de componentes con Vitest
7. Hace commit y abre un PR con `Closes #42`

## Integración con Figma

Si pasas una URL de Figma, Claude usa el MCP de Figma para leer el diseño directamente y generar componentes pixel-perfect. Asegúrate de que el MCP de Figma esté configurado en `.claude/settings.json`.
