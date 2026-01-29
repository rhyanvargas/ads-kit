# Architecture Rule Template

> Copy this template to `.cursor/rules/architecture.mdc` and customize for your project.

## Layer Structure

### Typical Web Application

```
src/
├── components/     # UI components (presentation)
├── services/       # Business logic
├── repositories/   # Data access
├── models/         # Domain types
├── utils/          # Shared utilities
└── config/         # Configuration
```

### Layer Dependencies

```
components → services → repositories → external
     ↓           ↓
   models      models
```

**Rules:**
- Components can call services, not repositories directly
- Services contain business logic
- Repositories handle data access
- Models are shared across layers
- No circular dependencies

## Module Boundaries

### Public Interface
- Each module exposes a clear public API
- Use index files to define exports
- Internal helpers are not exported

### Coupling
- Prefer loose coupling between modules
- Use interfaces/types at boundaries
- Avoid reaching into module internals

## Error Handling

### Strategy
- Catch errors at boundaries (API, UI)
- Transform external errors to domain errors
- Log with context, surface user-friendly messages

### Error Types
```typescript
// Domain errors
class NotFoundError extends Error {}
class ValidationError extends Error {}
class AuthorizationError extends Error {}
```

## State Management

### Principles
- Single source of truth
- State is immutable
- Changes through defined actions
- Derive computed values, don't store

### Location
- Global state: app-wide data (auth, settings)
- Local state: component-specific UI state
- Server state: cached API responses

## Testing Strategy

### Test Pyramid
- Unit tests: fast, isolated, many
- Integration tests: fewer, test boundaries
- E2E tests: critical paths only

### What to Test
- Business logic (services)
- Edge cases and error handling
- Public interfaces

### What Not to Test
- Framework internals
- Trivial getters/setters
- Implementation details

## API Design

### REST Conventions
- Use nouns for resources (`/users`, not `/getUsers`)
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Version APIs (`/v1/users`)

### Response Format
```json
{
  "data": { },
  "meta": { "page": 1, "total": 100 },
  "errors": []
}
```

## Security

### Principles
- Never trust client input
- Validate and sanitize all inputs
- Use parameterized queries
- Keep secrets out of code

### Authentication
- Use established libraries
- Store tokens securely
- Implement proper session management

## Usage

The `/quick-start` command will:
1. Detect your project structure
2. Identify existing architectural patterns
3. Merge with this template
4. Update `project.mdc` with the result

Customize before running if you have specific architectural decisions.
