# Iniciar un proyecto nuevo

Guía completa para llevar un proyecto desde cero hasta producción usando esta plantilla.

---

## Fase 0 — Preparación del entorno

### Prerequisitos

Antes de empezar, asegúrate de tener instalado:

- [Claude Code](https://claude.ai/code) (CLI o extensión de VS Code)
- [Git](https://git-scm.com/) y una cuenta de GitHub
- [Node.js](https://nodejs.org/) v20+
- [PostgreSQL 16](https://www.postgresql.org/) instalado localmente

### 1. Clonar la plantilla

```bash
git clone https://github.com/dbetancorfp/ia-proyecto-base.git mi-proyecto
cd mi-proyecto

# Limpiar el historial git de la plantilla
rm -rf .git
git init
git add .
git commit -m "Initial commit from ia-proyecto-base template"
```

### 2. Crear el repositorio en GitHub

```bash
# Crea el repo en GitHub y enlázalo
gh repo create mi-proyecto --public --source=. --remote=origin --push
```

### 3. Configurar el entorno local

```bash
# Instalar dependencias
npm install

# Crear el archivo de entorno
cp .env.example .env
```

Edita `.env` con tus valores reales:

```env
DATABASE_URL="postgresql://appuser:apppassword@localhost:5432/mi-proyecto-db"
NUXT_PUBLIC_APP_NAME="Mi Proyecto"
NODE_ENV=development
```

### 4. Crear la base de datos

```bash
psql -U postgres
```

```sql
CREATE USER appuser WITH PASSWORD 'apppassword';
CREATE DATABASE mi-proyecto-db OWNER appuser;
GRANT ALL PRIVILEGES ON DATABASE "mi-proyecto-db" TO appuser;
\q
```

---

## Fase 1 — Definir el dominio

Estos dos archivos son el punto de partida para que Claude entienda tu proyecto. Reemplaza los ejemplos que incluye la plantilla:

| Archivo | Qué escribir |
|---|---|
| `ai-specs/specs/data-model.md` | Tus entidades reales (usuarios, productos, pedidos…) y sus relaciones |
| `ai-specs/specs/api-spec.yml` | Los endpoints que necesita tu aplicación |

También actualiza la URL del repositorio en `ai-specs/specs/development_guide.md` (línea 17).

> **Consejo**: no hace falta tenerlo todo definido desde el principio. Empieza con las entidades principales y amplía a medida que avances.

---

## Fase 2 — Discovery con el cliente

Con el entorno listo y el dominio esbozado, arranca la colaboración con el cliente.

### Capturar requisitos

Guarda las notas de cada reunión en `ai-specs/discovery/client-interviews/` siguiendo la plantilla que hay en esa carpeta.

Si tienes diseños en Figma, guarda el análisis en `ai-specs/discovery/figma-analysis/`.

### Pedir ayuda a Claude

```
Lee ai-specs/discovery/client-interviews/sesion-01.md
Actúa como Analista de Negocio. Identifica ambigüedades, requisitos
faltantes y sugiere preguntas de aclaración para el cliente.
```

---

## Fase 3 — Crear y enriquecer los GitHub Issues

Cada funcionalidad que quieras desarrollar se convierte en un Issue de GitHub.

### Crear el Issue

```bash
gh issue create --title "Como usuario quiero registrarme" --body ""
```

### Enriquecer con `/enrich-us`

```
/enrich-us #1
```

Claude completará el Issue con criterios de aceptación, casos extremos y preguntas pendientes. **Tú revisas y apruebas** antes de continuar.

---

## Fase 4 — Planificar la implementación

Para cada Issue aprobado:

```
/plan-backend-ticket #1
```

o

```
/plan-frontend-ticket #1
```

Claude propone el plan de implementación paso a paso. **Tú apruebas el plan** antes de que escriba una sola línea de código.

---

## Fase 5 — Implementar con TDD

Con el plan aprobado:

```
/develop-backend #1
```

o

```
/develop-frontend #1
```

El flujo es siempre: **test fallido → implementación → test verde → refactor**. Claude trabaja en pasos pequeños y te pide confirmación en cada decisión irreversible.

Al terminar la sesión, Claude crea un handoff en `ai-specs/handoffs/` para que puedas retomar exactamente donde lo dejaste.

---

## Fase 6 — Revisar el código

Cuando el PR está listo:

```
/review-pr #1
```

Claude actúa como Revisor Senior y Security Reviewer. Puede aprobar, solicitar cambios o bloquear el PR. **Tú decides si mergear.**

```bash
# Si todo está bien
gh pr merge 1 --squash
```

---

## Fase 7 — Desplegar

```
/deploy
```

Claude te guía a través del checklist de pre-despliegue, verifica que los tests pasen y te acompaña en el proceso de release. **Tú ejecutas cada comando.**

---

## Resumen del ciclo

```mermaid
flowchart TD
    START["Nuevo proyecto"] --> F0

    F0["Fase 0\nPreparar entorno + clonar plantilla"]
    F1["Fase 1\nDefinir dominio\ndata-model + api-spec"]
    F2["Fase 2\nDiscovery con el cliente"]
    F3["Fase 3\nCrear + enriquecer Issues\n/enrich-us"]
    F4["Fase 4\nPlanificar implementación\n/plan-backend-ticket · /plan-frontend-ticket"]
    F5["Fase 5\nImplementar con TDD\n/develop-backend · /develop-frontend"]
    F6["Fase 6\nRevisar PR\n/review-pr"]
    F7["Fase 7\nDesplegar\n/deploy"]
    PROD["Funcionalidad en producción"]

    F0 --> F1 --> F2 --> F3 --> F4 --> F5 --> F6 --> F7 --> PROD
    PROD -->|"Nueva funcionalidad"| F2

    style START fill:#6366f1,color:#fff,stroke:none
    style PROD fill:#22c55e,color:#fff,stroke:none
    style F0 fill:#e0e7ff,stroke:#6366f1
    style F1 fill:#e0e7ff,stroke:#6366f1
    style F2 fill:#fef9c3,stroke:#eab308
    style F3 fill:#fef9c3,stroke:#eab308
    style F4 fill:#fef9c3,stroke:#eab308
    style F5 fill:#fef9c3,stroke:#eab308
    style F6 fill:#fef9c3,stroke:#eab308
    style F7 fill:#fef9c3,stroke:#eab308
```

Cada iteración del ciclo (fases 2–7) produce una funcionalidad en producción. El ciclo se repite para cada nuevo Issue.
