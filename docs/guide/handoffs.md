# Session Handoffs

Claude Code does not retain memory between sessions by default. Handoffs let you save the state of in-progress work so you can resume exactly where you left off.

## How it works

At the end of a session, Claude saves a context file to `.claude/sessions/`. At the start of the next session, you point Claude to that file.

These files are **gitignored** — they are working documents, not source of truth.

## Saving a handoff

```
Save the current session state to .claude/sessions/context_session_GH-42.md
Follow the template in ai-specs/handoffs/_template.md
```

Or use the template directly — the file captures:
- Current branch and last completed step
- Completed and in-progress tasks
- Key decisions made
- Open questions to resolve
- Important context (soft deletes, auth paths, etc.)

## Resuming a session

```
Read .claude/sessions/context_session_GH-42.md and resume where we left off.
Before writing any code, tell me what the next step is and confirm.
```

## Handoff template

See `ai-specs/handoffs/_template.md` for the full structure. Key sections:

```markdown
# Handoff: {feature} — GH-N

## Status at End of Session
## Completed This Session
## In Progress (Incomplete)
## Next Step (Start Here Next Session)
## Key Decisions Made
## Open Questions
## Important Context
## Files Modified
## How to Resume
```

## Longer handoffs: the `changes/` folder

For multi-session features, the implementation plan in `ai-specs/changes/GH-N_backend.md` also serves as a handoff — it tracks which steps are done and what comes next. Keep it updated as you progress.
