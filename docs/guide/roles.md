# Roles de IA

Claude puede adoptar distintos roles según el paso del flujo de trabajo. La clave es darle el contexto y el prompt de activación correctos para cada rol.

## Mapa de roles

| Paso | Tu sombrero | Sombrero de Claude | Activación |
|---|---|---|---|
| Reunión con cliente | Entrevistador | Analista de Negocio | Prompt directo con notas |
| Revisión de Figma | Investigador UX | Analista UX | Prompt directo con capturas |
| Specs | Product Owner | BA + Arquitecto | `/enrich-us`, `/plan-*-ticket` |
| TDD | Tech Lead / QA | Ingeniero QA | `/develop-backend`, `/develop-frontend` |
| Código | Tech Lead | Desarrollador | Referencia al archivo del plan |
| Revisión | Revisor | DevSec + QA | `/review-pr` |
| Despliegue | Director | DevOps | `/deploy` |

## Agentes especializados

La carpeta `.agents/` define cinco roles especializados. Claude los adopta automáticamente cuando ejecutas el comando correspondiente.

### `product-strategy-analyst`
Se activa durante el discovery. Analiza las notas del cliente, identifica propuestas de valor y detecta vacíos en la historia de usuario.

### `backend-developer`
Se activa con `/plan-backend-ticket`. Planifica la implementación de la capa de servidor siguiendo las capas DDD (`server/api/` → `server/services/` → `server/domain/` → `server/infrastructure/`). **Nunca implementa** — solo planifica.

### `frontend-developer`
Se activa con `/plan-frontend-ticket`. Planifica la implementación de Vue 3 + Pinia + PrimeVue. **Nunca implementa** — solo planifica.

### `qa-engineer`
Se activa durante los pasos de TDD. Genera tests unitarios con Vitest y tests E2E con Playwright a partir de los criterios de aceptación. Trabaja a partir del spec, no del código.

### `security-reviewer`
Se activa con `/review-pr`. Audita el diff buscando el OWASP Top 10, secretos hardcodeados, middleware de autenticación faltante e inputs sin validar.

## Activar un rol manualmente

No siempre necesitas un slash command. Puedes activar cualquier rol con un prompt directo:

```
Actúa como el agente backend-developer definido en ai-specs/.agents/backend-developer.md
Lee el issue #42 con: gh issue view 42
Propón un plan paso a paso para la capa de servidor.
NO escribas ningún código todavía.
```

```
Actúa como el agente security-reviewer.
Revisa el diff de la rama feature/GH-42-backend
contra el checklist OWASP Top 10.
```

## Tu rol: Director

Con IA, tu rol principal pasa de **hacer** a **dirigir y validar**.

```
Sin IA:   Tú escribes código → revisas → corriges
Con IA:   Tú defines qué → Claude hace → tú validas → apruebas o corriges
```

Esta es la filosofía man-in-the-loop: **Claude propone, tú decides. Nunca al revés.**
