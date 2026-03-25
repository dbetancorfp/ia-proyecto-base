# AI Roles

Claude can wear different hats depending on the workflow step. The key is giving it the right context and activation prompt for each role.

## Role map

| Step | Your hat | Claude's hat | Activation |
|---|---|---|---|
| Client meeting | Interviewer | Business Analyst | Direct prompt with notes |
| Figma review | UX Researcher | UX Analyst | Direct prompt with screenshots |
| Specs | Product Owner | BA + Architect | `/enrich-us`, `/plan-*-ticket` |
| TDD | Tech Lead / QA | QA Engineer | `/develop-backend`, `/develop-frontend` |
| Code | Tech Lead | Developer | Plan file reference |
| Review | Reviewer | DevSec + QA | `/review-pr` |
| Deploy | Director | DevOps | `/deploy` |

## Specialized agents

The `.agents/` folder defines five specialized roles. Claude adopts them automatically when you run the corresponding command.

### `product-strategy-analyst`
Activated during discovery. Analyses client notes, identifies value propositions, surfaces gaps in the user story.

### `backend-developer`
Activated by `/plan-backend-ticket`. Plans the server layer implementation following DDD layers (`server/api/` → `server/services/` → `server/domain/` → `server/infrastructure/`). **Never implements** — only plans.

### `frontend-developer`
Activated by `/plan-frontend-ticket`. Plans the Vue 3 + Pinia + PrimeVue implementation. **Never implements** — only plans.

### `qa-engineer`
Activated during TDD steps. Generates Vitest unit tests and Playwright E2E tests from acceptance criteria. Works from the spec, not from the code.

### `security-reviewer`
Activated by `/review-pr`. Audits the diff for OWASP Top 10, hardcoded secrets, missing auth middleware, and unvalidated input.

## Activating a role manually

You don't always need a slash command. You can activate any role with a direct prompt:

```
Act as the backend-developer agent defined in ai-specs/.agents/backend-developer.md
Read issue #42 with: gh issue view 42
Propose a step-by-step plan for the server layer.
Do NOT write any code yet.
```

```
Act as the security-reviewer agent.
Review the diff on branch feature/GH-42-backend
against the OWASP Top 10 checklist.
```

## Your role: Director

With AI, your primary role shifts from **doing** to **directing and validating**.

```
Without AI:  You write code → review → fix
With AI:     You define what → Claude does → you validate → approve or correct
```

This is the man-in-the-loop philosophy: **Claude proposes, you decide. Never the other way around.**
