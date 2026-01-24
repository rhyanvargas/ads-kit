---
description: Project-specific API patterns
globs:
  - "**/api/**"
  - "**/routes/**"
  - "**/server/**"
---

# API Patterns

> Project-specific API conventions. Generic REST/GraphQL practices are omitted — Cursor already knows those.

## API Style

<!-- Your project's API approach -->

- Style: `<!-- REST / GraphQL / tRPC / gRPC -->`
- Framework: `<!-- Express / Fastify / Next.js API / etc. -->`
- Validation: `<!-- zod / yup / joi -->`

## Route Structure

<!-- Your project's route organization -->

```
<!-- discovered structure -->
```

## Request/Response Patterns

<!-- Your project's specific patterns -->

### Request Validation

```typescript
// Your validation pattern
```

### Response Format

```typescript
// Your standard response shape
```

### Error Responses

```typescript
// Your error response format
```

## Authentication

<!-- How auth is handled in API routes -->

- Middleware: `<!-- path -->`
- Token extraction: `<!-- approach -->`

## Patterns We Use

- `<!-- pattern 1 -->`
- `<!-- pattern 2 -->`

## Reference Files

@<!-- path/to/example-route -->
@<!-- path/to/middleware -->
@<!-- path/to/validation-schema -->
