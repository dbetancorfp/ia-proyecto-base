# Getting Started

## What is this?

**IA Proyecto Base** is a project template for building web applications with AI assistance using Claude Code.

It provides:
- A structured **development workflow** (client → specs → TDD → code → review → deploy)
- **Slash commands** that activate specialized AI roles at each step
- **Standards files** that tell Claude exactly how to write code for your stack
- **Templates** for discovery, user stories, handoffs, and implementation plans

The tech stack is **Nuxt 4** (fullstack), **Vue 3**, **Pinia**, **PrimeVue 4**, **Prisma 7**, **Vitest**, and **Playwright** — all pre-configured in the standards files.

## Prerequisites

- [Claude Code](https://claude.ai/code) installed (CLI or VS Code extension)
- [Git](https://git-scm.com/) and a GitHub account
- [Node.js](https://nodejs.org/) v20+
- [Docker](https://www.docker.com/) (for PostgreSQL in development)

## Import into your project

```bash
# Clone this template
git clone https://github.com/dbetancorfp/ia-proyecto-base.git my-project
cd my-project

# Remove the template's git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit from ia-proyecto-base template"
```

## Adapt to your project

The files in `ai-specs/specs/` are the core of the template. You need to update them before starting:

| File | What to update |
|---|---|
| `specs/base-standards.mdc` | Core principles — leave as-is unless you have specific rules |
| `specs/backend-standards.mdc` | Already configured for Nuxt 4 server layer |
| `specs/frontend-standards.mdc` | Already configured for Vue 3 + Pinia + PrimeVue |
| `specs/development_guide.md` | Update repo URL and any project-specific setup steps |
| `specs/api-spec.yml` | Replace the User example with your own domain |
| `specs/data-model.md` | Replace the User example with your own entities |

## Configure MCPs (optional but recommended)

The `.claude/settings.json` includes three MCPs:

```json
{
  "mcpServers": {
    "github": { ... },          // gh CLI integration
    "sequential-thinking": { ... },  // structured reasoning
    "context7": { ... }         // library docs lookup
  }
}
```

Add your `GITHUB_TOKEN` to `.env.local`:
```bash
GITHUB_TOKEN=ghp_your_token_here
```

## Start your first session

Open the project in VS Code with the Claude Code extension, then try:

```
/explain
```

Claude will read the standards and give you an overview of the project. From there, follow the [Workflow Overview](/guide/workflow).
