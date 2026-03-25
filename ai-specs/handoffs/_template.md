# Handoff: {feature_name} — {GH-N}

**Date**: YYYY-MM-DD
**Session**: {N} of this feature
**Branch**: `feature/GH-N-{backend|frontend}`
**Next session starts at**: Step {N} — {step name}

---

## Status at End of Session

```
[ ] Not started
[ ] In progress  ← current
[ ] Complete
```

---

## Completed This Session

- [x] Step 0: Feature branch created (`feature/GH-N-backend`)
- [x] Step 1: Valibot schema in `server/services/auth/authSchema.ts`
- [x] Step 2: Service method `authService.login()` implemented and tested

---

## In Progress (Incomplete)

- [ ] Step 3: H3 event handler `server/api/auth/login.post.ts`
  - Valibot validation done
  - `login()` handler: **50% complete** — request parsing done, response mapping pending
  - Blocked by: decision on whether to return full user object or just ID (see open questions)

---

## Next Step (Start Here Next Session)

**Step 3 — Complete the login handler in `server/api/auth/login.post.ts`**

```typescript
// Continue from this point in server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  // readValidatedBody() is done
  // TODO: call authService.login(), map result to response, handle errors with createError()
});
```

---

## Key Decisions Made This Session

| Decision | Rationale |
|---|---|
| UUID as primary key | Client confirmed — consistent with existing entities |
| JWT expiry: 24h | Client confirmed |
| Bcrypt rounds: 12 | Balance between security and performance |

---

## Open Questions (Resolve Before Continuing)

| # | Question | Who to ask | Priority |
|---|---|---|---|
| 1 | Return full user object or just `{ id, email }` on login? | Tech Lead / Client | High |
| 2 | Should we invalidate other sessions on new login? | Client | Medium |

---

## Important Context for Next Session

- DB uses soft deletes: `deletedAt` field, never hard DELETE
- Auth middleware is at `server/middleware/auth.ts` — already implemented, just import it
- User entity is at `server/domain/entities/User.ts` — has `validatePassword()` method
- Tests are in `server/services/__tests__/authService.test.ts` — 8 tests, all passing

---

## Files Modified This Session

| File | Status |
|---|---|
| `server/services/auth/authSchema.ts` | Created — Valibot schema `loginSchema` |
| `server/services/auth/authService.ts` | Created — `login()` method |
| `server/services/auth/__tests__/authService.test.ts` | Created — 8 tests passing |
| `server/api/auth/login.post.ts` | Created — incomplete |

---

## How to Resume Next Session

Give Claude this prompt at the start of the next session:

```
Read ai-specs/handoffs/{feature}-handoff.md and
.claude/sessions/context_session_{feature}.md

Resume the implementation of GH-N from where we left off.
Start with the next step described in the handoff.
Before writing any code, confirm with me what you plan to do.
```
