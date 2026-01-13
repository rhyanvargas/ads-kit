---
description: Core coding principles and clean code conventions for enterprise development
alwaysApply: true
---

# General Coding Principles

## Philosophy

Write code that is **boring, predictable, and maintainable**. Optimize for readability and long-term maintainability over cleverness. Code is read far more often than it is written.

## Core Principles

### SOLID Principles

- **Single Responsibility**: Each module, class, or function should have one reason to change
- **Open/Closed**: Open for extension, closed for modification. Use composition and interfaces
- **Liskov Substitution**: Subtypes must be substitutable for their base types
- **Interface Segregation**: Prefer many specific interfaces over one general-purpose interface
- **Dependency Inversion**: Depend on abstractions, not concretions. Inject dependencies

### Keep It Simple

- **KISS**: Choose the simplest solution that works. Avoid premature optimization
- **YAGNI**: Don't build features until they're actually needed
- **DRY**: Don't repeat yourself, but don't over-abstract. Rule of three: abstract on the third occurrence

## Code Organization

### Feature-Based Structure (Recommended)

Organize code by feature/domain, not by technical layer. This pattern scales better for enterprise applications and aligns with Domain-Driven Design principles.

**Why feature-based over layer-based:**
- **Colocation**: Related code lives together (component + hook + API + types)
- **Scalability**: Folders don't become unmanageable as the app grows
- **Team ownership**: Features can be owned by different teams
- **Refactoring**: Easy to extract features into packages or microservices
- **Deletability**: Remove a feature by deleting its folder

```
src/
  features/
    users/
      components/
      hooks/
      api/
      types.ts
      index.ts          # Public API (barrel file)
    orders/
      ...
  shared/
    components/         # Used by 2+ features
    utils/
    hooks/
```

**Alternative (small projects):** Layer-based structure (`components/`, `hooks/`, `utils/`) is acceptable for small codebases (<20 components). Migrate to feature-based when complexity grows.

### Module Boundaries

- Each feature module should have a clear public API (index.ts barrel file)
- Avoid circular dependencies between modules
- Shared code goes in `shared/` only when used by 2+ features

## Naming Conventions

### General Rules

- Use descriptive, intention-revealing names
- Avoid abbreviations except for widely understood ones (id, url, api)
- Boolean variables: use `is`, `has`, `should`, `can` prefixes
- Functions: use verb phrases (`getUserById`, `validateInput`, `calculateTotal`)
- Constants: use SCREAMING_SNAKE_CASE for true constants

### File Naming

- Components: PascalCase (`UserProfile.tsx`)
- Utilities/hooks: camelCase (`useAuth.ts`, `formatDate.ts`)
- Types/interfaces: PascalCase (`UserTypes.ts`)
- Test files: `*.test.ts` or `*.spec.ts`

## Error Handling

### Fail Fast, Fail Loud

- Validate inputs at system boundaries (API endpoints, user input)
- Throw errors early rather than propagating invalid state
- Never silently swallow errors

### Error Patterns

```typescript
// Use Result types for expected failures
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

// Use exceptions for unexpected failures
throw new Error('Descriptive message with context');

// Always include context in error messages
throw new Error(`Failed to fetch user ${userId}: ${originalError.message}`);
```

### Error Boundaries

- Wrap major application sections in error boundaries
- Log errors with full context before displaying user-friendly messages
- Never expose internal error details to end users

## Logging and Observability

### Structured Logging

- Use structured logging (JSON format) in production
- Include correlation IDs for request tracing
- Log at appropriate levels: ERROR, WARN, INFO, DEBUG

### What to Log

- All API requests/responses (sanitized)
- Authentication events
- Business-critical operations
- Performance metrics for slow operations
- Errors with full stack traces and context

### What NOT to Log

- Passwords, tokens, API keys
- PII (personally identifiable information) unless required and encrypted
- High-frequency events that provide no debugging value

## Code Comments

### When to Comment

- Explain **why**, not **what** (code should be self-documenting for "what")
- Document non-obvious business rules
- Explain workarounds with links to issues/tickets
- Add JSDoc for public APIs

### When NOT to Comment

- Don't comment obvious code
- Don't leave commented-out code (use version control)
- Don't write TODOs without ticket references

## Dependencies

### Choosing Dependencies

- Prefer well-maintained packages with active communities
- Check bundle size impact for frontend dependencies
- Avoid dependencies for trivial functionality
- Pin versions and use lockfiles

### Managing Dependencies

- Regular security audits (`npm audit`, `pnpm audit`)
- Update dependencies incrementally, not all at once
- Document why each major dependency was chosen

## Performance Considerations

- Don't optimize prematurely—measure first
- Optimize for the common case
- Use appropriate data structures (Map/Set vs Array for lookups)
- Consider memory usage for large datasets
- Implement pagination for lists

## Configuration

- Use environment variables for environment-specific config
- Never commit secrets to version control
- Provide sensible defaults where appropriate
- Validate configuration at startup, fail fast if invalid
