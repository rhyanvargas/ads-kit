# Cursor Spec-Driven Starter

A minimal starter template for spec-driven AI-assisted development with Cursor IDE.

## Purpose

Write specs, let the agent implement. This starter provides commands, rules, and workflows for consistent, reliable AI-assisted coding.

## Quick Start

```bash
# 1. Copy to your project
cp -r .cursor/ your-project/
cp -r docs/ your-project/

# 2. Open in Cursor and run
/quick-start

# 3. Start building
/draft-spec "your feature idea"
```

## Workflows

| Workflow | When | Flow |
|----------|------|------|
| **Greenfield** | New features | `/draft-spec` → `/plan-impl` → `/implement-spec` → `/review` |
| **Brownfield** | Existing code | `/quick-start` → `/extract-spec` → then greenfield flow |
| **Quick fix** | Trivial changes | Just describe in chat |

See [Greenfield Workflow](docs/greenfield-workflow.md) and [Brownfield Workflow](docs/brownfield-workflow.md).

## Commands

| Command | When to Use |
|---------|-------------|
| `/draft-spec` | New feature idea |
| `/plan-impl` | Before coding (medium+ changes) |
| `/implement-spec` | After spec approved |
| `/review` | After implementation |
| `/extract-spec` | Document existing code |
| `/quick-start` | First-time setup |

See [Commands Reference](docs/commands-reference.md).

## Documentation

| Doc | Purpose |
|-----|---------|
| [Getting Started](docs/getting-started.md) | Installation and setup |
| [Problem Size Guide](docs/problem-size-guide.md) | When to use which workflow |
| [Spec Writing Guide](docs/spec-writing-guide.md) | Write effective specs |
| [Extending](docs/extending.md) | Add rules and commands |
| [Best Practices](docs/best-practices.md) | Tips and references |
| [Overview](docs/spec-driven-overview.md) | SDD concepts explained |

## Extending

Add rules when the agent makes repeated mistakes:
```bash
cp .cursor/templates/coding-style.rule.md .cursor/rules/my-style.mdc
```

Add commands for workflows you repeat:
```bash
touch .cursor/commands/my-workflow.md
```

See [Extending](docs/extending.md).

## References

- [Cursor Agent Best Practices](https://cursor.com/blog/agent-best-practices)
- [Martin Fowler: Understanding SDD](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

## License

MIT
