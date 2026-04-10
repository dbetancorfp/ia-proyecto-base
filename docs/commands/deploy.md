# /deploy

Despliega la aplicación a staging o producción mediante GitHub Actions. Siempre pide confirmación explícita antes de tocar producción.

## Uso

```
/deploy staging
/deploy production
/deploy staging feature/GH-42-backend
/deploy production v1.2.0
```

## Qué hace

### Comprobaciones previas al despliegue (siempre)

1. Confirma la rama o tag correcto
2. Ejecuta `npm test` — se detiene si algún test falla
3. Ejecuta `npm run test:e2e` — se detiene si algún test E2E falla
4. Ejecuta `npm run typecheck` y `npm run lint`
5. Escanea el diff en busca de secretos confirmados accidentalmente

### Despliegue a staging

```bash
gh workflow run deploy.yml --field environment=staging --field branch={branch}
gh run watch
```

Reporta la URL de staging y te pide que verifiques manualmente antes de continuar.

### Despliegue a producción

**Siempre pausa y muestra:**

```
⚠️  DESPLIEGUE A PRODUCCIÓN solicitado.
Rama/tag: main
Esto afectará a usuarios reales. ¿Confirmas? [yes/no]
```

Solo continúa después de tu `yes` explícito.

### Verificación post-despliegue

```bash
curl -f {APP_URL}/api/health
```

Reporta el resultado del health check y el enlace al workflow de GitHub Actions.

## Workflow de GitHub Actions

El archivo `.github/workflows/deploy.yml` contiene el pipeline de despliegue con:

- **Pre-deploy checks**: Vitest + Playwright + typecheck + lint
- **Build**: `npm run build` con variables de entorno de producción
- **Deploy**: paso configurable según el hosting provider (Fly.io, Railway, SSH…)
- **Health check**: verifica que `/api/health` responde tras el despliegue

> **Nota**: el step de deploy en `deploy.yml` incluye un `TODO` — debes reemplazarlo con el comando específico de tu proveedor de hosting antes de usar este comando.

## Variables de entorno necesarias en GitHub

Configura estos secrets en GitHub → Settings → Secrets → Actions:

| Secret | Descripción |
|---|---|
| `DATABASE_URL` | Conexión a la base de datos de producción |
| `NUXT_PUBLIC_APP_NAME` | Nombre de la aplicación |
| `JWT_SECRET` | Clave secreta para JWT |
| `APP_URL` | URL pública de la aplicación (para health check) |

## Reglas

- **Nunca despliega a producción sin confirmación en esta sesión**
- **Nunca omite las comprobaciones previas** — si los tests fallan, se detiene inmediatamente
- **Nunca hace force-push** durante el despliegue
- Reporta la URL del workflow de GitHub Actions para que puedas monitorear el progreso
- Si el despliegue falla: reporta el error y el enlace a los logs — no intenta corregirlo automáticamente
