---
description: TypeScript best practices and type safety patterns
globs:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript Best Practices

## Minimum Version

| Package | Min Version | Notes |
|---------|-------------|-------|
| TypeScript | 5.0+ | `const` type parameters, satisfies operator, decorators |

Key features by version:
- **5.0+**: `const` type parameters, `satisfies` operator, decorators
- **5.1+**: Easier implicit returns for `undefined`
- **5.2+**: `using` declarations (explicit resource management)
- **5.3+**: `import` attributes, narrowing in `switch(true)`
- **5.4+**: `NoInfer` utility type, improved narrowing in closures

## Type Safety Philosophy

TypeScript's value comes from its type system. Use it fully—don't escape hatch with `any`. Types are documentation that the compiler verifies.

## Strict Configuration

Always use strict TypeScript settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true
  }
}
```

## Avoiding `any`

### Never Use `any`

- Use `unknown` for truly unknown types, then narrow with type guards
- Use generics for flexible but type-safe code
- Use `Record<string, unknown>` for object dictionaries

```typescript
// BAD
function parse(input: any): any { ... }

// GOOD
function parse<T>(input: unknown): T {
  // Validate and narrow the type
}
```

### Type Assertions

- Avoid type assertions (`as Type`) except at system boundaries
- Prefer type guards and narrowing over assertions
- If you must assert, add a comment explaining why

## Interface vs Type

### Use `interface` for:

- Object shapes that may be extended
- Public API contracts
- Class implementations

### Use `type` for:

- Unions and intersections
- Mapped types and utility types
- Function signatures
- Primitives and tuples

```typescript
// Interface for extendable object shapes
interface User {
  id: string;
  email: string;
}

// Type for unions
type Status = 'pending' | 'active' | 'suspended';

// Type for complex derived types
type UserWithStatus = User & { status: Status };
```

## Discriminated Unions

Use discriminated unions for state management and type-safe branching:

```typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'idle':
      return null;
    case 'loading':
      return <Spinner />;
    case 'success':
      return <Data data={state.data} />; // TypeScript knows data exists
    case 'error':
      return <Error error={state.error} />; // TypeScript knows error exists
  }
}
```

## Null Safety

### Explicit Null Handling

- Use `T | null` for intentionally nullable values
- Use `T | undefined` for optional values
- Never use `null` and `undefined` interchangeably

```typescript
// Explicit nullable
function findUser(id: string): User | null {
  // Returns null if not found
}

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting ?? 'Hello'}, ${name}`;
}
```

### Null Checks

- Use optional chaining (`?.`) for safe property access
- Use nullish coalescing (`??`) for defaults (not `||`)
- Avoid non-null assertions (`!`) except in tests

## Generics

### Keep Generics Simple

- Use meaningful generic names (`TUser`, `TResponse`, not just `T`)
- Add constraints to catch errors early
- Don't over-genericize—start concrete, generalize when needed

```typescript
// Good: Constrained generic with meaningful name
function getProperty<TObj extends object, TKey extends keyof TObj>(
  obj: TObj,
  key: TKey
): TObj[TKey] {
  return obj[key];
}
```

## Utility Types

Leverage built-in utility types:

```typescript
// Partial - all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;

// Omit - exclude properties
type PublicUser = Omit<User, 'password'>;

// Required - make all properties required
type CompleteUser = Required<User>;

// Readonly - immutable object
type ImmutableUser = Readonly<User>;
```

## Enums

### Prefer Const Objects Over Enums

```typescript
// Prefer this
const Status = {
  Pending: 'pending',
  Active: 'active',
  Suspended: 'suspended',
} as const;
type Status = typeof Status[keyof typeof Status];

// Over this (enums have runtime overhead and quirks)
enum Status {
  Pending = 'pending',
  Active = 'active',
  Suspended = 'suspended',
}
```

## Function Types

### Explicit Return Types

Add explicit return types for:

- Public/exported functions
- Functions with complex logic
- Async functions

```typescript
// Explicit return type for clarity
async function fetchUser(id: string): Promise<User | null> {
  // ...
}
```

### Function Overloads

Use overloads for functions with different return types based on input:

```typescript
function parse(input: string): string[];
function parse(input: string, asObject: true): Record<string, string>;
function parse(input: string, asObject?: boolean) {
  // Implementation
}
```

## Type Guards

Create custom type guards for runtime type checking:

```typescript
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value
  );
}

// Usage
if (isUser(data)) {
  console.log(data.email); // TypeScript knows it's a User
}
```

## Branded Types

Use branded types for type-safe identifiers:

```typescript
type UserId = string & { readonly brand: unique symbol };
type OrderId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

// Now UserId and OrderId are not interchangeable
function getUser(id: UserId): User { ... }
getUser(orderId); // TypeScript error!
```

## Module Organization

- Export types alongside their implementations
- Use barrel files (index.ts) for public APIs
- Keep internal types private (don't export)

```typescript
// types.ts - internal types
type InternalConfig = { ... };

// index.ts - public API
export type { User, UserCreateInput } from './types';
export { createUser, getUser } from './service';
```
