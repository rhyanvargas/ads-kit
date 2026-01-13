---
description: React and Next.js patterns for scalable frontend development
globs:
  - "**/*.tsx"
  - "**/*.jsx"
---

# React & Next.js Patterns

## Minimum Versions

These patterns assume the following minimum versions:

| Package | Min Version | Notes |
|---------|-------------|-------|
| React | 18.0+ | Concurrent features, `useId`, automatic batching |
| Next.js | 14.0+ | App Router stable, Server Actions, `async` components |
| TypeScript | 5.0+ | `const` type parameters, decorators |
| @tanstack/react-query | 5.0+ | New `useQuery` API with object syntax |
| react-hook-form | 7.0+ | `useForm` API, `resolver` pattern |
| tailwindcss | 3.4+ | Modern config format, `@apply` warnings |
| class-variance-authority | 0.7+ | Stable `cva` API |
| clsx | 2.0+ | ESM support |
| tailwind-merge | 2.0+ | Tailwind v3.4 compatibility |

## Component Philosophy

Build components that are **predictable, composable, and testable**. Prefer composition over inheritance. Keep components focused on a single responsibility.

## Component Structure

### File Organization

```typescript
// 1. Imports (external, then internal)
import { useState } from 'react';
import { Button } from '@/components/ui';
import { formatDate } from '@/utils';

// 2. Types
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

// 3. Component
export function UserCard({ user, onEdit }: UserCardProps) {
  // 3a. Hooks
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 3b. Derived state
  const fullName = `${user.firstName} ${user.lastName}`;
  
  // 3c. Handlers
  const handleEdit = () => onEdit?.(user);
  
  // 3d. Render
  return (
    <div>...</div>
  );
}
```

### Component Sizing

- If a component exceeds ~150 lines, consider splitting
- Extract reusable logic into custom hooks
- Extract repeated UI patterns into smaller components

## Props Patterns

### Interface Naming

Use descriptive interface names with `Props` suffix:

```typescript
interface UserProfileProps {
  user: User;
  isEditable?: boolean;
}
```

### Children and Composition

```typescript
// Prefer composition
interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

// Use render props sparingly, prefer children
<Card header={<CardHeader />}>
  <CardContent />
</Card>
```

### Prop Drilling

- Avoid drilling props more than 2-3 levels deep
- Use React Context for truly global state (auth, theme)
- Use component composition to reduce prop drilling

## State Management

### Local State First

Start with local state. Only lift state when multiple components need it.

```typescript
// Local state - start here
const [count, setCount] = useState(0);

// Lift to parent when siblings need it
// Use context when distant components need it
// Use external stores (Zustand, Redux) for complex global state
```

### State Colocation

Keep state as close to where it's used as possible:

```typescript
// BAD: State in parent when only child uses it
function Parent() {
  const [filter, setFilter] = useState('');
  return <Child filter={filter} onFilterChange={setFilter} />;
}

// GOOD: State in the component that uses it
function Parent() {
  return <Child />;
}

function Child() {
  const [filter, setFilter] = useState('');
  // Uses filter locally
}
```

### Server State

Use React Query/TanStack Query or SWR for server state:

```typescript
// Server state with React Query
const { data: users, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

## Custom Hooks

### When to Extract

Extract custom hooks when:
- Logic is reused across components
- Logic is complex and obscures the component's purpose
- Logic needs to be tested independently

### Hook Patterns

```typescript
// Return object for multiple values
function useAuth() {
  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}

// Return tuple for simple state+setter patterns
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}
```

### Hook Naming

- Prefix with `use`
- Name should describe what it provides: `useAuth`, `useLocalStorage`, `useDebounce`

## Performance

### Memoization

Use sparingly and measure first:

```typescript
// useMemo - for expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// useCallback - for stable function references passed to children
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// React.memo - for components that re-render with same props
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map(item => <ExpensiveItem key={item.id} item={item} />);
});
```

### Lazy Loading

```typescript
// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

