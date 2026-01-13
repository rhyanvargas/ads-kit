---
description: React frontend patterns including Ant Design, React Hook Form with Zod, custom hooks, and TailwindCSS styling conventions
globs: ai_request_form_frontend/**/*.tsx, ai_request_form_frontend/**/*.jsx
alwaysApply: false
---

# React Frontend Patterns

## Component Structure

### Functional Components Only
- Use functional components with hooks
- Named exports for components
- Props interface defined at the top of the file

```tsx
import { useState } from 'react';

interface MyComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

const MyComponent = ({ title, onSubmit }: MyComponentProps) => {
  // Component logic
  return <div>{title}</div>;
};

export default MyComponent;
```

## Ant Design Usage

### Import Pattern
```tsx
import { Form, Input, Button, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
```

### Form.Item with Controller
When using React Hook Form with Ant Design:

```tsx
<Form.Item
  label={<span className="ai-request-form-form-label">Field Label <Required /></span>}
  validateStatus={errors.fieldName && touchedFields.fieldName ? 'error' : ''}
  help={touchedFields.fieldName ? (errors.fieldName?.message as string | undefined) : undefined}
>
  <Controller
    name="fieldName"
    control={control}
    render={({ field }) => (
      <Input {...field} className="ai-request-form-form-input" placeholder="Enter value" />
    )}
  />
</Form.Item>
```

### Notifications
```tsx
import { message } from 'antd';

// Success
message.success('Operation completed successfully');

// Error
message.error('Something went wrong');

// Warning
message.warning('Please check your input');
```

## React Hook Form + Zod

### Schema Definition (in types/formSchema.ts)
```tsx
import { z } from 'zod';

export const requestFormSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .refine((email) => email.toLowerCase().endsWith('.gov'), {
      message: "Only .gov email addresses are allowed"
    }),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type RequestFormType = z.infer<typeof requestFormSchema>;
```

### Form Setup
```tsx
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestFormSchema, RequestFormType } from '../types/formSchema';

const methods = useForm<RequestFormType>({
  resolver: zodResolver(requestFormSchema),
  mode: 'onBlur',
});
```

### Multi-Step Forms
Use `useFormContext()` in child components:

```tsx
import { useFormContext, Controller } from 'react-hook-form';

const StepComponent = () => {
  const { control, formState: { errors, touchedFields } } = useFormContext();
  // ... render form fields
};
```

## Custom Hooks Pattern

### useApi Hook Usage
```tsx
import { useSubmitRequest, useGetRequests } from '../hooks/useApi';

const MyComponent = () => {
  const { data, loading, error, execute } = useSubmitRequest();
  
  const handleSubmit = async (formData: FormData) => {
    const result = await execute(formData);
    if (result) {
      // Success handling
    }
  };
};
```

### Creating New API Hooks
```tsx
export const useMyFeature = () => {
  return useApi(
    async (params: MyParams) => {
      const apiClient = (await import('../services/api')).apiClient;
      return apiClient.myEndpoint(params);
    },
    true,  // showSuccessMessage
    true   // useGlobalLoading
  );
};
```

## TailwindCSS with DDS Colors

### Available DDS Colors
```css
dds-blue: #0a3556    /* Primary blue */
dds-gold: #f7b718    /* Accent gold */
dds-header-bg: #31333f
dds-gray: #f3f4f6
dds-black: #000000
dds-white: #ffffff
```

### Usage
```tsx
<div className="bg-dds-blue text-dds-white">
  <span className="text-dds-gold">Highlighted</span>
</div>
```

### Combining with Ant Design
- Use `className` prop on Ant Design components for Tailwind utilities
- Prefix custom form styles with `ai-request-form-` namespace

## Date Handling

### Use dayjs with Timezone Support
```tsx
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Format for Pacific Time
const today = dayjs().tz('America/Los_Angeles').format('YYYY-MM-DD');
```

## Routing

### Protected Routes
- `<ProtectedRoute>` - Requires authentication
- `<AdminRoute>` - Requires authentication AND admin access
- `<PublicRoute>` - Redirects to dashboard if already logged in

### Route Structure
```tsx
<Routes>
  {/* Public */}
  <Route path="/" element={<Layout><RequestFormPage /></Layout>} />
  
  {/* Auth Routes */}
  <Route path="/login" element={<PublicRoute><Layout><LoginPage /></Layout></PublicRoute>} />
  
  {/* Admin Routes */}
  <Route path="/dashboard" element={<AdminRoute><Layout><Dashboard /></Layout></AdminRoute>} />
</Routes>
```
