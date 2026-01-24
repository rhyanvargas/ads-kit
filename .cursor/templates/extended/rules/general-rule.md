---
description: Project-specific coding standards and architecture decisions
alwaysApply: true
---

# Project Standards

> This rule documents YOUR project's specific patterns. Generic best practices (SOLID, DRY, KISS) are omitted — Cursor already knows those.

## Architecture

<!-- Populated by /quick-start based on codebase discovery -->

### Folder Structure

```
<!-- Your discovered structure here -->
```

### Module Boundaries

- Public APIs exported via `index.ts` barrel files
- Shared code location: `<!-- discovered -->`
- Feature module pattern: `<!-- discovered -->`

## Naming Conventions

<!-- Only conventions that DIFFER from standard practices -->

| Type | Convention | Example |
|------|------------|---------|
| Components | <!-- discovered --> | |
| Utilities | <!-- discovered --> | |
| Types | <!-- discovered --> | |
| Tests | <!-- discovered --> | |

## Error Handling

<!-- Your project's specific error handling approach -->

- Error class: `<!-- discovered, e.g., AppError -->`
- Validation library: `<!-- discovered, e.g., zod -->`
- Error boundary pattern: `<!-- discovered -->`

## Internal Libraries

<!-- Libraries/utilities specific to YOUR project that Cursor doesn't know about -->

- **Auth**: `<!-- path to auth utility -->`
- **API Client**: `<!-- path to API wrapper -->`
- **Components**: `<!-- path to design system -->`

## Patterns We Use

<!-- Only patterns unique to your project -->

- <!-- Pattern 1 -->
- <!-- Pattern 2 -->

## Patterns We Avoid

<!-- Anti-patterns specific to your project with reasoning -->

- <!-- Anti-pattern 1: reason -->
- <!-- Anti-pattern 2: reason -->

## Reference Files

<!-- Canonical examples demonstrating your patterns -->

@<!-- path/to/example-component -->
@<!-- path/to/example-api-route -->
@<!-- path/to/example-test -->
