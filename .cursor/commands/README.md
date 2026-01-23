# Cursor Commands

Custom commands for project setup, analysis, and rule generation.

## Quick Reference

| Command | Purpose | Recommended For |
|---------|---------|-----------------|
| `/quick-start` | **Create minimal, focused rules** | ⭐ Most projects |
| `/init-project-config` | Capture architecture decisions → config | Extended setup |
| `/create-rules` | Comprehensive rules from templates | Large teams |
| `/analyze-codebase` | Audit code against rules | Code review |
| `/create-feature-spec` | Generate feature specification | Planning |

## Recommended Workflow

### Minimal (Most Projects)

```bash
/quick-start              # Creates ONE focused rule file
```

Done! Add more rules only when Agent makes repeated mistakes.

### Extended (Large Teams)

```bash
/init-project-config      # Answer architecture questions → config file
/create-rules             # All extended rules (or use parameters for specific types)
```

## Project Structure

```
.cursor/
├── commands/                    # This folder
│   ├── quick-start.md          # ⭐ Recommended starting point
│   ├── init-project-config.md
│   ├── create-rules.md         # 📚 Extended rules (all types)
│   ├── analyze-codebase.md
│   └── create-feature-spec.md
├── templates/
│   ├── rules/
│   │   └── project.mdc         # ⭐ Minimal template
│   ├── extended/
│   │   └── rules/              # 📚 Comprehensive templates
│   ├── project-config.yaml
│   └── feature-spec-template.md
```

## Philosophy

Per [Cursor's documentation](https://cursor.com/docs/context/rules.md):

> *"Start simple. Add rules only when you notice Agent making the same mistake repeatedly. Don't over-optimize before you understand your patterns."*

Agent already knows:
- SOLID, KISS, DRY principles
- TypeScript, React, Python best practices
- REST/GraphQL conventions
- Conventional commits
- Testing patterns

**Your rules should focus on:**
- YOUR project's unique architecture
- Internal libraries Agent doesn't know
- Patterns that DIFFER from common conventions
- References to canonical example files

## Templates

### Minimal Templates

| Template | Used By | Purpose |
|----------|---------|---------|
| `templates/rules/project.mdc` | `/quick-start` | Single focused rule |
| `AGENTS.md` (root) | Direct use | Simplest option |

### Extended Templates

All extended templates are used by `/create-rules` with appropriate parameters.

| Template | Parameter | Lines |
|----------|-----------|-------|
| `extended/rules/general-rule.md` | (default) | 162 |
| `extended/rules/security-rule.md` | (default) | 141 |
| `extended/rules/git-rule.md` | (default) | 156 |
| `extended/rules/testing-rule.md` | (default) | 146 |
| `extended/rules/documentation-rule.md` | (default) | 141 |
| `extended/rules/typescript-rule.md` | `lang:typescript` | 114 |
| `extended/rules/python-rule.md` | `lang:python` | 81 |
| `extended/rules/react-rule.md` | `frontend` | 100 |
| `extended/rules/api-rule.md` | `api` | 119 |
| `extended/rules/infrastructure-rule.md` | `infra` | 97 |

## Customization

All templates include `<!-- PROJECT-SPECIFIC -->` sections for your additions.
