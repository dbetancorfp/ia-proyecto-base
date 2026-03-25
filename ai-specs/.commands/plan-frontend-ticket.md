# Role

You are an expert frontend architect with extensive experience in Nuxt 4, Vue 3, Pinia, and PrimeVue projects applying best practices.

# Ticket ID

$ARGUMENTS

# Goal

Obtain a step-by-step plan for a GitHub Issue that is ready to start implementing.

# Process and rules

1. Adopt the role of `.claude/agents/frontend-developer.md`
2. Get the issue details with: `gh issue view $ARGUMENTS`. If the argument is a local file path, read it directly and skip the `gh` command.
3. Propose a step-by-step plan for the frontend part, taking into account everything mentioned in the ticket and applying the project's best practices and rules you can find in `/ai-specs/specs`.
4. Apply the best practices of your role to ensure the developer can be fully autonomous and implement the ticket end-to-end using only your plan.
5. Do not write code yet; provide only the plan in the output format defined below.
6. If you are asked to start implementing at some point, make sure the first thing you do is to move to a branch named after the issue id (if you are not yet there) and follow the process described in the command /develop-frontend.md

# Output format

Markdown document at the path `ai-specs/changes/GH-[issue_number]_frontend.md` containing the complete implementation details.
Follow this template:

## Frontend Implementation Plan Ticket Template Structure

### 1. **Header**
- Title: `# Frontend Implementation Plan: [TICKET-ID] [Feature Name]`

### 2. **Overview**
- Brief description of the feature and frontend architecture principles (Nuxt 4 pages, Pinia stores, composables, PrimeVue components)

### 3. **Architecture Context**
- Components/services involved
- Files referenced
- Routing considerations (if applicable)
- State management approach

### 4. **Implementation Steps**
Detailed steps, typically:

#### **Step 0: Create Feature Branch**
- **Action**: Create and switch to a new feature branch following the development workflow. Check if it exists and if not, create it
- **Branch Naming**: `feature/GH-[issue-number]-frontend`, e.g. `feature/GH-42-frontend` — do not stay on the general issue branch; suffix `-frontend` to allow parallel backend work
- **Implementation Steps**:
  1. Ensure you're on the latest `main` or `develop` branch (or appropriate base branch)
  2. Pull latest changes: `git pull origin [base-branch]`
  3. Create new branch: `git checkout -b [branch-name]`
  4. Verify branch creation: `git branch`
- **Notes**: This must be the FIRST step before any code changes. Refer to `ai-specs/specs/frontend-standards.mdc` section "Development Workflow" for specific branch naming conventions and workflow rules.

#### **Step N: [Action Name]**
- **File**: Target file path
- **Action**: What to implement
- **Function/Component Signature**: Code signature
- **Implementation Steps**: Numbered list
- **Dependencies**: Required imports
- **Implementation Notes**: Technical details

Common steps (Nuxt 4 frontend layers):
- **Step 1**: Pinia store update/creation in `app/stores/` (if shared state needed)
- **Step 2**: Composable in `app/composables/` (data fetching + logic)
- **Step 3**: Vue SFC components in `app/components/` (PrimeVue, `<script setup lang="ts">`)
- **Step 4**: Page in `app/pages/` (file-based routing, uses composables + store)
- **Step 5**: Playwright E2E tests in `e2e/` (happy path + error scenarios)

#### **Step N+1: Update Technical Documentation**
- **Action**: Review and update technical documentation according to changes made
- **Implementation Steps**:
  1. **Review Changes**: Analyze all code changes made during implementation
  2. **Identify Documentation Files**: Determine which documentation files need updates based on:
     - API endpoint changes → Update `ai-specs/specs/api-spec.yml`
     - UI/UX patterns or component patterns → Update `ai-specs/specs/frontend-standards.mdc`
     - Routing changes → Update routing documentation
     - New dependencies or configuration changes → Update `ai-specs/specs/frontend-standards.mdc`
     - Test patterns or Playwright changes → Update testing documentation
  3. **Update Documentation**: For each affected file:
     - Update content in English (as per `documentation-standards.mdc`)
     - Maintain consistency with existing documentation structure
     - Ensure proper formatting
  4. **Verify Documentation**: 
     - Confirm all changes are accurately reflected
     - Check that documentation follows established structure
  5. **Report Updates**: Document which files were updated and what changes were made
- **References**: 
  - Follow process described in `ai-specs/specs/documentation-standards.mdc`
  - All documentation must be written in English
- **Notes**: This step is MANDATORY before considering the implementation complete. Do not skip documentation updates.

### 5. **Implementation Order**
- Numbered list of steps in sequence (must start with Step 0: Create Feature Branch and end with documentation update step)

### 6. **Testing Checklist**
- Post-implementation verification checklist
- Playwright E2E test coverage (happy path + error scenarios)
- Vitest component unit test coverage
- Loading and error state verification

### 7. **Error Handling Patterns**
- Error state management in components
- User-friendly error messages
- API error handling in services

### 8. **UI/UX Considerations** (if applicable)
- PrimeVue component usage (check docs before writing custom components)
- Responsive design considerations
- Accessibility requirements (aria-label, keyboard nav)
- Loading states (`:loading` props, Skeleton components) and feedback (Toast, ConfirmDialog)

### 9. **Dependencies**
- PrimeVue components used (list them explicitly)
- New npm packages required — justify each one (avoid adding if PrimeVue covers it)

### 10. **Notes**
- Important reminders and constraints
- Business rules
- Language requirements (English only)
- SSR considerations (avoid `window`/`document` in `<script setup>` without `onMounted`)

### 11. **Next Steps After Implementation**
- Post-implementation tasks (documentation is already covered in Step N+1, but may include integration, deployment, etc.)

### 12. **Implementation Verification**
- Final verification checklist:
  - Code Quality
  - Functionality
  - Testing
  - Integration
  - Documentation updates completed
