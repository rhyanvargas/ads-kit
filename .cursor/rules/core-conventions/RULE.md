---
description: Core TypeScript conventions, naming patterns, and API response structures for the AI Initial Assessment Form project
globs: 
alwaysApply: true
---

# Core Conventions

## Project Overview
This is the AI Initial Assessment Form - a full-stack application for CalHHS/DDS AI use case submissions.
- **Frontend**: React + TypeScript + Vite + Ant Design + TailwindCSS
- **Backend**: Express.js + TypeScript + PostgreSQL
- **Monorepo Structure**: `ai_request_form_frontend/` and `ai_request_form_backend/`

## TypeScript Conventions

### Naming Conventions
- **Variables & Functions**: camelCase (`getUserData`, `isAuthenticated`)
- **Types & Interfaces**: PascalCase (`ApiResponse`, `UseCaseRequestForm`)
- **Database Columns**: snake_case (`request_date`, `ai_functionality`)
- **Constants**: SCREAMING_SNAKE_CASE for true constants, camelCase for config objects

### Type Definitions
- Always define explicit return types for functions
- Use `interface` for object shapes that may be extended
- Use `type` for unions, intersections, and simple aliases
- Export types from centralized locations (`types/index.ts`)

## API Response Pattern

All API responses MUST use the `ApiResponse<T>` wrapper:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### Success Response Example
```typescript
return {
  success: true,
  data: { id: '123', status: 'draft' }
};
```

### Error Response Example
```typescript
return {
  success: false,
  error: 'Validation failed',
  message: 'Email must be a .gov address'
};
```

## Error Handling

### Backend Error Pattern
```typescript
try {
  // ... operation
  return { success: true, data: result };
} catch (error) {
  return {
    success: false,
    error: error instanceof Error ? error.message : 'Unknown error'
  };
}
```

### Frontend Error Pattern
- Use the `useApi` hook for consistent error handling
- Display errors via Ant Design's `message` component
- Log detailed errors in development only

## File Structure Conventions

### Backend (`ai_request_form_backend/src/`)
```
├── config/       # Database, logger, swagger configuration
├── controllers/  # HTTP request handlers (thin layer)
├── middleware/   # Auth, validation, rate limiting
├── routes/       # Express route definitions
├── services/     # Business logic (main logic here)
├── types/        # TypeScript interfaces and types
└── index.ts      # Application entry point
```

### Frontend (`ai_request_form_frontend/src/`)
```
├── components/   # Reusable React components
├── config/       # Environment configuration
├── contexts/     # React Context providers
├── hooks/        # Custom React hooks
├── pages/        # Route-level page components
├── services/     # API client and external services
├── types/        # TypeScript types and Zod schemas
└── utils/        # Helper functions
```

## Import Order
1. External libraries (react, express, etc.)
2. Internal absolute imports
3. Relative imports
4. Type imports (using `import type`)

## Comments
- Use JSDoc for public APIs and complex functions
- Inline comments for non-obvious logic only
- TODO comments with ticket/issue references when applicable
