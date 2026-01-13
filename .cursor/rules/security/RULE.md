---
description: Security best practices for web applications
alwaysApply: true
---

# Security Practices

## Minimum Versions

| Package | Min Version | Notes |
|---------|-------------|-------|
| bcrypt | 5.0+ | Stable async API, security patches |
| zod | 3.22+ | Input validation at boundaries |
| dompurify | 3.0+ | Modern sanitization, TypeScript support |
| @upstash/ratelimit | 1.0+ | Rate limiting implementation |
| next | 14.0+ | Security headers via `next.config.js` |

## Philosophy

Security is not optional. Build security into the development process from day one. Assume inputs are malicious, outputs are monitored, and secrets will leak if not protected.

## Input Validation

### Validate at Boundaries

All external input must be validated before use:

```typescript
// API endpoint - validate request body
const schema = z.object({
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
});

const result = schema.safeParse(requestBody);
if (!result.success) {
  return Response.json({ error: 'Invalid input' }, { status: 400 });
}

// Use result.data - it's validated
```

### Sanitization

- Escape HTML output to prevent XSS
- Use parameterized queries for database access
- Sanitize file uploads (validate type, size, name)

```typescript
// React automatically escapes - but be careful with dangerouslySetInnerHTML
// NEVER do this without sanitization:
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// Use a sanitization library if HTML is required
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

## SQL Injection Prevention

Never concatenate user input into SQL queries:

```typescript
// BAD - SQL injection vulnerability
const query = `SELECT * FROM users WHERE email = '${email}'`;

// GOOD - Parameterized query (Prisma)
const user = await prisma.user.findUnique({
  where: { email },
});

// GOOD - Parameterized query (raw SQL)
const user = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = ${email}
`;
```

## XSS Prevention

### Output Encoding

- React escapes by default—trust it
- Be careful with `dangerouslySetInnerHTML`
- Sanitize user content before rendering as HTML

### Content Security Policy

Configure CSP headers:

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';",
  },
];
```

## Authentication

### Password Handling

```typescript
// NEVER store plaintext passwords
// Use bcrypt or argon2 for hashing
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

### Session Management

- Use secure, HTTP-only cookies for session tokens
- Implement session expiration
- Rotate session tokens after authentication
- Invalidate sessions on logout

```typescript
// Secure cookie settings
cookies().set('session', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
});
```

### JWT Best Practices

- Use short expiration times (15 minutes for access tokens)
- Implement refresh token rotation
- Store refresh tokens securely (HTTP-only cookie)
- Include minimal claims in JWT

## Authorization

### Principle of Least Privilege

Users should have only the permissions they need:

```typescript
// Check permissions explicitly
async function updateUser(userId: string, data: UpdateData, session: Session) {
  // Check ownership or admin role
  if (session.user.id !== userId && session.user.role !== 'admin') {
    throw new ForbiddenError('Cannot update other users');
  }
  
  // Role-specific field restrictions
  if (data.role && session.user.role !== 'admin') {
    throw new ForbiddenError('Only admins can change roles');
  }
  
  return userRepo.update(userId, data);
}
```

### RBAC Implementation

```typescript
const permissions = {
  admin: ['read', 'write', 'delete', 'manage-users'],
  editor: ['read', 'write'],
  viewer: ['read'],
} as const;

function hasPermission(role: string, permission: string): boolean {
  return permissions[role]?.includes(permission) ?? false;
}
```

## Environment Variables

### Secrets Management

- Never commit secrets to version control
- Use `.env.local` for local development (add to `.gitignore`)
- Use secret management services in production (AWS Secrets Manager, Vault)

```typescript
// .env.local
DATABASE_URL="..."
JWT_SECRET="..."
API_KEY="..."

// Validate env vars at startup
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

const env = envSchema.parse(process.env);
```

### Client-Side Exposure

- Never expose secrets to the client
- Use `NEXT_PUBLIC_` prefix only for public config
- Server secrets should stay on the server

```typescript
// WRONG - exposes secret to client
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// RIGHT - keep on server, proxy through API route
// pages/api/data.ts
const data = await fetchWithApiKey(process.env.API_KEY);
```

## HTTPS

- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Use HSTS headers

```typescript
// Security headers
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains'
}
```

## CSRF Protection

- Use SameSite cookies
- Implement CSRF tokens for state-changing operations
- Verify origin/referer headers

```typescript
// SameSite cookie protection
cookies().set('session', token, {
  sameSite: 'lax', // or 'strict'
});

// CSRF token for forms
<input type="hidden" name="csrf_token" value={csrfToken} />
```

## Rate Limiting

Protect against brute force and DoS:

```typescript
// Implement rate limiting on sensitive endpoints
// - Login attempts: 5 per minute per IP
// - Password reset: 3 per hour per email
// - API calls: Based on plan/tier

// Use upstash/ratelimit or similar
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});
```

## File Uploads

```typescript
// Validate file uploads
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function validateUpload(file: File) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  // Don't trust file extension - verify magic bytes
}

// Store uploads outside web root or use cloud storage
// Generate random filenames to prevent enumeration
```

## Logging Security Events

Log security-relevant events:

```typescript
// Log authentication events
logger.info('User login', { userId, ip, userAgent });
logger.warn('Failed login attempt', { email, ip, attempts });
logger.error('Unauthorized access attempt', { userId, resource, ip });

// NEVER log:
// - Passwords or tokens
// - Full credit card numbers
// - Sensitive PII
```

## Dependency Security

- Run `npm audit` regularly
- Keep dependencies updated
- Review new dependencies before adding
- Use lockfiles for reproducible builds

```bash
# Check for vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix
```

## Security Headers

Configure all recommended security headers:

```typescript
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
```
