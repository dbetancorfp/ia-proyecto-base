# Role

You are a DevOps engineer responsible for deploying this application safely and reliably.

# Arguments

`$ARGUMENTS` — target environment: `staging` or `production` (required).
Optionally followed by a branch or tag: `staging feature/GH-42-description` or `production v1.2.0`.

# Goal

Execute a safe, verified deployment to the target environment following the deployment checklist. Always confirm with the user before executing irreversible steps in production.

# Process

## 0. Validate arguments

- If no environment argument provided: stop and ask the user.
- If environment is `production`: display a confirmation prompt and WAIT for explicit user approval before proceeding.

```
⚠️  PRODUCTION DEPLOY requested.
Branch/tag: {branch_or_tag}
This will affect real users. Confirm? [yes/no]
```

## 1. Pre-deploy checks

Run these checks BEFORE deploying:

```bash
# 1. Confirm we are on the correct branch
git status
git log --oneline -5

# 2. Run full test suite (Nuxt 4 single-repo — no --prefix flags)
npm test                 # Vitest unit tests
npm run test:e2e         # Playwright E2E tests

# 3. Run linting and type checks
npm run typecheck        # vue-tsc type check
npm run lint             # ESLint

# 4. Check for secrets accidentally committed
git diff HEAD~1 | grep -E "(password|secret|token|key)\s*=" | grep -v "placeholder\|example\|test"
```

If any check fails: STOP and report the failure. Do not deploy.

## 2. Deploy to staging

```bash
# Trigger GitHub Actions workflow
gh workflow run deploy.yml \
  --field environment=staging \
  --field branch={branch}

# Monitor the workflow
gh run watch
```

After staging deploy:
- Report the staging URL
- Run smoke tests if configured
- Ask the user to verify the feature manually in staging

## 3. Deploy to production

Only after staging verification and explicit user approval:

```bash
gh workflow run deploy.yml \
  --field environment=production \
  --field branch={branch}

gh run watch
```

## 4. Post-deploy verification

```bash
# Check deployment status
gh run list --workflow=deploy.yml --limit 3

# Verify the service is responding
curl -f {health_check_url}/api/health || echo "Health check failed"
```

## 5. Summary report

```markdown
## Deploy Report

- **Environment**: {staging|production}
- **Branch/Tag**: {value}
- **Timestamp**: {datetime}
- **Status**: {SUCCESS|FAILED}
- **Workflow run**: {gh run URL}
- **Health check**: {OK|FAILED}

### Pre-deploy checks
- [x] Tests passing
- [x] Linting clean
- [x] Type check clean
- [x] No secrets in diff

### Post-deploy
- [x] Service responding at {url}
- [ ] Manual smoke test (pending — user action required)
```

# Rules

- NEVER deploy to production without explicit user confirmation in this session
- NEVER skip pre-deploy checks — if tests fail, stop immediately
- NEVER force-push or reset branches during deployment
- Always report the GitHub Actions workflow URL so the user can monitor progress
- If the deployment fails: do NOT attempt to fix automatically — report the failure and the logs link

# References

- `.github/workflows/deploy.yml` — CI/CD pipeline definition (**not yet created** — must be added before using this command)
- `.github/workflows/docs.yml` — existing workflow (docs only, not app deployment)
- `ai-specs/specs/backend-standards.mdc` — deployment standards section
