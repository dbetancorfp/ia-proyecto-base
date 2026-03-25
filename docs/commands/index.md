# Slash Commands

Slash commands are pre-built prompts stored in `ai-specs/.commands/`. Type them in Claude Code to activate a specialized workflow step.

## Full list

| Command | When to use | Output |
|---|---|---|
| [`/enrich-us`](/commands/enrich-us) | GitHub Issue lacks detail | Enriched issue with acceptance criteria |
| [`/plan-backend-ticket`](/commands/plan-backend-ticket) | Before writing server code | `GH-N_backend.md` implementation plan |
| [`/plan-frontend-ticket`](/commands/plan-frontend-ticket) | Before writing frontend code | `GH-N_frontend.md` implementation plan |
| [`/develop-backend`](/commands/develop-backend) | Implement from backend plan | Feature branch + passing tests |
| [`/develop-frontend`](/commands/develop-frontend) | Implement from frontend plan | Feature branch + passing tests |
| [`/review-pr`](/commands/review-pr) | Before merging a PR | Review report posted as PR comment |
| [`/commit`](/commands/commit) | After implementation | Commit + PR with `Closes #N` |
| [`/deploy`](/commands/deploy) | After PR is merged | Deployment to staging or production |
| `/explain` | Any time | Teaching-mode explanation of selected code |
| `/update-docs` | After code changes | Syncs `api-spec.yml` and `data-model.md` |
| `/meta-prompt` | Improving a prompt | Refined version of the given prompt |

## How they work

Each command file in `ai-specs/.commands/` is a Markdown prompt template. Claude Code reads the file when you type the command, substitutes `$ARGUMENTS` with what you passed, and executes the instructions.

```
/plan-backend-ticket 42
         ↓
Claude reads ai-specs/.commands/plan-backend-ticket.md
Substitutes $ARGUMENTS = "42"
Runs: gh issue view 42
Generates: ai-specs/changes/GH-42_backend.md
```

## Arguments

Most commands accept a GitHub Issue number:

```
/enrich-us 42
/plan-backend-ticket 42
/develop-backend ai-specs/changes/GH-42_backend.md
/review-pr 42
```
