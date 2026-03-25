# User Story: GH-{N} — {Title}

**Status**: To Refine / Refined / In Progress / Done
**Priority**: High / Medium / Low
**Milestone**: {milestone name or number}
**Source**: `ai-specs/discovery/client-interviews/{file}.md`

---

## Story

**As a** {type of user},
**I want to** {action or goal},
**so that** {business value or reason}.

---

## Acceptance Criteria

_Each criterion must be testable. Written in Given/When/Then format._

```
Given {initial context}
When {user action or event}
Then {expected outcome}
```

- [ ] **AC-1**: Given the user is not logged in, when they submit valid credentials, then they are redirected to /dashboard
- [ ] **AC-2**: Given the user submits an incorrect password, when the API returns 401, then an error message is shown without revealing which field is wrong
- [ ] **AC-3**: Given the user leaves the email field empty, when they click submit, then a validation error appears before the API is called

---

## Technical Notes

_Implementation hints for backend and frontend developers._

**Backend:**
- Endpoint: `POST /api/auth/login`
- Returns: `{ token: string, user: { id, email, role } }`
- Error codes: 401 (invalid credentials), 422 (validation error)

**Frontend:**
- Component: `LoginForm.tsx`
- On success: store token in httpOnly cookie, redirect to `/dashboard`
- On error: display `<Alert variant="danger">` with message from API

---

## Out of Scope

- OAuth login (Phase 2)
- Remember me / persistent sessions (Phase 3)

---

## Dependencies

- Requires: GH-{N} (User Registration) to be done first
- Blocks: GH-{N+1} (Dashboard access control)

---

## Definition of Done

- [ ] Backend endpoint implemented and tested (≥90% coverage)
- [ ] Frontend component implemented with error and loading states
- [ ] All acceptance criteria have corresponding tests
- [ ] Security review passed (`/review-pr`)
- [ ] `ai-specs/specs/api-spec.yml` updated
- [ ] PR approved and merged
