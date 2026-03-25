Please analyze and enhance the GitHub Issue: $ARGUMENTS.

Follow these steps:

1. Use the GitHub CLI to get the issue details: `gh issue view $ARGUMENTS`
   - `$ARGUMENTS` may be an issue number (e.g. `42`), a keyword, or a phrase describing the issue in progress.
   - If a number is not provided, run `gh issue list` and identify the matching issue.
2. You will act as a product expert with technical knowledge.
3. Understand the problem described in the issue.
4. Decide whether or not the User Story is completely detailed according to product best practices:
   - Full description of the functionality
   - Comprehensive list of fields to be updated
   - Structure and URLs of the necessary endpoints
   - Files to be modified according to the architecture and best practices
   - Steps required for the task to be considered complete
   - How to update any relevant documentation or create unit tests
   - Non-functional requirements related to security, performance, etc.
5. If the user story lacks the technical and specific detail necessary to allow the developer to be fully autonomous when completing it, produce an improved story that is clearer, more specific, and more concise in line with the product best practices described in step 4. Use the technical context you will find in `@documentation`. Return it in markdown format.
6. Update the issue body in GitHub by appending the enhanced content after the original, clearly separated with the headings `## [original]` and `## [enhanced]`. Use proper markdown formatting (lists, code blocks, etc.).
   - Run: `gh issue edit $ISSUE_NUMBER --body "$(combined content)"`
7. If the issue has the label `needs-refinement`, replace it with `pending-validation`:
   - `gh issue edit $ISSUE_NUMBER --remove-label "needs-refinement" --add-label "pending-validation"`
