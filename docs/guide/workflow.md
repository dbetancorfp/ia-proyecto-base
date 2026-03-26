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

---

## Diagrama completo del flujo

Roles, agentes, ficheros y puntos de decisión man-in-the-loop para cada fase.

```mermaid
flowchart TD
    START(["🚀 Nueva funcionalidad"])

    subgraph CFG["⚙️ CONTEXTO DE SESIÓN — siempre activo"]
        CFG1["CLAUDE.md ──▶ ai-specs/specs/base-standards.mdc\n.claude/settings.json ──▶ MCPs: github · sequential-thinking · context7\nai-specs/specs/backend-standards.mdc  ·  frontend-standards.mdc"]
    end

    START --> CFG --> P1

    subgraph P1["🔍 FASE 1 · Discovery"]
        P1_WHO(["👤 Tú: BA + UX Researcher\n🤖 Claude: Analista"])
        P1_A["Reunión con cliente\nCaptura de requisitos"]
        P1_B["Análisis de pantallas Figma\nIdentificación de gaps y edge cases"]
        P1_AG(["🤖 Agente:\nproduct-strategy-analyst.md"])
        P1_D{"¿Requisitos\ncompletos?"}
        P1_F[/"📄 ai-specs/discovery/client-interviews/session-N.md\n📄 ai-specs/discovery/figma-analysis/feature-N.md"/]

        P1_WHO --> P1_A --> P1_B --> P1_AG --> P1_D
        P1_D -- "No" --> P1_A
        P1_D -- "Sí" --> P1_F
    end

    P1 --> P2

    subgraph P2["📋 FASE 2 · Specs y Planificación"]
        P2_WHO(["👤 Tú: Product Owner\n🤖 Claude: BA + Arquitecto"])
        P2_A["gh issue create\nIssue #N · label: needs-refinement"]
        P2_B["/enrich-us #N\nLee: gh issue view #N\nEscribe: issue body enriquecido\nCambia label ──▶ pending-validation"]
        P2_AG1(["🤖 Agente:\nproduct-strategy-analyst.md"])
        P2_D1{"👤 PO valida\nhistoria enriquecida"}
        P2_C["/plan-backend-ticket #N\nLee: Issue · backend-standards.mdc"]
        P2_AG2(["🤖 Agente:\nbackend-developer.md"])
        P2_E["/plan-frontend-ticket #N\nLee: Issue · frontend-standards.mdc"]
        P2_AG3(["🤖 Agente:\nfrontend-developer.md"])
        P2_D2{"👤 Tech Lead revisa\nambos planes"}
        P2_F[/"📄 GitHub Issue #N (enriquecido, label: ready)\n📄 ai-specs/changes/GH-N_backend.md\n📄 ai-specs/changes/GH-N_frontend.md"/]

        P2_WHO --> P2_A --> P2_B --> P2_AG1 --> P2_D1
        P2_D1 -- "Rechaza" --> P2_B
        P2_D1 -- "Aprueba" --> P2_C
        P2_D1 -- "Aprueba" --> P2_E
        P2_C --> P2_AG2 --> P2_D2
        P2_E --> P2_AG3 --> P2_D2
        P2_D2 -- "Corrige backend" --> P2_C
        P2_D2 -- "Corrige frontend" --> P2_E
        P2_D2 -- "Aprueba ✅" --> P2_F
    end

    P2 --> P3

    subgraph P3["🧪 FASE 3 · TDD — Tests primero"]
        P3_WHO(["👤 Tú: Tech Lead / QA\n🤖 Claude: QA Engineer"])
        P3_AG(["🤖 Agente:\nqa-engineer.md"])
        P3_A["Lee GH-N_backend.md · GH-N_frontend.md\nExtrae criterios de aceptación\nMapea criterio → caso de test"]
        P3_D1{"👤 Aprueba\nplan de tests"}
        P3_B["Escribe tests FALLIDOS\nVitest: server/services/__tests__/\nPlaywright: e2e/"]
        P3_D2{"¿Tests en\n🔴 rojo?"}
        P3_F[/"📄 server/services/__tests__/*.test.ts\n📄 e2e/*.spec.ts  (todos fallando — correcto en TDD)"/]

        P3_WHO --> P3_AG --> P3_A --> P3_D1
        P3_D1 -- "Rechaza" --> P3_A
        P3_D1 -- "Aprueba" --> P3_B --> P3_D2
        P3_D2 -- "No" --> P3_B
        P3_D2 -- "Sí ✅" --> P3_F
    end

    P3 --> P4

    subgraph P4["💻 FASE 4 · Implementación"]
        P4_WHO(["👤 Tú: Tech Lead — aprueba cada step\n🤖 Claude: Desarrollador"])

        subgraph P4B["🔵 Backend · feature/GH-N-backend"]
            B0["Step 0 · Crear rama"]
            B1["Step 1 · Valibot schema\nserver/domain/schemas/"]
            B2["Step 2 · Domain entity\nserver/domain/entities/"]
            B3["Step 3 · Repository interface\nserver/domain/repositories/"]
            B4["Step 4 · Prisma repository\nserver/infrastructure/repositories/"]
            B5["Step 5 · Service method\nserver/services/"]
            B6["Step 6 · H3 route handler\nserver/api/"]
            B7["npm run test ✅ · typecheck · lint"]
            B8["Docs: api-spec.yml · data-model.md"]
            B0-->B1-->B2-->B3-->B4-->B5-->B6-->B7-->B8
        end

        subgraph P4F["🟢 Frontend · feature/GH-N-frontend"]
            F0["Step 0 · Crear rama"]
            F1["Step 1 · Pinia Setup Store\napp/stores/"]
            F2["Step 2 · Composable\napp/composables/"]
            F3["Step 3 · Vue SFCs (PrimeVue)\napp/components/"]
            F4["Step 4 · Page\napp/pages/"]
            F5["Step 5 · Playwright E2E\ne2e/"]
            F6["Docs: frontend-standards.mdc"]
            F0-->F1-->F2-->F3-->F4-->F5-->F6
        end

        MITL{"👤 Man-in-the-loop\naprueba cada step"}
        P4_WHO --> B0
        P4_WHO --> F0
        B8 --> MITL
        F6 --> MITL
        MITL -- "Rechaza" --> B1
        MITL -- "Rechaza" --> F1
        MITL -- "Aprueba ✅" --> P4_F
        P4_F[/"📁 server/  ·  app/  completos\n📄 api-spec.yml  ·  data-model.md  actualizados"/]
    end

    P4 --> P5

    subgraph P5["🔎 FASE 5 · Revisión Pre-merge"]
        P5_WHO(["👤 Tú: Revisor\n🤖 Claude: Tech Lead + QA + Security"])
        P5_A["/review-pr #N\ngh pr diff · GH-N_backend.md · GH-N_frontend.md\nbackend-standards.mdc · frontend-standards.mdc\nsecurity-reviewer.md (OWASP Top 10)"]
        P5_AG(["🤖 Agente:\nsecurity-reviewer.md"])
        P5_F1[/"📄 ai-specs/changes/GH-N_security-review.md\n💬 Comentario en PR  (gh pr comment)"/]
        P5_D{"Veredicto"}
        P5_FIX["Developer corrige\nen rama feature/GH-N-*"]
        P5_B["/commit\ngit add · commit · push\ngh pr create 'Closes #N'"]
        P5_D2{"👤 Merge PR"}
        P5_F2[/"✅ PR mergeado en main\nIssue #N cerrado automáticamente"/]

        P5_WHO --> P5_A --> P5_AG --> P5_F1 --> P5_D
        P5_D -- "BLOCK / REQUEST CHANGES" --> P5_FIX --> P4
        P5_D -- "APPROVE" --> P5_B --> P5_D2
        P5_D2 -- "Rechaza" --> P5_A
        P5_D2 -- "Merge ✅" --> P5_F2
    end

    P5 --> P6

    subgraph P6["🚀 FASE 6 · Despliegue"]
        P6_WHO(["👤 Tú: Director\n🤖 Claude: DevOps"])
        P6_A["/deploy staging\nnpm test · typecheck · lint · scan secrets\ngh workflow run deploy.yml (staging)"]
        P6_D1{"👤 Verifica\nen staging"}
        P6_WARN["⚠️ CONFIRMACIÓN OBLIGATORIA\n'Afecta usuarios reales. Confirm? yes/no'"]
        P6_NO["❌ Deploy cancelado"]
        P6_B["/deploy production\ngh workflow run deploy.yml (production)\ngh run watch"]
        P6_C["curl /health · gh run list\nDeploy report generado"]
        P6_F[/"✅ Feature en producción\n.github/workflows/deploy.yml ejecutado"/]

        P6_WHO --> P6_A --> P6_D1
        P6_D1 -- "Falla ❌" --> P4
        P6_D1 -- "OK ✅" --> P6_WARN
        P6_WARN -- "no" --> P6_NO
        P6_WARN -- "yes" --> P6_B --> P6_C --> P6_F
    end

    P6 --> P7

    subgraph P7["📚 Documentación Continua"]
        DOC1["/update-docs\nSincroniza api-spec.yml · data-model.md\nActualiza docs/ (VitePress)"]
        DOC2["GitHub Actions · docs.yml\n──▶ GitHub Pages"]
        DOC1 --> DOC2
    end

    P7 --> DONE(["✅ Funcionalidad en producción\n+ docs actualizadas"])

    subgraph HANDOFF["💾 Handoff entre sesiones"]
        H1["Fin de sesión:\n.claude/sessions/context_session_GH-N.md\n(plantilla: ai-specs/handoffs/_template.md)"]
        H2["Inicio siguiente sesión:\nlee context_session_GH-N.md\nretoma desde el step pendiente"]
        H1 --> H2
    end
```
