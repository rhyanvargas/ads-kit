# .cursor Folder

Cursor IDE configuration for spec-driven development.

## Contents

```
.cursor/
├── commands/       # Slash commands (/draft-spec, /plan-impl, etc.)
├── rules/          # Persistent rules (always loaded)
├── templates/      # Rule templates for customization
└── plans/          # Generated implementation plans
```

## Quick Start

```
/quick-start
```

## Commands Available

- `/draft-spec` - Generate spec from idea
- `/plan-impl` - Create implementation plan
- `/implement-spec` - Generate code from spec
- `/review` - Quality check
- `/extract-spec` - Document existing code
- `/quick-start` - Initialize workflow

## Customization

1. Copy templates to rules:
   ```bash
   cp templates/coding-style.rule.md rules/my-style.mdc
   ```

2. Edit for your project

3. Agent picks up changes automatically

## Documentation

Full documentation at [/docs](../docs/):
- [Getting Started](../docs/getting-started.md)
- [Commands Reference](../docs/commands-reference.md)
- [Extending](../docs/extending.md)
