# Documentation Standards

> Full reference: `ai-specs/specs/documentation-standards.mdc`

## Sources of truth

| Document | Updated when |
|---|---|
| `api-spec.yml` | An API endpoint is added, changed, or removed |
| `data-model.md` | A Prisma model is added or modified |
| `backend-standards.mdc` | A new backend pattern or convention is established |
| `frontend-standards.mdc` | A new frontend pattern or convention is established |
| VitePress docs (`docs/`) | A new guide, standard, or command is worth documenting publicly |

## Rules

- **English only** — all technical artifacts, comments, commit messages, and documentation
- **Update docs in the same PR** as the code change — never leave docs out of sync
- `/update-docs` command handles this automatically at the end of each implementation step

## VitePress (this site)

This documentation site is built with [VitePress](https://vitepress.dev) and deployed to GitHub Pages.

### Run locally

```bash
npm run docs:dev
# Opens at http://localhost:5173
```

### Build

```bash
npm run docs:build
# Output in docs/.vitepress/dist/
```

### Structure

```
docs/
├── .vitepress/config.ts   ← Navigation, theme, site metadata
├── index.md               ← Home page
├── guide/                 ← How-to guides
├── standards/             ← Technical standards summaries
└── commands/              ← Slash command reference
```

### Adding a new page

1. Create the `.md` file in the appropriate section folder
2. Add it to the `sidebar` in `docs/.vitepress/config.ts`
3. Link to it from a relevant existing page

### Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/docs.yml`, which builds and publishes to GitHub Pages automatically.
