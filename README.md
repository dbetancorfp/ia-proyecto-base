# AI Specifications & Development Rules

This repository contains a comprehensive set of development rules, standards, and AI agent configurations designed to work seamlessly with multiple AI coding copilots. The setup is portable and can be imported into any project to provide consistent, high-quality AI-assisted development.

It's highly recommended to be used along with Spec-Driven Development frameworks like [OpenSpec](https://github.com/Fission-AI/OpenSpec)

## 📁 Repository Structure

```
.
├── .gitignore
├── AGENTS.md                              # Symlink → ai-specs/specs/base-standards.mdc
├── CLAUDE.md                              # Symlink → ai-specs/specs/base-standards.mdc
├── codex.md                               # Symlink → ai-specs/specs/base-standards.mdc
├── GEMINI.md                              # Symlink → ai-specs/specs/base-standards.mdc
│
├── .claude/                               # Claude Code local config (gitignored in part)
│   ├── settings.json                      # Permissions + MCPs: github, sequential-thinking, context7
│   ├── settings.local.json                # Local token overrides (gitignored — create from template)
│   ├── sessions/                          # Session handoff context (gitignored)
│   │   └── README.md                      # How to save/resume session state
│   └── doc/                               # Agent-generated plans (gitignored)
│       └── README.md                      # Workflow: plan → review → implement
│
└── ai-specs/                              # All AI knowledge for this project
    ├── specs/                             # Technical standards and contracts
    │   ├── base-standards.mdc             # Core rules — single source of truth (CLAUDE.md target)
    │   ├── backend-standards.mdc          # DDD, Express, Prisma, testing
    │   ├── frontend-standards.mdc         # React, React Bootstrap, Cypress
    │   ├── documentation-standards.mdc    # Docs structure and maintenance
    │   ├── api-spec.yml                   # OpenAPI 3.0 contract (replace with your own)
    │   ├── data-model.md                  # Domain entities and DB schema (replace with your own)
    │   └── development_guide.md           # Setup and workflow guide (replace with your own)
    │
    ├── .agents/                           # Specialized agent role definitions
    │   ├── product-strategy-analyst.md    # Role: Discovery, use cases, value proposition
    │   ├── backend-developer.md           # Role: DDD backend planning (never implements)
    │   ├── frontend-developer.md          # Role: React frontend planning (never implements)
    │   ├── qa-engineer.md                 # Role: TDD test generation and coverage review
    │   └── security-reviewer.md          # Role: OWASP audit before merge
    │
    ├── .commands/                         # Slash commands — type /command in Claude Code
    │   ├── enrich-us.md                   # /enrich-us #N — enrich a user story
    │   ├── plan-backend-ticket.md         # /plan-backend-ticket #N — generate backend plan
    │   ├── plan-frontend-ticket.md        # /plan-frontend-ticket #N — generate frontend plan
    │   ├── develop-backend.md             # /develop-backend #N — implement from plan
    │   ├── develop-frontend.md            # /develop-frontend #N — implement from plan
    │   ├── review-pr.md                   # /review-pr #N — pre-merge review (security + QA)
    │   ├── deploy.md                      # /deploy staging|production
    │   ├── commit.md                      # /commit — smart commit + PR creation
    │   ├── update-docs.md                 # /update-docs — sync API docs and data model
    │   ├── explain.md                     # /explain — teaching mode for any code
    │   └── meta-prompt.md                 # /meta-prompt — improve an existing prompt
    │
    ├── discovery/                         # Phase 1: Client → Requirements
    │   ├── client-interviews/             # Raw notes from client meetings
    │   │   └── _template.md
    │   ├── figma-analysis/                # Screen-by-screen design breakdown
    │   │   └── _template.md
    │   └── user-stories/                  # Structured user stories pre-refinement
    │       └── _template.md
    │
    ├── changes/                           # Phase 2: Enriched stories + implementation plans
    │   ├── GH-10_backend.md               # Demo: backend implementation plan (GH-[issue_number]_backend.md)
    │   └── GH-10-Position-Update.md       # Demo: enriched user story with acceptance criteria
    │
    └── handoffs/                          # Phase 3: Session state between Claude sessions
        └── _template.md
```

## 🤖 Multi-Copilot Support

This repository uses **symbolic links** or **naming conventions** to support multiple AI coding copilots without duplication:

- **`AGENTS.md`** → Generic agent rules (works with most copilots)
- **`CLAUDE.md`** → Optimized for Claude/Cursor
- **`codex.md`** → Optimized for GitHub Copilot/Codex
- **`GEMINI.md`** → Optimized for Google Gemini

All these files reference the same core rules in `ai-specs/specs/base-standards.mdc`, ensuring consistency across different AI tools while allowing copilot-specific customizations.

### Why This Approach?

