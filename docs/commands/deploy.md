# /deploy

Deploys the application to staging or production via GitHub Actions. Always asks for explicit confirmation before touching production.

## Usage

```
/deploy staging
/deploy production
/deploy staging feature/GH-42-backend
/deploy production v1.2.0
```

## What it does

### Pre-deploy checks (always)
1. Confirms the correct branch/tag
2. Runs `npm test` — stops if any test fails
3. Runs `npm run typecheck` and `npm run lint`
4. Scans the diff for accidentally committed secrets

### Staging deploy
```bash
gh workflow run deploy.yml --field environment=staging --field branch={branch}
gh run watch
```

Reports the staging URL and asks you to verify manually.

### Production deploy
**Always pauses and displays:**
```
⚠️  PRODUCTION DEPLOY requested.
Branch/tag: main
This will affect real users. Confirm? [yes/no]
```

Only proceeds after your explicit `yes`.

## Rules

- **Never deploys to production without confirmation in this session**
- **Never skips pre-deploy checks** — if tests fail, stops immediately
- **Never force-pushes** during deployment
- Reports the GitHub Actions workflow URL so you can monitor progress
- If deployment fails: reports the error and logs link — does not attempt to auto-fix
