---
description: Testing strategy and patterns for reliable test suites
---

# Testing Strategy

## Minimum Versions

| Package | Min Version | Notes |
|---------|-------------|-------|
| vitest | 1.0+ | Stable API, `vi.fn()`, workspace support |
| @testing-library/react | 14.0+ | React 18 support, `findBy` async queries |
| @testing-library/user-event | 14.0+ | `userEvent.setup()` API |
| @playwright/test | 1.40+ | UI mode, component testing |
| msw | 2.0+ | New request handler API (`http.get` vs `rest.get`) |

**Note**: Examples use Vitest syntax (`vi.fn()`, `vi.mock()`). For Jest, replace `vi` with `jest`.

## Philosophy

Tests exist to **give confidence when making changes**. Write tests that catch real bugs, not tests that break on every refactor. Test behavior, not implementation.

## Testing Pyramid

Prioritize tests in this order (more at bottom, fewer at top):

```
       /\
      /  \     E2E Tests (few, slow, high confidence)
     /----\
    /      \   Integration Tests (moderate)
   /--------\
  /          \ Unit Tests (many, fast, focused)
 /____________\
```

### Unit Tests

- Test pure functions and isolated logic
- Fast, no I/O or external dependencies
- Mock at boundaries (APIs, databases)
- Aim for high coverage of business logic

### Integration Tests

- Test modules working together
- Include database operations (use test database)
- Test API endpoints end-to-end
- Cover critical user paths

### E2E Tests

- Test complete user workflows
- Run in production-like environment
- Cover happy paths and critical error cases
- Keep minimal—they're slow and flaky

## Test Structure: Arrange-Act-Assert

Every test should follow the AAA pattern:

```typescript
describe('calculateDiscount', () => {
  it('should apply 10% discount for orders over $100', () => {
    // Arrange - set up test data
    const order = { total: 150, items: [] };
    
    // Act - perform the action
    const result = calculateDiscount(order);
    
    // Assert - verify the outcome
    expect(result.discount).toBe(15);
    expect(result.finalTotal).toBe(135);
  });
});
```

## Test Naming

Use descriptive names that explain behavior:

```typescript
// Good - describes behavior
it('should return null when user is not found')
it('should throw ValidationError for invalid email')
it('should include tax in total when user is in taxable state')

// Bad - describes implementation
it('calls findById')
it('returns error')
it('tests tax calculation')
```

## Testing React Components

Use Testing Library and test like a user:

```typescript
import { render, screen, userEvent } from '@testing-library/react';

describe('LoginForm', () => {
  it('should display validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    // Use accessible queries
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);
    
    // Assert on what user sees
    expect(screen.getByText(/valid email required/i)).toBeInTheDocument();
  });
  
  it('should call onSubmit with form data when valid', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### Query Priority

Use queries in this order (most to least preferred):

1. `getByRole` - accessible by role
2. `getByLabelText` - form elements
3. `getByPlaceholderText` - when no label
4. `getByText` - non-interactive elements
5. `getByTestId` - last resort

## Testing APIs

```typescript
import { createMocks } from 'node-mocks-http';
import { POST } from './route';

describe('POST /api/users', () => {
  it('should create user with valid data', async () => {
    const request = new Request('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
      }),
    });
    
    const response = await POST(request);
    const body = await response.json();
    
    expect(response.status).toBe(201);
    expect(body.data).toMatchObject({
      email: 'test@example.com',
      name: 'Test User',
    });
  });
  
  it('should return 400 for invalid email', async () => {
    const request = new Request('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid', name: 'Test' }),
    });
    
    const response = await POST(request);
    
    expect(response.status).toBe(400);
  });
});
```

## Mocking

### What to Mock

- External APIs and services
- Database calls (for unit tests)
- Time and dates
- Random values

### What NOT to Mock

- The code under test
- Simple utility functions
- Types and interfaces

### Mock Patterns

```typescript
// Mock external API
vi.mock('./api/external-service', () => ({
  fetchExternalData: vi.fn().mockResolvedValue({ data: 'mocked' }),
}));

// Mock time
vi.useFakeTimers();
vi.setSystemTime(new Date('2024-01-15'));

// Mock module partially
vi.mock('./utils', async () => {
  const actual = await vi.importActual('./utils');
  return {
    ...actual,
    sendEmail: vi.fn(), // Mock only this
  };
});
```

## Testing Async Code

```typescript
// Wait for async operations
it('should load user data', async () => {
  render(<UserProfile userId="123" />);
  
  // Wait for loading to complete
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});

// Wait for element to disappear
await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

// Wait for multiple assertions
await waitFor(() => {
  expect(screen.getByRole('alert')).toHaveTextContent('Success');
});
```

## Test Data

### Factories

Use factories for consistent test data:

```typescript
// factories/user.ts
export function createTestUser(overrides: Partial<User> = {}): User {
  return {
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    createdAt: new Date('2024-01-01'),
    ...overrides,
  };
}

// In tests
const adminUser = createTestUser({ role: 'admin' });
```

### Database Testing

```typescript
// Use transactions for isolation
beforeEach(async () => {
  await prisma.$executeRaw`BEGIN`;
});

afterEach(async () => {
  await prisma.$executeRaw`ROLLBACK`;
});

// Or use a test database with cleanup
afterEach(async () => {
  await prisma.user.deleteMany();
});
```

## Coverage Guidelines

- Aim for 80%+ coverage on business logic
- Don't chase 100%—focus on meaningful tests
- Exclude from coverage: types, interfaces, trivial code
- Cover edge cases and error paths, not just happy paths

## Test Organization

```
src/
  features/
    users/
      UserProfile.tsx
      UserProfile.test.tsx     # Co-located tests
      user-service.ts
      user-service.test.ts
  
tests/
  e2e/
    login.spec.ts              # E2E tests separate
  integration/
    api/
      users.test.ts            # API integration tests
```

## Continuous Integration

- Run tests on every pull request
- Block merges on test failures
- Run faster tests (unit) first, slower (e2e) last
- Cache dependencies and test results
