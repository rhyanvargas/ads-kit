---
description: Project-specific TypeScript patterns
globs:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript Patterns

> Project-specific TypeScript conventions. Basic TypeScript best practices are omitted — Cursor already knows those.

## Strict Configuration

<!-- Your project's tsconfig strictness level -->

```json
{
  "compilerOptions": {
    <!-- discovered from tsconfig.json -->
  }
}
```

## Type Conventions

<!-- Only conventions specific to YOUR project -->

### Naming

- Type prefix/suffix convention: `<!-- e.g., IUser vs User vs UserType -->`
- Generic naming: `<!-- e.g., TData vs T -->`

### Interface vs Type

<!-- Your project's specific preference, if any -->

- Use `interface` for: `<!-- discovered -->`
- Use `type` for: `<!-- discovered -->`

## Custom Utility Types

<!-- Project-specific utility types -->

```typescript
// Add your project's custom types here
```

## Patterns We Use

<!-- TypeScript patterns specific to your codebase -->

- <!-- Pattern 1 -->
- <!-- Pattern 2 -->

## Patterns We Avoid

<!-- TypeScript anti-patterns in your project -->

- <!-- Anti-pattern with reason -->

## Reference Files

@<!-- path/to/well-typed-example -->
@<!-- path/to/utility-types -->
