# /plan-backend-ticket

Generates a step-by-step backend implementation plan for a GitHub Issue. **No code is written** — only the plan.

## Usage

```
/plan-backend-ticket 42
```

## What it does

1. Reads the issue with `gh issue view 42`
2. Adopts the `backend-developer` agent role
3. Analyses the requirements against `ai-specs/specs/backend-standards.mdc`
4. Generates a detailed plan following the DDD layer sequence
5. Saves the plan to `ai-specs/changes/GH-42_backend.md`

## Plan structure

```
Step 0: Create feature branch (feature/GH-42-backend)
Step 1: Valibot schema (server/domain/schemas/)
Step 2: Domain entity (server/domain/entities/)
Step 3: Repository interface (server/domain/repositories/)
Step 4: Prisma repository (server/infrastructure/repositories/)
Step 5: Service method (server/services/)
Step 6: H3 API route handler (server/api/)
Step 7: Vitest unit tests
Step N: Update documentation (api-spec.yml, data-model.md)
```

## Man-in-the-loop

**Review the plan before running `/develop-backend`.** The plan is your contract with Claude. If something looks wrong, correct it now — it's much cheaper to fix a plan than to undo implemented code.
