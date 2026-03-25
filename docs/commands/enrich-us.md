# /enrich-us

Enhances a rough GitHub Issue with full acceptance criteria, technical notes, and validation rules — so the developer can be fully autonomous when implementing.

## Usage

```
/enrich-us 42
```

## What it does

1. Reads the issue with `gh issue view 42`
2. Evaluates whether the story has sufficient detail (endpoints, fields, edge cases, test scenarios)
3. If not, produces an enhanced version
4. Updates the issue body in GitHub with `## [original]` and `## [enhanced]` sections
5. Switches the label from `needs-refinement` to `pending-validation`

## When to use it

Before running `/plan-backend-ticket` or `/plan-frontend-ticket`. A well-enriched issue means a better plan and fewer surprises during implementation.

## Output example

The enriched issue will contain:
- User story (persona, goal, benefit)
- Acceptance criteria in Given/When/Then format
- API endpoint specification (method, URL, request/response)
- Validation rules (field by field)
- Security requirements
- Edge cases
- Definition of Done checklist

## Skip it when

The issue already has detailed acceptance criteria, endpoint specs, and validation rules. Not every issue needs enrichment.