✅ **Single Source of Truth**: Core rules maintained in one place (`base-standards.mdc`)  
✅ **Copilot Compatibility**: Each AI tool finds its configuration using its preferred naming convention  
✅ **Zero Configuration**: Import into a new project and it works immediately  
✅ **Easy Updates**: Update rules once, all copilots benefit  
✅ **Portable**: Copy this structure to any project  

## 🚀 Quick Start

### 1. Import Into Your Project

```bash
# Clone this repository into your project
git clone https://github.com/dbetancorfp/ia-proyecto-base.git your-project

# The AI copilot will automatically detect the relevant configuration file
```

### 2. Verify Configuration

Your AI copilot will automatically load:
- **Claude/Cursor**: `CLAUDE.md` → `ai-specs/specs/base-standards.mdc`
- **GitHub Copilot**: `codex.md` → `ai-specs/specs/base-standards.mdc`
- **Gemini**: `GEMINI.md` → `ai-specs/specs/base-standards.mdc`

All paths and rules are configured to work seamlessly without manual adjustments.

## 💡 Usage: Command-Based Development Workflow

The most efficient way to work with this setup is using a command-based workflow:

### Step 1: Enrich the User Story (Optional)

If your user story lacks detail or acceptance criteria, use the **`enrich-us`** command to enhance it:

```
/enrich-us GH-10
```

This command analyzes the user story and generates:
- Detailed acceptance criteria
- Edge cases and validation rules
- Technical considerations
- Testing scenarios

**Note**: Skip this step if your user story already has sufficient depth and clear requirements.

### Step 2: Plan the Feature

Use **`plan-ticket`** commands to generate detailed implementation plans:

```
plan-backend-ticket GH-10
```

or

```
plan-frontend-ticket GH-15
```

This creates a comprehensive, step-by-step implementation plan in `ai-specs/changes/`.

### Step 3: Implement the Feature

Reference the generated plan and execute:

```
develop-backend @ai-specs/changes/GH-10_backend.md
```

or

```
develop-frontend @ai-specs/changes/GH-15_frontend.md
```

The AI will follow the plan precisely, implementing each step with TDD, proper testing, and documentation updates.

### Example: Implementing Issue #10 (Position Update Feature)

#### Step 1: Enrich the User Story (Optional)

**You say:**
```
/enrich-us GH-10
```

**AI enhances** the user story with detailed acceptance criteria and technical considerations (skip if already detailed).

#### Step 2: Generate the Plan

**You say:**
```
/plan-backend-ticket GH-10
```

**AI generates:**
- Analyzes the ticket requirements
- Creates `ai-specs/changes/GH-[issue_number]_backend.md` with:
  - Architecture context
  - Step-by-step implementation instructions
  - Complete test specifications (validation, service, controller layers)
  - API documentation updates
  - Validation rules
  - Error handling strategies

#### Step 3: Implement Following the Plan

**You say:**
```
/develop-backend @ai-specs/changes/GH-10_backend.md
```

**AI executes:**
1. Creates feature branch `feature/GH-10-backend` (pattern: `feature/GH-[issue_number]-description`)
2. Implements validation function with comprehensive rules
3. Implements service layer with business logic
4. Implements controller with HTTP handling
5. Adds route configuration
6. Writes 90%+ test coverage across all layers
7. Updates API documentation
8. Runs tests and verifies implementation
9. Commits and pushes (configurable to wait until confirmation)

### 📝 Demo Enriched User Story

Check out **`ai-specs/changes/GH-10-Position-Update.md`** for a complete example (naming pattern: `GH-[issue_number]-Feature-Name.md`) of what an enriched user story looks like. This comprehensive document includes:

- **User Story**: Clear description with persona, goal, and benefit
- **Technical Specification**: Complete technical implementation details
- **API Endpoint Documentation**: Request/response formats, status codes, and error handling
- **Database Fields**: All updateable fields with validation rules
- **Validation Rules**: Server-side and client-side validation requirements
- **Security Requirements**: Authentication, authorization, and input sanitization needs
- **Testing Requirements**: Unit tests, integration tests, and manual testing scenarios
- **Acceptance Criteria**: Clear, testable acceptance criteria for each requirement
- **Non-Functional Requirements**: Usability, performance, reliability, and security standards
- **Definition of Done**: Complete checklist for feature completion

This enriched document transforms a simple user story into a detailed specification that provides all the context needed for autonomous implementation by AI agents or developers.

### 📋 Demo Implementation Plan

Check out **`ai-specs/changes/GH-10_backend.md`** for a complete example of what a feature implementation plan looks like. This comprehensive plan includes:

- **Architecture Context**: Layers, components, and dependencies
- **Step-by-Step Instructions**: Validation → Service → Controller → Routes → Tests → Documentation
- **Complete Code Examples**: Full implementations for each layer
- **Comprehensive Test Specifications**: 90%+ coverage requirements with example tests
- **Error Handling**: HTTP status codes, error messages, and response formats
- **Business Rules**: Validation requirements and constraints
- **Testing Checklist**: Unit, manual, integration, and regression tests

