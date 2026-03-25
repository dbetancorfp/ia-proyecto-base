# Workflow Overview

Every feature follows the same six-step flow. Each step has a defined role, a Claude command, and an output artefact.

```
Client/Figma → Specs → TDD → Code → Review → Deploy
     ↑            ↑       ↑      ↑       ↑        ↑
  Prompts      Agents  Handoffs  Man-in-loop     gh CLI
```

## Step 1 — Discovery (Client / Figma)

**Your role**: Business Analyst + UX Researcher
**Claude's role**: Analyst — surfaces gaps, suggests clarifying questions

### What you do
1. Take notes during the client meeting → save to `ai-specs/discovery/client-interviews/`
2. Screenshot Figma screens → save analysis to `ai-specs/discovery/figma-analysis/`
3. Ask Claude to identify missing requirements and edge cases

### Prompt example
```
Read ai-specs/discovery/client-interviews/session-01.md
Act as a Business Analyst. Identify ambiguities, missing requirements,
and suggest 5 clarifying questions for the client.
```

### Output
Structured notes + list of resolved questions

---

## Step 2 — Specs

**Your role**: Product Owner
**Claude's role**: BA + Architect

### What you do
1. Run `/enrich-us #N` to enhance a rough GitHub Issue
2. Review the enriched story — approve or correct
3. Run `/plan-backend-ticket #N` and `/plan-frontend-ticket #N`
4. Review both plans before any code is written

### Output
- Enriched GitHub Issue with acceptance criteria
- `ai-specs/changes/GH-N_backend.md`
- `ai-specs/changes/GH-N_frontend.md`

---

## Step 3 — TDD

**Your role**: Tech Lead / QA
**Claude's role**: QA Engineer

Tests are written **from the plan**, before any implementation.

```
/develop-backend GH-N_backend.md
```

Claude writes failing tests first, waits for your approval, then implements.

### Output
Test suite in red (failing) — this is correct in TDD ✅

---

## Step 4 — Code

**Your role**: Tech Lead (supervising)
**Claude's role**: Developer

Claude implements the minimum code to make tests pass, following the plan step by step. You approve each file before it is written.

### Output
All tests passing on `feature/GH-N-backend` and `feature/GH-N-frontend`

---

## Step 5 — Review

**Your role**: Reviewer
**Claude's role**: Security + QA + Tech Lead

```
/review-pr #N
```

Claude reviews the diff against standards, posts the report as a PR comment, and either approves or blocks.

### Output
PR approved (or list of required changes before merge)

---

## Step 6 — Deploy

**Your role**: Director
**Claude's role**: DevOps

```
/deploy staging
```

Claude runs pre-deploy checks (tests, lint, typecheck), triggers the GitHub Actions workflow, and waits for your explicit approval before touching production.

```
/deploy production
```

### Output
Feature live in production + documentation updated

---

## The golden rule

> **More risk → more control from you. Less risk → more autonomy for Claude.**

| Action | Claude autonomy |
|---|---|
| Write a test | High — easy to revert |
| Write business logic | Medium — you review before approving |
| Create a commit | Medium — you see the diff first |
| Open a PR | Low — affects others |
| Deploy to production | Minimum — irreversible |
