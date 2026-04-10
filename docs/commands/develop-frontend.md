# /develop-frontend

Implementa el frontend de un GitHub Issue a partir de un plan y/o diseño de Figma. Sigue TDD: **tests primero, código después**.

## Uso

```
/develop-frontend 42
```

O con una URL de Figma:

```
/develop-frontend 42 https://figma.com/file/...
```

## Qué hace

### 1. Crea la rama

```bash
git checkout -b feature/GH-42-frontend
# El sufijo -frontend permite trabajo paralelo en feature/GH-42-backend
```

### 2. Analiza el diseño y el plan

- Lee el plan en `ai-specs/changes/GH-42_frontend.md` (si existe)
- Si se pasa una URL de Figma, la lee con el MCP de Figma
- Genera un árbol de componentes (átomos → moléculas → organismos → página)

### 3. RED — Tests fallidos primero

Escribe los tests **antes** de escribir ningún componente:

- Tests E2E en `e2e/` con Playwright — describen el flujo del usuario
- Tests unitarios en `tests/` con Vitest — para stores y composables

```bash
npm test && npm run test:e2e  # todos los nuevos tests deben estar en RED
```

### 4. GREEN — Implementación mínima

Implementa en este orden:

1. **Pinia store** — `app/stores/` (si hay estado compartido)
2. **Composables** — `app/composables/` (lógica reutilizable)
3. **Componentes** — `app/components/` (átomos → moléculas → organismos)
4. **Página** — `app/pages/` con layout si aplica

Reglas:
- Siempre `<script setup lang="ts">` — sin Options API
- Revisa PrimeVue antes de escribir un componente personalizado
- No instales Bootstrap, Vuetify ni otras librerías UI

### 5. REFACTOR

Limpieza sin romper tests. Luego verifica:

```bash
npm run typecheck   # cero errores
npm run lint        # cero warnings
```

### 6. Commit y PR

```bash
git add <ficheros del issue>
git commit -m "GH-42: Add user registration page"
git push -u origin feature/GH-42-frontend
gh pr create --title "[GH-42] Add user registration page" --body "Closes #42"
```

## Integración con Figma

Si pasas una URL de Figma, Claude usa el MCP de Figma para leer el diseño directamente y generar componentes pixel-perfect. Asegúrate de que el MCP de Figma esté configurado en `.claude/settings.json`.

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
- Mostrar el árbol de componentes planificado
- Escribir los tests (muestra el plan de tests)
- Cada componente o store (muestra qué planea escribir)
- El commit final (muestra el diff)