## Next.js App Router

### Server vs Client Components

Default to Server Components. Use Client Components only when needed:

```typescript
// Server Component (default) - no 'use client' directive
// ✅ Data fetching, accessing backend, heavy dependencies

// Client Component - add 'use client'
// ✅ Interactivity (onClick, onChange)
// ✅ Browser APIs
// ✅ State (useState, useEffect)
// ✅ Custom hooks
```

### Data Fetching

```typescript
// Server Component data fetching
async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  return <UserProfile user={user} />;
}

// With loading and error states
// app/users/[id]/loading.tsx
// app/users/[id]/error.tsx
```

### Route Organization

```
app/
  (marketing)/        # Route groups for layouts
    page.tsx
    about/
  (dashboard)/
    layout.tsx        # Shared dashboard layout
    dashboard/
    settings/
  api/
    users/
      route.ts        # API routes
```

## Error Handling

### Error Boundaries

```typescript
// Use error.tsx for route-level error handling
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Forms

### Controlled Forms

Use React Hook Form for complex forms:

```typescript
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: { name: '', email: '' },
});

return (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <input {...form.register('name')} />
    {form.formState.errors.name && (
      <span>{form.formState.errors.name.message}</span>
    )}
  </form>
);
```

## Styling with Tailwind CSS

### Philosophy

Use Tailwind CSS for utility-first styling. Prefer composition of utilities over custom CSS. Keep styles colocated with components.

### Class Organization

Order classes logically for readability:

```tsx
// Order: layout → sizing → spacing → typography → colors → effects → states
<button className="
  flex items-center justify-center    {/* layout */}
  w-full h-10                          {/* sizing */}
  px-4 py-2 gap-2                      {/* spacing */}
  text-sm font-medium                  {/* typography */}
  bg-blue-600 text-white               {/* colors */}
  rounded-lg shadow-sm                 {/* effects */}
  hover:bg-blue-700 focus:ring-2       {/* states */}
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Submit
</button>
```

### Component Variants with CVA

Use `class-variance-authority` for component variants:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
```

### Utility Function for Class Merging

Use `clsx` + `tailwind-merge` for conditional classes:

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'rounded-lg p-4',
  isActive && 'bg-blue-100 border-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed',
  className
)} />
```

### Responsive Design

Use mobile-first responsive modifiers:

```tsx
<div className="
  grid grid-cols-1        {/* mobile: 1 column */}
  md:grid-cols-2          {/* tablet: 2 columns */}
  lg:grid-cols-3          {/* desktop: 3 columns */}
  gap-4 md:gap-6 lg:gap-8
">
```

### Dark Mode

Use the `dark:` modifier with CSS variables:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

### Best Practices

- **Avoid `@apply` in CSS** - defeats Tailwind's purpose, use component extraction instead
- **Extract components, not classes** - when repeating utilities, create a React component
- **Use design tokens** - configure `tailwind.config.ts` with project colors, spacing, fonts
- **Prefer semantic color names** - `bg-primary` over `bg-blue-600` for maintainability
- **Keep class strings readable** - use template literals or arrays for long class lists

```tsx
// For very long class lists, consider this pattern
const baseStyles = 'flex items-center justify-center rounded-lg';
const sizeStyles = 'h-10 px-4 py-2';
const colorStyles = 'bg-primary text-white hover:bg-primary/90';

<button className={cn(baseStyles, sizeStyles, colorStyles)} />
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Define semantic colors
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

## Accessibility

- Use semantic HTML elements (`button`, `nav`, `main`, `article`)
- Add `aria-label` for icon-only buttons
- Ensure keyboard navigation works
- Maintain focus management for modals/dialogs
- Use proper heading hierarchy (h1 → h2 → h3)

## Testing Considerations

- Test behavior, not implementation
- Use Testing Library queries (`getByRole`, `getByLabelText`)
- Avoid testing internal state directly
- Mock external dependencies, not internal modules
