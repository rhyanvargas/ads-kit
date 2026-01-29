# Coding Style Rule Template

> Copy this template to `.cursor/rules/coding-style.mdc` and customize for your project.

## Naming Conventions

### Variables and Functions
- Use `camelCase` for variables and functions
- Use `PascalCase` for classes and types
- Use `SCREAMING_SNAKE_CASE` for constants
- Use descriptive names (avoid single letters except in loops)

### Files
- Use `kebab-case` for file names
- Match file name to primary export
- Group related files in folders

## Formatting

### General
- Use 2-space indentation (or customize: 4-space, tabs)
- Maximum line length: 100 characters
- Use trailing commas in multi-line structures
- Always use semicolons (or customize: no semicolons)

### Imports
- Group imports: external, internal, relative
- Sort alphabetically within groups
- Remove unused imports

## Code Style

### Functions
- Keep functions under 30 lines
- Single responsibility per function
- Use early returns to reduce nesting
- Document non-obvious parameters

### Error Handling
- Always handle errors explicitly
- Use custom error types for domain errors
- Log errors with context

### Comments
- Comment "why", not "what"
- Keep comments up to date
- Use JSDoc/docstrings for public APIs

## Linter Configuration

### ESLint (JavaScript/TypeScript)
```json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn"
  }
}
```

### Prettier
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

### Python (ruff/black)
```toml
[tool.ruff]
line-length = 100
select = ["E", "F", "W"]
```

## Usage

The `/quick-start` command will:
1. Detect your existing linter config
2. Extract conventions from your code
3. Merge with this template
4. Update `project.mdc` with the result

Customize this template before running `/quick-start` if you have specific preferences.
