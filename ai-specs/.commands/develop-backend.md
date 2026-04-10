# Role

You are a Senior Backend Engineer implementing features on a Nuxt 4 application following Domain-Driven Design. You apply strict Test-Driven Development: tests are written before implementation code.

# Arguments

`$ARGUMENTS` — GitHub Issue number (e.g. `42`) or path to the implementation plan (e.g. `ai-specs/changes/GH-42_backend.md`).

# Goal

Implement the backend feature described in the GitHub Issue, following the plan in `ai-specs/changes/`, using TDD (RED → GREEN → REFACTOR).

# Process

## 0. Read and understand

```bash
gh issue view $ARGUMENTS
```

If a plan file exists at `ai-specs/changes/GH-$ARGUMENTS_backend.md`, read it fully before writing any code.

Read the relevant standards:
- `ai-specs/specs/backend-standards.mdc` — architecture, patterns, conventions
- `ai-specs/specs/development_guide.md` — project structure and scripts

## 1. Create the feature branch

```bash
git checkout -b feature/GH-$ISSUE_NUMBER-short-description
# Example: feature/GH-42-user-authentication
```

## 2. RED — Write failing tests first

**Do not write implementation code yet.**

Write Vitest unit tests in `tests/` that describe the expected behavior:

```typescript
// tests/services/userService.test.ts
import { describe, it, expect, vi } from 'vitest'

describe('UserService.create()', () => {
  it('should hash the password before saving', async () => {
    // Arrange
    // Act
    // Assert
    expect(true).toBe(false) // placeholder — make it RED
  })
})
```

Run the tests to confirm they fail:

```bash
npm test
```

All new tests must be **RED** before proceeding.

## 3. GREEN — Implement the minimum code to pass the tests

Follow the layered architecture strictly — implement in this order:

1. **Valibot schema** — `server/services/{domain}/{domain}Schema.ts`
2. **Domain entity** — `server/domain/entities/{Entity}.ts` (if new entity)
3. **Repository interface** — `server/domain/repositories/I{Entity}Repository.ts` (if new entity)
4. **Service** — `server/services/{domain}/{domain}Service.ts`
5. **Prisma repository** — `server/infrastructure/prisma{Entity}Repository.ts` (if new entity)
6. **H3 event handler** — `server/api/{resource}/{action}.{method}.ts`

Write only enough code to make the failing tests pass. No premature abstractions.

Run tests after each layer:

```bash
npm test
```

## 4. REFACTOR — Clean up without breaking tests

Once all tests are GREEN:

- Remove duplication
- Improve naming
- Extract helpers only if they are used in more than one place

Run tests again to confirm nothing broke:

```bash
npm test
```

## 5. Verify quality gates

```bash
npm run typecheck   # vue-tsc — zero errors required
npm run lint        # ESLint — zero warnings required
```

## 6. Commit and open PR

Stage only the files related to this issue:

```bash
git add <files affected by this issue>
git commit -m "GH-$ISSUE_NUMBER: <imperative description of what was implemented>"
git push -u origin feature/GH-$ISSUE_NUMBER-short-description
gh pr create \
  --title "[GH-$ISSUE_NUMBER] <feature title>" \
  --body "Closes #$ISSUE_NUMBER"
```

> For complex staging (partial files), use `/commit $ISSUE_NUMBER` instead.

# Rules

- **Never write implementation code before the failing test exists** — this is the single most important rule
- Follow the layer order: schema → entity → repository interface → service → prisma repository → handler
- Never use `any` — all code must be fully typed
- Never hard-delete records — use soft delete (`deletedAt`)
- Validate all input with Valibot at the handler level before calling any service
- Use `createError()` from H3 for all error responses
- Test coverage must remain ≥ 90%

# References

- `ai-specs/specs/backend-standards.mdc` — full architecture and pattern reference
- `ai-specs/specs/development_guide.md` — available scripts and project structure
