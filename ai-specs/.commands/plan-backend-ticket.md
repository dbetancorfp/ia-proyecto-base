# Role

You are an expert software architect with extensive experience in Nuxt 4 server-side development applying Domain-Driven Design (DDD) mapped to the Nitro/H3 layer.

# Ticket ID

$ARGUMENTS

# Goal

Obtain a step-by-step plan for a GitHub Issue that is ready to start implementing.

# Process and rules

1. Adopt the role of `.claude/agents/backend-developer.md`
1. Get the issue details with: `gh issue view $ARGUMENTS`. If the argument is a local file path, read it directly and skip the `gh` command.
2. Propose a step-by-step plan for the server layer (Nuxt `server/`), taking into account everything mentioned in the issue and applying the project’s best practices and rules you can find in `/ai-specs/specs`. 
3. Apply the best practices of your role to ensure the developer can be fully autonomous and implement the ticket end-to-end using only your plan. 
4. Do not write code yet; provide only the plan in the output format defined below.
5. If you are asked to start implementing at some point, make sure the first thing you do is to move to a branch named after the issue id (if you are not yet there) and follow the process described in the command /develop-backend.md

# Output format

Markdown document at the path `ai-specs/changes/GH-[issue_number]_backend.md` containing the complete implementation details.
Follow this template:

## Backend Implementation Plan Ticket Template Structure

### 1. **Header**
- Title: `# Backend Implementation Plan: [TICKET-ID] [Feature Name]`

### 2. **Overview**
- Brief description of the feature and architecture principles (DDD, clean architecture)

### 3. **Architecture Context**
- Layers involved (Domain, Application, Presentation)
- Components/files referenced

### 4. **Implementation Steps**
Detailed steps, typically:

#### **Step 0: Create Feature Branch**
- **Action**: The developer (or `/develop-backend`) must create and switch to a new feature branch before writing any code. The planner does NOT execute this step — it is an instruction for whoever implements the plan.
- **Branch Naming**: `feature/GH-[issue-number]-backend`, e.g. `feature/GH-42-backend` — suffix `-backend` allows parallel frontend work on `feature/GH-42-frontend`
- **Commands**:
  ```bash
  git checkout main && git pull origin main
  git checkout -b feature/GH-[issue-number]-backend
  ```
- **Notes**: This must be the FIRST step before any code changes. See `ai-specs/specs/backend-standards.mdc` → "Development Workflow" for branch naming rules.

#### **Step N: [Action Name]**
- **File**: Target file path
- **Action**: What to implement
- **Function Signature**: Code signature
- **Implementation Steps**: Numbered list
- **Dependencies**: Required imports
- **Implementation Notes**: Technical details

Common steps (Nuxt server DDD layers — TDD order: tests BEFORE implementation):
- **Step 1**: Failing Vitest unit tests in `tests/` — RED phase (write tests before any implementation code)
- **Step 2**: Valibot schema in `server/services/{domain}/{domain}Schema.ts`
- **Step 3**: Domain entity (if new entity) in `server/domain/entities/`
- **Step 4**: Repository interface (if new entity) in `server/domain/repositories/`
- **Step 5**: Service method in `server/services/{domain}/{domain}Service.ts`
- **Step 6**: Prisma repository implementation (if new entity) in `server/infrastructure/`
- **Step 7**: H3 API route handler in `server/api/`
- **Step 8**: All tests GREEN — run `npm test && npm run typecheck && npm run lint`

Example of a good structure:
**Implementation Steps**:

1. **Validate Position Exists**:
   - Use `Position.findOne(positionId)` to retrieve existing position
   - If position not found, throw `new Error('Position not found')`
   - Store the existing position for merging

#### **Step N+1: Update Technical Documentation**
- **Action**: Review and update technical documentation according to changes made
- **Implementation Steps**:
  1. **Review Changes**: Analyze all code changes made during implementation
  2. **Identify Documentation Files**: Determine which documentation files need updates based on:
     - Data model changes → Update `ai-specs/specs/data-model.md`
     - API endpoint changes → Update `ai-specs/specs/api-spec.yml`
     - Standards/libraries/config changes → Update relevant `*-standards.mdc` files
     - Architecture changes → Update relevant architecture documentation
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

### 7. **Error Response Format**
- JSON structure
- HTTP status code mapping

### 8. **Partial Update Support** (if applicable)
- Behavior for partial updates

### 9. **Dependencies**
- External libraries and tools required

### 10. **Notes**
- Important reminders and constraints
- Business rules
- Language requirements

### 11. **Next Steps After Implementation**
- Post-implementation tasks (documentation is already covered in Step N+1, but may include integration, deployment, etc.)

### 12. **Implementation Verification**
- Final verification checklist:
  - Code Quality
  - Functionality
  - Testing
  - Integration
  - Documentation updates completed
