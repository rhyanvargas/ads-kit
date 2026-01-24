---
description: Project-specific testing patterns
globs:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "**/__tests__/**"
---

# Testing Patterns

> Project-specific testing conventions. Generic testing practices are omitted — Cursor already knows those.

## Test Stack

<!-- Your project's testing tools -->

- Unit tests: `<!-- Vitest / Jest / etc. -->`
- Integration tests: `<!-- tool -->`
- E2E tests: `<!-- Playwright / Cypress / etc. -->`
- Coverage tool: `<!-- tool -->`

## Test Organization

<!-- Your project's test file structure -->

```
<!-- discovered structure -->
```

## Naming Conventions

- Test files: `<!-- *.test.ts / *.spec.ts -->`
- Test descriptions: `<!-- your pattern -->`

## Mocking Patterns

<!-- Your project's mocking approach -->

- API mocks: `<!-- MSW / manual / etc. -->`
- Module mocks: `<!-- approach -->`
- Mock location: `<!-- path -->`

## Test Utilities

<!-- Custom test helpers in your project -->

- `<!-- renderWithProviders: path -->`
- `<!-- createMockUser: path -->`
- `<!-- other utilities -->`

## Coverage Requirements

<!-- Your project's coverage expectations -->

- Minimum coverage: `<!-- % -->`
- Critical paths requiring tests: `<!-- list -->`

## Reference Files

@<!-- path/to/example-unit-test -->
@<!-- path/to/example-integration-test -->
@<!-- path/to/test-utilities -->
