# Resumen del flujo de trabajo

Cada funcionalidad sigue el mismo flujo de seis pasos. Cada paso tiene un rol definido, un comando de Claude y un artefacto de salida.

```
Cliente/Figma → Specs → TDD → Código → Revisión → Despliegue
      ↑            ↑       ↑      ↑          ↑           ↑
  Prompts       Agentes Handoffs Man-in-loop           gh CLI
```

## Paso 1 — Discovery (Cliente / Figma)

**Tu rol**: Analista de negocio + Investigador UX
**Rol de Claude**: Analista — detecta vacíos, sugiere preguntas de aclaración

### Qué haces
1. Toma notas durante la reunión con el cliente → guárdalas en `ai-specs/discovery/client-interviews/`
2. Captura pantallas de Figma → guarda el análisis en `ai-specs/discovery/figma-analysis/`
3. Pídele a Claude que identifique requisitos faltantes y casos extremos

### Ejemplo de prompt
```
Lee ai-specs/discovery/client-interviews/sesion-01.md
Actúa como Analista de Negocio. Identifica ambigüedades, requisitos faltantes
y sugiere 5 preguntas de aclaración para el cliente.
```

### Salida
Notas estructuradas + lista de preguntas resueltas

---

## Paso 2 — Specs

**Tu rol**: Product Owner
**Rol de Claude**: BA + Arquitecto

### Qué haces
1. Ejecuta `/enrich-us #N` para enriquecer un GitHub Issue sin detalle
2. Revisa la historia enriquecida — aprueba o corrige
3. Ejecuta `/plan-backend-ticket #N` y `/plan-frontend-ticket #N`
4. Revisa ambos planes antes de que se escriba cualquier código

### Salida
- GitHub Issue enriquecido con criterios de aceptación
- `ai-specs/changes/GH-N_backend.md`
- `ai-specs/changes/GH-N_frontend.md`

---

## Paso 3 — TDD

**Tu rol**: Tech Lead / QA
**Rol de Claude**: Ingeniero QA

Los tests se escriben **a partir del plan**, antes de cualquier implementación.

```
/develop-backend GH-N_backend.md
```

Claude escribe primero los tests fallidos, espera tu aprobación y luego implementa.

### Salida
Suite de tests en rojo (fallando) — esto es correcto en TDD ✅

---

## Paso 4 — Código

**Tu rol**: Tech Lead (supervisando)
**Rol de Claude**: Desarrollador

Claude implementa el código mínimo para que los tests pasen, siguiendo el plan paso a paso. Tú apruebas cada archivo antes de que se escriba.

### Salida
Todos los tests pasando en `feature/GH-N-backend` y `feature/GH-N-frontend`

---

## Paso 5 — Revisión

**Tu rol**: Revisor
**Rol de Claude**: Seguridad + QA + Tech Lead

```
/review-pr #N
```

Claude revisa el diff contra los estándares, publica el informe como comentario en el PR y lo aprueba o bloquea.

### Salida
PR aprobado (o lista de cambios requeridos antes del merge)

---

## Paso 6 — Despliegue

**Tu rol**: Director
**Rol de Claude**: DevOps

```
/deploy staging
```

Claude ejecuta las comprobaciones previas al despliegue (tests, lint, typecheck), lanza el workflow de GitHub Actions y espera tu aprobación explícita antes de tocar producción.

```
/deploy production
```

### Salida
Funcionalidad en producción + documentación actualizada

---

## La regla de oro

> **Más riesgo → más control tuyo. Menos riesgo → más autonomía para Claude.**

| Acción | Autonomía de Claude |
|---|---|
| Escribir un test | Alta — fácil de revertir |
| Escribir lógica de negocio | Media — lo revisas antes de aprobar |
| Crear un commit | Media — ves el diff primero |
| Abrir un PR | Baja — afecta a otros |
| Desplegar a producción | Mínima — irreversible |
