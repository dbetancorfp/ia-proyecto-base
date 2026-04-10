# Session Context: {feature-name} — GH-{N}

**Date**: YYYY-MM-DD
**Branch**: `feature/GH-N-backend` / `feature/GH-N-frontend`
**Session**: {N} of this feature

---

## Status

- [ ] Not started
- [ ] In progress  ← current
- [ ] Complete

---

## Completed This Session

- [x] Step 0: Feature branch created
- [x] Step 1: Failing tests written (RED)
- [x] Step 2: Valibot schema implemented

---

## In Progress (Incomplete)

- [ ] Step 3: Service method `{domain}Service.{method}()`
  - What's done: ...
  - What's pending: ...
  - Blocked by: ...

---

## Next Step (Start Here Next Session)

**Step N — {step name}**

```typescript
// Continue from this point in server/services/{domain}/{domain}Service.ts
// TODO: ...
```

---

## Key Decisions Made

| Decision | Rationale |
|---|---|
| ... | ... |

---

## Open Questions

| # | Question | Who to ask | Priority |
|---|---|---|---|
| 1 | ... | Tech Lead | High |

---

## Important Context

- ...

---

## Files Modified This Session

| File | Status |
|---|---|
| `server/services/...` | Created |
| `tests/...` | Created |

---

## How to Resume

Give Claude this prompt at the start of the next session:

```
Read .claude/sessions/context_session_{feature}.md and resume GH-N from where we left off.
Before writing any code, confirm with me what you plan to do next.
```
