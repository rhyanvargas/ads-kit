---
description: Backend API design patterns and RESTful conventions
globs:
  - "**/api/**/*.ts"
  - "**/server/**/*.ts"
  - "**/routes/**/*.ts"
  - "**/controllers/**/*.ts"
---

# API Design Patterns

## Minimum Versions

| Package | Min Version | Notes |
|---------|-------------|-------|
| zod | 3.22+ | Stable schema API, `.pipe()`, improved error messages |
| Next.js | 14.0+ | App Router API routes (`route.ts`), Server Actions |
| @prisma/client | 5.0+ | JSON protocol, improved relations, `$transaction` |
| @upstash/ratelimit | 1.0+ | Stable rate limiting API |

## Design Philosophy

Build APIs that are **consistent, predictable, and self-documenting**. Follow REST conventions where sensible. Prioritize clear error messages and proper status codes.

## RESTful Conventions

### HTTP Methods

| Method | Usage | Idempotent |
|--------|-------|------------|
| GET | Retrieve resources | Yes |
| POST | Create resources | No |
| PUT | Replace resources | Yes |
| PATCH | Partial update | Yes |
| DELETE | Remove resources | Yes |

### URL Structure

```
GET    /api/users          # List users
POST   /api/users          # Create user
GET    /api/users/:id      # Get user
PUT    /api/users/:id      # Replace user
PATCH  /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user

# Nested resources
GET    /api/users/:id/orders
POST   /api/users/:id/orders

# Actions (when CRUD doesn't fit)
POST   /api/users/:id/activate
POST   /api/orders/:id/cancel
```

### Naming Conventions

- Use plural nouns for resources (`/users`, not `/user`)
- Use kebab-case for multi-word URLs (`/user-profiles`)
- Use camelCase for query parameters and JSON fields

## Request/Response Format

### Request Validation

Always validate inputs at the API boundary using Zod:

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['user', 'admin']).default('user'),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

// In handler
export async function POST(request: Request) {
  const body = await request.json();
  const result = createUserSchema.safeParse(body);
  
  if (!result.success) {
    return Response.json(
      { error: 'Validation failed', details: result.error.flatten() },
      { status: 400 }
    );
  }
  
  // result.data is typed and validated
  const user = await createUser(result.data);
  return Response.json(user, { status: 201 });
}
```

### Response Structure

Use consistent response envelopes:

```typescript
// Success response
{
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:00:00Z"
  }
}

// List response with pagination
{
  "data": [...],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}

// Error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": { ... }
  }
}
```

## Status Codes

Use appropriate HTTP status codes:

### Success (2xx)

- `200 OK` - Successful GET, PUT, PATCH, DELETE
- `201 Created` - Successful POST that creates a resource
- `204 No Content` - Successful DELETE with no body

### Client Errors (4xx)

- `400 Bad Request` - Invalid request body/params
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Resource state conflict (duplicate email, etc.)
- `422 Unprocessable Entity` - Valid syntax but semantic errors
- `429 Too Many Requests` - Rate limit exceeded

### Server Errors (5xx)

- `500 Internal Server Error` - Unexpected server error
- `502 Bad Gateway` - Upstream service error
- `503 Service Unavailable` - Temporary overload/maintenance

## Error Handling

### Centralized Error Handling

```typescript
// Define application errors
class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super('NOT_FOUND', `${resource} with id ${id} not found`, 404);
  }
}

class ValidationError extends AppError {
  constructor(details: unknown) {
    super('VALIDATION_ERROR', 'Validation failed', 400, details);
  }
}

// Error handler middleware
function errorHandler(error: Error): Response {
  if (error instanceof AppError) {
    return Response.json(
      { error: { code: error.code, message: error.message, details: error.details } },
      { status: error.statusCode }
    );
  }
  
  // Log unexpected errors
  console.error('Unexpected error:', error);
  return Response.json(
    { error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } },
    { status: 500 }
  );
}
```

### Never Expose Internal Details

- Don't expose stack traces in production
- Use generic messages for 500 errors
- Log full details server-side, return safe messages to clients

## Authentication & Authorization

### Authentication

```typescript
// Middleware to verify auth
async function requireAuth(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new AppError('UNAUTHORIZED', 'Authentication required', 401);
  }
  
  const session = await verifyToken(token);
  if (!session) {
    throw new AppError('UNAUTHORIZED', 'Invalid or expired token', 401);
  }
  
  return session;
}
```

### Authorization

```typescript
// Role-based access control
function requireRole(...roles: string[]) {
  return (session: Session) => {
    if (!roles.includes(session.user.role)) {
      throw new AppError(
        'FORBIDDEN',
        'You do not have permission to perform this action',
        403
      );
    }
  };
}

// Resource-based access control
async function requireOwnership(userId: string, session: Session) {
  if (session.user.id !== userId && session.user.role !== 'admin') {
    throw new AppError('FORBIDDEN', 'Access denied', 403);
  }
}
```

## Data Access Pattern

### Repository Pattern

Separate data access from business logic:

```typescript
// Repository interface
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<void>;
}

// Implementation
class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}
  
  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  // ...
}

// Service uses repository
class UserService {
  constructor(private userRepo: UserRepository) {}
  
  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundError('User', id);
    }
    return user;
  }
}
```

## Pagination

```typescript
const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
});

async function listUsers(params: { page: number; pageSize: number }) {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip: (params.page - 1) * params.pageSize,
      take: params.pageSize,
    }),
    prisma.user.count(),
  ]);
  
  return {
    data: users,
    meta: {
      page: params.page,
      pageSize: params.pageSize,
      total,
      totalPages: Math.ceil(total / params.pageSize),
    },
  };
}
```

## Rate Limiting

Implement rate limiting for public endpoints:

```typescript
// Use headers to communicate limits
response.headers.set('X-RateLimit-Limit', '100');
response.headers.set('X-RateLimit-Remaining', '95');
response.headers.set('X-RateLimit-Reset', '1642000000');
```

## API Versioning

For significant breaking changes, use URL versioning:

```
/api/v1/users
/api/v2/users
```

Prefer evolving APIs backward-compatibly:
- Add fields, don't remove them
- Make new fields optional
- Deprecate before removing
