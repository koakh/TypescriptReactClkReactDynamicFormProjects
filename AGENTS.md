# AGENTS.md

This file contains essential information for agentic coding agents working in this repository.

## Build/Test/Lint Commands

This is a pnpm workspace with two main packages:
- `clk-react-dynamic-form` - The main library package
- `clk-react-dynamic-form-consumer-app` - Consumer app for testing

### Development Commands

```bash
# Start library in watch mode (from workspace root)
pnpm start:dev
# or
pnpm --filter clk-react-dynamic-form watch

# Start consumer app (from workspace root)
pnpm start:app
# or
pnpm --filter clk-react-dynamic-form-consumer-app start
```

### Build Commands

```bash
# Build library for production
cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form
pnpm build

# Build consumer app
cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app
npm run build
```

### Test Commands

```bash
# Run all tests in consumer app
cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app
npm test

# Run a single test file
npm test -- --testPathPattern=App.test

# Run tests in watch mode
npm test -- --watch
```

### Git Commands

Always use git-sync scripts for dual repository management:

```bash
# Commit/Push all: pnpm git:sync "commit message"
pnpm git:sync "feature: added new feature"

# Pull all changes
pnpm git:pull

# Checkout branch (all repos)
pnpm git:checkout main

# Sync only child repo
pnpm git:sync "fix: child issue" child

# Sync only root repo
pnpm git:sync "chore: update root" root
```

### Development Workflow with Yalc

```bash
# In consumer app (c3-frontend), link the package
cd /path/to/c3-frontend
yalc link clk-react-dynamic-form

# In package directory, build and publish
cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form
pnpm build:publish:push

# This will hot-reload changes in consumer app via yalc link
```

## Code Style Guidelines

### TypeScript Configuration

- Strict mode is enabled
- Target: ES5, Module: ESNext, JSX: react
- Type assertions allowed where necessary (e.g., `as HTMLElement`)
- Prefer interfaces over type aliases for object shapes

### Imports

Import order (from top to bottom):

1. External libraries (react, MUI, react-hook-form, etc.)
2. Internal project imports (relative paths)
3. Type imports only (if needed)

```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { DynamicFormComponent } from './components/DynamicFormComponent';
import type { Tool } from './interfaces';
```

### Component Patterns

Use functional components with TypeScript:

```typescript
interface Props {
  tool: Tool;
  i18nFn: (input: string, startWith?: string) => string;
  onSubmitHandle: (payload: any) => void;
  onCloseHandle?: () => void;
}

export const DynamicFormComponent: React.FC<Props> = ({
  tool,
  i18nFn,
  onSubmitHandle,
  onCloseHandle
}: Props) => {
  // Component implementation
};
```

### Performance Optimization

Always use `useCallback` for handlers passed as props to prevent unnecessary re-renders:

```typescript
const onSubmitHandle = useCallback((payload: any) => {
  console.log(`payload: ${JSON.stringify(payload, undefined, 2)}`);
}, []);

const i18nFn = useCallback((input: string, startWith = 'micropal:') => {
  return input.startsWith(startWith) ? getResource : input;
}, []);
```

Use `useMemo` for computed values:

```typescript
const HEADERS = useMemo(() => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${accessToken}`
}), [accessToken]);
```

### Form Management with React Hook Form

```typescript
const {
  control,
  register,
  handleSubmit,
  reset,
  watch,
  setValue,
  formState: { errors },
} = useForm();

// Register inputs
<input {...register('fieldName', { required: true })} />

// Handle submit
const onSubmit = (data: any) => {
  console.log(data);
};
```

### Error Handling

- Use global state for form errors: `useState<{ [key: string]: string }>({})`
- Display errors using MUI Alert component with severity="error"
- Validate forms before submission using custom validation functions

### File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `DynamicFormComponent.tsx`)
- Utilities: `lowercase.ts` (e.g., `main.ts`)
- Interfaces: `kebab-case.interface.ts` (e.g., `dynamic-form.interface.ts`)
- Types: `kebab-case.type.ts` (e.g., `dynamic-form.type.ts`)
- Enums: `kebab-case.enum.ts` (e.g., `dynamic-form.enum.ts`)

### Naming Conventions

- Components: PascalCase (`DynamicFormComponent`)
- Functions: camelCase (`generateElement`, `getI18nValue`)
- Constants: UPPER_SNAKE_CASE for exports, camelCase for locals
- Interfaces: PascalCase (`DynamicForm`, `Tool`)
- Types: PascalCase (`DynamicFormElementType`)

### Code Formatting

- 2-space indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line arrays/objects
- Props and state declared at top of component

### i18n Support

Forms support internationalization through the `i18nFn` prop:

```typescript
const i18nFn = useCallback((input: string, startWith = 'micropal:') => {
  const getResource = `[i18n]${input}[/i18n]`;
  return input.startsWith(startWith) ? getResource : input;
}, []);
```

### Rollup Build Configuration

The library uses Rollup for bundling:

- Outputs: `dist/index.js` (CJS) and `dist/index.esm.js` (ESM)
- External dependencies: react, react-dom, react-hook-form, @mui/material, @emotion/react, @emotion/styled
- Source maps enabled in both tsconfig and rollup config
- Supports both React 18 and React 19 via peer dependencies

### React 18 Entry Point

Use the new createRoot API (not ReactDOM.render):

```typescript
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
```

### Material UI Patterns

- Use `FormControl` wrapper for form elements
- Pass `sx` prop for styling with theme support
- Use `Controller` from react-hook-form for controlled components like RadioGroup
- Use `sx={dynamicForm?.properties?.styles?.input}` for dynamic styling

### Validation Rules

Validation rules support multiple formats:

```typescript
validationRules: {
  required: true,
  min: 5,
  maxLength: { value: 100, message: 'Too long' },
  validate: [
    { customValidator: (value) => value > 0, errorMessage: 'Must be positive' }
  ]
}
```

### Dynamic Attributes

Forms support dynamic attribute injection via strings:

```typescript
attributes: "variant='outlined' fullWidth"
attributesFormControl: "margin='dense'"
```

### Comments

- Keep comments concise
- Use // for single-line comments
- Explain complex logic only
- No JSDoc-style comments required for simple functions
