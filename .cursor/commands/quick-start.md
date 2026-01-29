# /quick-start

Initialize the spec-driven workflow for a project.

## Usage

```
/quick-start
```

## Behavior

1. **Detect** - Analyze project structure and tech stack
2. **Configure** - Set up rules based on detected patterns
3. **Guide** - Explain next steps for the workflow

## What It Does

### 1. Project Detection

Scans for:
- Package managers (`package.json`, `requirements.txt`, `Cargo.toml`, etc.)
- Frameworks (React, Django, Rails, etc.)
- Build tools (webpack, vite, cargo, etc.)
- Test frameworks (jest, pytest, etc.)
- Linters (eslint, prettier, ruff, etc.)

### 2. Rules Configuration

Updates `.cursor/rules/project.mdc` with:
- Detected tech stack
- Build/test/run commands
- Coding conventions from existing config files
- Project-specific patterns

### 3. Workflow Guidance

Provides recommendations based on project state:
- **Greenfield**: Start with `/draft-spec`
- **Brownfield**: Start with `/extract-spec` for documentation

## Instructions

When the user invokes `/quick-start`:

1. Scan the project root for configuration files
2. Detect the tech stack:
   ```
   Language: {detected}
   Framework: {detected}
   Package Manager: {detected}
   Test Framework: {detected}
   Linter: {detected}
   ```
3. Read existing configs for conventions
4. Update `.cursor/rules/project.mdc` with:
   - Project overview
   - Tech stack summary
   - Key commands (build, test, run)
   - Coding standards
5. Check for existing documentation
6. Recommend next steps

## Output

```markdown
## Quick Start Complete

### Detected Stack
- **Language**: TypeScript
- **Framework**: React
- **Package Manager**: npm
- **Test Framework**: Jest
- **Linter**: ESLint + Prettier

### Commands Configured
- **Build**: `npm run build`
- **Test**: `npm test`
- **Run**: `npm start`
- **Lint**: `npm run lint`

### Rules Updated
Updated `.cursor/rules/project.mdc` with project context.

### Next Steps

**For new features:**
1. Run `/draft-spec "your feature idea"`
2. Review and refine the spec
3. Run `/plan-impl` to create a plan
4. Run `/implement-spec` to build it

**For existing code documentation:**
1. Run `/extract-spec src/` to document existing code
2. Review generated specs
3. Use as foundation for changes
```

## Brownfield vs Greenfield

### Greenfield (new project)
- Minimal detection needed
- Focus on setting up conventions
- Recommend starting with `/draft-spec`

### Brownfield (existing project)
- Deep detection of patterns
- Extract conventions from existing code
- Recommend `/extract-spec` first to document
- Then use spec-driven workflow for changes
