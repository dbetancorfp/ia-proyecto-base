Please implement the GitHub Issue: $ARGUMENTS.

Follow these steps:

1. Get the issue details: `gh issue view $ARGUMENTS`
   - `$ARGUMENTS` may be an issue number (e.g. `42`) or a reference to the issue in progress.
2. Search the codebase for relevant files related to the issue.
3. Start a new branch named after the issue number: `feature/GH-$ISSUE_NUMBER-short-description`
   - Example: `feature/GH-42-user-authentication`
4. Implement the necessary changes to solve the issue, following the order of the different tasks and making sure you accomplish all of them in order, including writing and running tests to verify the solution, updating documentation, etc.
5. Ensure code passes linting and type checking.
6. Stage only the files affected by the issue, and leave any other changed files out of the commit. Write a descriptive commit message referencing the issue (e.g. `GH-42: Add user authentication endpoint`).
7. Push and create a PR using `gh pr create`. Include `Closes #$ISSUE_NUMBER` in the PR body so GitHub auto-closes the issue on merge.

Remember to use the GitHub CLI (`gh`) for all GitHub-related tasks.
