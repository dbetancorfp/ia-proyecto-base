# /commit

Creates a focused commit and opens a Pull Request. Handles scope, staging, and PR description automatically.

## Usage

```
/commit          # commit all relevant changes
/commit 42       # commit only changes for issue #42
/commit 42 43    # commit changes for multiple issues
```

## What it does

1. Runs `git status` and `git diff` to inspect all changes
2. If issue numbers given: stages only files belonging to those issues
3. Writes a descriptive commit message in English
4. Pushes the branch
5. Creates (or updates) the PR with `Closes #42` in the body

## Commit message format

```
GH-42: Add user creation endpoint

- Valibot schema for CreateUserInput
- PrismaUserRepository.create() implementation
- UserService.create() with duplicate email check
- POST /api/users H3 handler
- 12 Vitest tests, 94% coverage
```

## PR description

The PR body always includes `Closes #42` so GitHub auto-closes the issue when the PR is merged.

## Dry run (no git)

```
/commit only description
```

Claude outputs the proposed commit message and file list without running any git commands.
