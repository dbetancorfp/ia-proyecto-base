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
- [x] Step 1: Validation function in `src/application/validator.ts`
- [x] Step 2: Service method `authService.login()` implemented and tested

---

## In Progress (Incomplete)

- [ ] Step 3: Express controller `authController.ts`
  - `validate()` method done
  - `login()` handler: **50% complete** — request parsing done, response mapping pending
  - Blocked by: decision on whether to return full user object or just ID (see open questions)

---

## Next Step (Start Here Next Session)

**Step 3 — Complete the login handler in `authController.ts`**

```typescript
// Continue from this point in src/presentation/controllers/authController.ts
async login(req: Request, res: Response): Promise<void> {
  // validate() is done
  // TODO: call authService.login(), map result to response, handle errors
}
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
- Auth middleware is at `src/presentation/middleware/auth.ts` — already implemented, just import it
- User entity is at `src/domain/entities/User.ts` — has `validatePassword()` method
- Tests are in `src/application/__tests__/authService.test.ts` — 8 tests, all passing

---

## Files Modified This Session

| File | Status |
|---|---|
| `src/application/validator.ts` | Modified — added `validateLoginInput()` |
| `src/application/authService.ts` | Created — `login()` method |
| `src/application/__tests__/authService.test.ts` | Created — 8 tests passing |
| `src/presentation/controllers/authController.ts` | Created — incomplete |

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
