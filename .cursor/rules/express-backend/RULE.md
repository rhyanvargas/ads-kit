---
description: Express.js backend patterns including Service-Controller architecture, PostgreSQL queries, Winston logging, and middleware conventions
globs: ai_request_form_backend/**/*.ts
alwaysApply: false
---

# Express Backend Patterns

## Service-Controller Architecture

### Controller Layer (Thin)
Controllers handle HTTP concerns only:
- Parse request parameters and body
- Call service methods
- Return appropriate HTTP status codes

```typescript
import { Request, Response } from 'express';
import { MyService } from '../services/myService';

const myService = new MyService();

export class MyController {
  async getItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await myService.getItemById(id);
      
      if (!result.success) {
        return res.status(404).json(result);
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again.'
      });
    }
  }
}
```

### Service Layer (Business Logic)
Services contain all business logic and database operations:

```typescript
import pool from '../config/database';
import { ApiResponse, MyEntity } from '../types';

export class MyService {
  async getItemById(id: string): Promise<ApiResponse<MyEntity>> {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        'SELECT * FROM my_table WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return { success: false, error: 'Item not found' };
      }

      return { success: true, data: result.rows[0] };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Database error'
      };
    } finally {
      client.release(); // ALWAYS release the client
    }
  }
}
```

## PostgreSQL Patterns

### Connection Pool Usage
ALWAYS use the try/finally pattern with `client.release()`:

```typescript
const client = await pool.connect();
try {
  // Database operations
} finally {
  client.release();
}
```

### Transactions
```typescript
const client = await pool.connect();
try {
  await client.query('BEGIN');
  
  // Multiple operations...
  await client.query('INSERT INTO...', [...]);
  await client.query('UPDATE...', [...]);
  
  await client.query('COMMIT');
  return { success: true, data: result };
} catch (error) {
  await client.query('ROLLBACK');
  return { success: false, error: error.message };
} finally {
  client.release();
}
```

### Parameterized Queries
ALWAYS use parameterized queries to prevent SQL injection:

```typescript
// CORRECT
const result = await client.query(
  'SELECT * FROM users WHERE email = $1 AND status = $2',
  [email, status]
);

// NEVER do this
// const result = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
```

### Pagination Pattern
```typescript
const offset = (params.page - 1) * params.limit;
const limit = Math.min(params.limit, 100); // Cap at 100

const query = `
  SELECT *, COUNT(*) OVER() as total_count
  FROM my_table
  ORDER BY created_at DESC
  LIMIT $1 OFFSET $2
`;

const result = await client.query(query, [limit, offset]);
```

## Winston Logging

### Import and Usage
```typescript
import logger from '../config/logger';

// Info logging
logger.info('Operation completed', { 
  userId: user.id,
  action: 'create',
  timestamp: new Date().toISOString()
});

// Error logging
logger.error('Operation failed', {
  error: error.message,
  stack: error.stack,
  requestId: req.headers['x-request-id']
});

// Warning logging
logger.warn('Suspicious activity', {
  ip: req.ip,
  attempts: failedAttempts
});
```

### Log Levels
- `error`: Application errors, exceptions
- `warn`: Suspicious activity, deprecation warnings
- `info`: Successful operations, state changes
- `debug`: Detailed debugging (development only)

## Route Definitions

### Route File Structure
```typescript
import { Router } from 'express';
import { MyController } from '../controllers/myController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';

const router = Router();
const controller = new MyController();

// Public routes
router.post('/', validateRequest, (req, res) => controller.create(req, res));

// Protected routes
router.get('/:id', authenticate, (req, res) => controller.getById(req, res));
router.put('/:id', authenticate, (req, res) => controller.update(req, res));
router.delete('/:id', authenticate, (req, res) => controller.delete(req, res));

export default router;
```

## Middleware Patterns

### Authentication Middleware
```typescript
import { authenticateToken } from '../middleware/auth';

// Apply to specific routes
router.get('/protected', authenticateToken, handler);

// Or apply to all routes in a router
router.use(authenticateToken);
```

### Validation Middleware
Use express-validator for request validation:

```typescript
import { body, validationResult } from 'express-validator';

const validateCreate = [
  body('email').isEmail().withMessage('Valid email required'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
];

router.post('/', validateCreate, validateRequest, controller.create);
```

## Error Response Format

### Standard Error Response
```typescript
res.status(statusCode).json({
  success: false,
  error: 'Error type or code',
  message: 'Human-readable error message',
  details: [] // Optional: validation errors array
});
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

## Environment Variables

Access via `process.env`:
```typescript
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';
```

Required environment variables:
- `PORT` - Server port
- `DATABASE_URL` or individual DB configs
- `JWT_SECRET` - For token signing
- `CORS_ORIGIN` - Allowed origins