This plan demonstrates how detailed and actionable the generated plans are, enabling autonomous implementation by AI agents.

## 📖 Core Development Rules

All development follows principles defined in `ai-specs/specs/base-standards.mdc`:

### Key Principles

1. **Small Tasks, One at a Time**: Baby steps, never skip ahead
2. **Test-Driven Development (TDD)**: Write failing tests first
3. **Type Safety**: Fully typed code (TypeScript)
4. **Clear Naming**: Descriptive variables and functions
5. **English Only**: All code, comments, documentation, and messages in English
6. **90%+ Test Coverage**: Comprehensive testing across all layers
7. **Incremental Changes**: Focused, reviewable modifications

### Specific Standards

- **Backend Standards**: `ai-specs/specs/backend-standards.mdc`
  - API development patterns
  - Database best practices
  - Security guidelines
  - Testing requirements

- **Frontend Standards**: `ai-specs/specs/frontend-standards.mdc`
  - React component patterns
  - UI/UX guidelines
  - State management
  - Component testing

- **Documentation Standards**: `ai-specs/specs/documentation-standards.mdc`
  - Technical documentation structure
  - API documentation (OpenAPI)
  - Code documentation
  - Maintenance guidelines

## 🎯 Benefits

### For Developers
- ✅ **Consistent Code Quality**: AI follows the same standards every time
- ✅ **Comprehensive Testing**: Automatic 90%+ coverage across all layers
- ✅ **Complete Documentation**: API specs updated automatically
- ✅ **Faster Onboarding**: New team members reference the same rules
- ✅ **Reduced Review Time**: Code follows established patterns

### For Teams
- ✅ **Copilot Flexibility**: Team members can use their preferred AI tool
- ✅ **Knowledge Preservation**: Standards documented, not in people's heads
- ✅ **Quality Consistency**: Same standards regardless of who (or what) writes code
- ✅ **Easier Code Reviews**: Clear expectations and patterns
- ✅ **Scalable Practices**: Standards scale with the team

### For Projects
- ✅ **Maintainable Codebase**: Clean architecture and clear separation of concerns
- ✅ **Production-Ready Code**: TDD, error handling, and validation built-in
- ✅ **Living Documentation**: API specs and data models always current
- ✅ **Faster Feature Development**: Autonomous AI implementation from plans
- ✅ **Lower Technical Debt**: Best practices enforced from day one

## 🔧 Customization

### Adapting to Your Project

1. **Update technical context**: Find the different files in `ai-specs/specs` and modify core principles, coding standards, business rules and technical documentation to match your needs:
   - backend/frontend/testing/documentation standards
   - installation guide
   - data model
   - API docs
   - ...
2. **Adapt agents in `ai-specs/.agents`**: Adjust agent definitions to your project's roles and workflows
3. **Extend Commands**: Define battle-tested prompts into commands in `ai-specs/.commands` 
4. **Link Resources**: Reference your project's specific documentation or tasks using MCPs
5. **Keep the symlink structure**: Remember to create relative symlinks from claude and cursor folders to the newly created agents or commands to keep it consistent

### Maintaining Standards

- **Single Source of Truth**: Always update `base-standards.mdc` first
- **Version Control**: Track changes to standards like code
- **Team Review**: Standards changes should be reviewed like pull requests
- **Documentation**: Keep examples current with actual implementation

## 📚 Technical context

### Reference Examples (from LIDR Project)

The following files are included as **reference examples** from the LIDR project. You should create your own versions tailored to your specific project:

- **API Specification**: `ai-specs/specs/api-spec.yml` (OpenAPI 3.0 format)
  - *Create your own API spec documenting your project's endpoints*
- **Data Models**: `ai-specs/specs/data-model.md` (Database schemas, domain models)
  - *Document your database structure and domain entities*
- **Development Guide**: `ai-specs/specs/development_guide.md` (Setup, workflows)
  - *Write setup instructions specific to your tech stack*


## 🤝 Contributing

When contributing to the standards:

1. Update `base-standards.mdc` (single source of truth)
2. Test with multiple AI copilots to ensure compatibility
3. Update examples in `changes/` folder if needed
4. Document breaking changes clearly
5. Follow the same standards you're defining!

## 📄 License

Copyright (c) 2025 LIDR.co
Licensed under the MIT License

**English:**

The content of this repository is part of the AI4Devs program by LIDR.co. If you want to learn to code with AI like the pros and get more templates and resources like these, you can find all the information on the official website: https://lidr.co/ia-devs

**Español:**

El contenido de este repositorio es parte del programa AI4Devs de LIDR.co. Si quieres aprender a programar con IA como los pros, y obtener más plantillas y recursos como estos, puedes encontrar toda la información en la página oficial: https://lidr.co/ia-devs

---

**Made with 🤖 by the LIDR community**

For questions, issues, or suggestions, visit [LIDR.co](https://lidr.co/ia-devs)

