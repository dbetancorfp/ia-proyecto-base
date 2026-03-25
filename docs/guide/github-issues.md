# Working with GitHub Issues

All tickets in this project use **GitHub Issues** — no Jira, no Linear.

## Issue ID convention

GitHub Issues are just numbers (`#42`). In file names and branch names we use the `GH-N` prefix for clarity:

| Context | Format | Example |
|---|---|---|
| Branch name | `feature/GH-N-description` | `feature/GH-42-user-auth` |
| Plan file | `GH-N_backend.md` | `GH-42_backend.md` |
| Commit message | `GH-42: Add user auth endpoint` | — |
| PR body | `Closes #42` | auto-closes issue on merge |

## Labels

| Label | Meaning |
|---|---|
| `needs-refinement` | Story needs enrichment before planning |
| `pending-validation` | Enriched — waiting for Product Owner approval |
| `ready` | Approved and ready to plan/implement |
| `in-progress` | Currently being implemented |
| `blocked` | Waiting on a dependency or question |

## Workflow with commands

```bash
# 1. See open issues
gh issue list

# 2. View a specific issue
gh issue view 42

# 3. Enrich a rough issue (adds acceptance criteria)
/enrich-us 42

# 4. Generate backend implementation plan
/plan-backend-ticket 42

# 5. Generate frontend implementation plan
/plan-frontend-ticket 42

# 6. Implement
/develop-backend ai-specs/changes/GH-42_backend.md

# 7. Review before merge
/review-pr 42

# 8. Commit + PR (auto-closes issue)
/commit
```

## Session handoffs

When you need to stop mid-feature and resume later, save the session state:

```
Save the current session state to .claude/sessions/context_session_GH-42.md
Follow the template in ai-specs/handoffs/_template.md
```

To resume:
```
Read .claude/sessions/context_session_GH-42.md and resume where we left off.
Confirm the next step before writing any code.
```
