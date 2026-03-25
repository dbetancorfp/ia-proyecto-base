# /plan-frontend-ticket

Generates a step-by-step frontend implementation plan for a GitHub Issue. **No code is written** — only the plan.

## Usage

```
/plan-frontend-ticket 42
```

## What it does

1. Reads the issue with `gh issue view 42`
2. Adopts the `frontend-developer` agent role
3. Analyses the requirements against `ai-specs/specs/frontend-standards.mdc`
4. Generates a detailed plan following the Nuxt frontend layer sequence
5. Saves the plan to `ai-specs/changes/GH-42_frontend.md`

## Plan structure

```
Step 0: Create feature branch (feature/GH-42-frontend)
Step 1: Pinia store (app/stores/) — if shared state needed
Step 2: Composable (app/composables/) — data fetching + logic
Step 3: Vue SFC components (app/components/) — PrimeVue
Step 4: Page (app/pages/) — file-based route
Step 5: Playwright E2E tests (e2e/)
Step N: Update documentation
```

## Man-in-the-loop

**Review the plan before running `/develop-frontend`.** Pay attention to:
- Which PrimeVue components are proposed (check they exist in v4)
- Whether a Pinia store is really needed or a composable suffices
- SSR considerations flagged in the plan
