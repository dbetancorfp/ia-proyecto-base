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
3. Ejecuta `npm run typecheck` y `npm run lint`
4. Escanea el diff en busca de secretos confirmados accidentalmente

### Despliegue a staging
```bash
gh workflow run deploy.yml --field environment=staging --field branch={branch}
gh run watch
```

Reporta la URL de staging y te pide que verifiques manualmente.

### Despliegue a producción
**Siempre pausa y muestra:**
```
⚠️  DESPLIEGUE A PRODUCCIÓN solicitado.
Rama/tag: main
Esto afectará a usuarios reales. ¿Confirmas? [yes/no]
```

Solo continúa después de tu `yes` explícito.

## Reglas

- **Nunca despliega a producción sin confirmación en esta sesión**
- **Nunca omite las comprobaciones previas** — si los tests fallan, se detiene inmediatamente
- **Nunca hace force-push** durante el despliegue
- Reporta la URL del workflow de GitHub Actions para que puedas monitorear el progreso
- Si el despliegue falla: reporta el error y el enlace a los logs — no intenta corregirlo automáticamente
