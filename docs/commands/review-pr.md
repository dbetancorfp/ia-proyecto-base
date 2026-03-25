# /review-pr

Performs a pre-merge code review combining tech lead, QA, and security perspectives. Posts the result as a PR comment.

## Usage

```
/review-pr 42
```

Also accepts a branch name or PR number:

```
/review-pr feature/GH-42-backend
/review-pr 137
```

## What it checks

**Server layer (Nuxt `server/`):**
- DDD layers respected (no Prisma in services, no logic in H3 handlers)
- Valibot validation present before DB operations
- `createError()` with correct HTTP status codes

**Frontend layer (Nuxt `app/`):**
- `<script setup lang="ts">` — no Options API
- PrimeVue components used appropriately
- No `window`/`document` outside `onMounted`

**Both:**
- TypeScript strict typing (no `any`)
- No `console.log` in production paths
- Descriptive naming, DRY

**Tests:**
- AAA pattern, descriptive names
- Happy path + error paths covered
- 90% coverage threshold

**Security:**
- No hardcoded secrets
- Auth middleware on protected routes
- Parameterized Prisma queries

**Documentation:**
- `api-spec.yml` updated if endpoints changed
- `data-model.md` updated if schema changed

## Verdicts

| Verdict | Meaning |
|---|---|
| `APPROVE` | All checks passed — `gh pr review --approve` |
| `APPROVE WITH NOTES` | Minor warnings — address before next sprint |
| `REQUEST CHANGES` | Issues found — must fix before merge |
| `BLOCK` | Blocking issue — do not merge |
