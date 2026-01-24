# Quick Start

## Overview

Discover and document your project's existing architecture. This command **scans your codebase first**, then confirms findings with you before updating `.cursor/rules/project.mdc`.

> **Philosophy**: Document what exists. Don't prescribe what should exist.

## Parameters

```text
/quick-start              # Full discovery + documentation
/quick-start scan-only    # Just show findings, don't update rules
```

## Steps

### 1. Discover Architecture (Automatic)

Scan the codebase to identify:

**Structure**
- Folder organization pattern (feature-based, layer-based, domain-driven, hybrid)
- Key directories and their purposes
- File naming conventions

**Stack Detection**
- Read `package.json`, `requirements.txt`, `go.mod`, `Cargo.toml`, etc.
- Identify frameworks, libraries, and tools in use
- Note testing frameworks and build tools

**Pattern Recognition**
- State management approach (if frontend)
- API patterns (REST routes, GraphQL schemas, tRPC)
- Error handling patterns
- Authentication/authorization approach

**Reference Files**
- Identify well-structured example files that demonstrate project conventions
- Look for README files in subdirectories
- Find existing documentation

### 2. Present Findings

Show the user what was discovered:

```markdown
## Architecture Discovery

### Folder Structure
I found a [feature-based] organization:
- `src/features/` — Feature modules
- `src/shared/` — Shared utilities
- `src/components/` — UI components

### Stack
- **Framework**: Next.js 14 (App Router)
- **State**: Zustand
- **API**: tRPC
- **Testing**: Vitest + Playwright

### Patterns I Noticed
- Components use named exports
- API routes follow RESTful naming
- Errors are handled with a custom `AppError` class

### Suggested Reference Files
- `src/features/auth/components/LoginForm.tsx` — Component pattern
- `src/server/routers/user.ts` — API pattern

---

Does this look correct? I can adjust before saving.
```

### 3. Confirm or Adjust

Ask the user:
- "Does this accurately reflect your architecture?"
- "Anything I missed or got wrong?"
- "Any internal libraries or conventions I should know about?"

### 4. Update Rules File

After confirmation, update `.cursor/rules/project.mdc`:

```markdown
---
description: Project-specific context and architecture guidance
alwaysApply: true
---

# Project Context

[Keep the Discovery Guidelines section unchanged]

## Project Specifics

### Architecture
- **Organization**: Feature-based (`src/features/[feature]/`)
- **State**: Zustand for global state
- **API**: tRPC with server routers in `src/server/`

### Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Vitest for unit tests

### Conventions
- Named exports for components
- Barrel files (`index.ts`) for public APIs
- Error handling via `AppError` class in `src/lib/errors.ts`

### Reference Files
@src/features/auth/components/LoginForm.tsx
@src/server/routers/user.ts
@src/lib/errors.ts
```

### 5. Summary

Show what was documented and remind user:
- "Rules updated based on your actual codebase"
- "Run `/analyze-codebase` periodically to check for drift"
- "Add specific rules only when Agent makes repeated mistakes"

## Key Principles

| Do | Don't |
|----|-------|
| Discover existing patterns | Prescribe new patterns |
| Ask "did I get this right?" | Ask "what pattern do you want?" |
| Document what IS | Document what SHOULD BE |
| Suggest based on evidence | Assume based on best practices |

## Completion Checklist

- [ ] Codebase scanned for structure, stack, and patterns
- [ ] Findings presented to user for confirmation
- [ ] User confirmed or corrected findings
- [ ] `.cursor/rules/project.mdc` updated with actual architecture
- [ ] Reference files identified and linked
