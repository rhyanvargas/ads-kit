# Cursor Rules — Getting Started

You cloned this `.cursor/` folder into your project. Here's what to do next.

## Quick Start

Run this command in Cursor's chat:

```
/quick-start
```

That's it. The command will:
1. **Scan your codebase** to discover existing architecture
2. **Show you what it found** for confirmation
3. **Update the rules file** with your actual patterns

No manual editing required.

---

## How It Works

### Before `/quick-start`

The rules file (`.cursor/rules/project.mdc`) contains generic discovery guidelines. Cursor will explore your codebase to understand patterns before making suggestions.

### After `/quick-start`

The rules file is populated with YOUR project's actual:
- Folder structure and organization
- Tech stack and dependencies
- Coding patterns and conventions
- Reference files demonstrating your standards

### What “Discovery-first” means

- **We scan before we suggest**: the agent should look for existing conventions before proposing changes.
- **We document what exists**: rules encode your current architecture, not generic “best practices”.
- **We confirm with you**: `/quick-start` should present findings and allow corrections before updating rules.
- **We avoid bias**: extended templates are scaffolds for project-specific details, not prescriptive guides.

---

## What's Inside

```
.cursor/
├── README.md              ← You are here
├── rules/
│   └── project.mdc        ← Your rules (auto-populated by /quick-start)
├── commands/
│   ├── quick-start.md     ← Discovers and documents your architecture
│   ├── analyze-codebase.md
│   ├── create-rules.md
│   └── create-feature-spec.md
└── templates/
    └── extended/          ← Comprehensive templates for large teams
```

---

## Commands Reference

| Command | What It Does |
|---------|--------------|
| `/quick-start` | Discovers your architecture, updates rules automatically |
| `/analyze-codebase` | Audits code against your rules (report only) |
| `/create-rules` | Generates comprehensive rules from templates |
| `/create-feature-spec` | Creates a feature specification document |

---

## Philosophy

### Discovery Over Prescription

This toolkit **discovers** your existing architecture rather than **prescribing** patterns. The goal is to:

- Document what IS, not what SHOULD BE
- Preserve your existing conventions
- Help Cursor understand YOUR project, not generic best practices

### When to Add Rules

Per [Cursor's docs](https://docs.cursor.com/context/rules-for-ai):

> *"Start simple. Add rules only when you notice Agent making the same mistake repeatedly."*

Cursor already knows common patterns (SOLID, REST, React, TypeScript). Only add rules for:

- Internal libraries Cursor doesn't know about
- Team conventions that DIFFER from defaults
- Project-specific requirements

---

## Maintaining Architecture Integrity

### Initial Setup
```
/quick-start              # Document existing architecture
```

### Periodic Checks
```
/analyze-codebase         # Audit code against documented rules
```

### When Architecture Evolves
```
/quick-start              # Re-run to update documentation
```

The `/analyze-codebase` command helps catch drift between documented architecture and actual code — useful for code reviews and maintaining consistency.

---

## Adding More Rules

### Rule Formats (Cursor 2.2+)

Cursor supports two formats:

```
.cursor/rules/
├── project.mdc              # Simple format (works, recommended for starters)
└── my-rule/                 # Folder format (new standard)
    └── RULE.md
```

Both work. The folder format is newer and supports additional files (scripts, etc.).

### Creating Additional Rules

For large teams or compliance requirements:

```
/create-rules             # Generate comprehensive rules from templates
```

This creates rule folders with `RULE.md` files:

```
.cursor/rules/
├── project.mdc              # Your main project rule
├── security/
│   └── RULE.md
├── typescript/
│   └── RULE.md
└── testing/
    └── RULE.md
```

Available templates in `templates/extended/rules/`:
- `general-rule.md` — Code organization, naming, error handling
- `typescript-rule.md` — Type safety patterns
- `react-rule.md` — Component patterns
- `security-rule.md` — Security best practices
- `testing-rule.md` — Testing strategy
- And more...

> Note: These templates were intentionally trimmed to avoid generic advice Cursor already knows. They are meant to be populated with project-specific details (often via discovery) and anchored with `@` references to real files.

---

## Need Help?

- [Cursor Rules Documentation](https://docs.cursor.com/context/rules-for-ai)
- Run `/quick-start` to get started
- Run `/analyze-codebase` to audit your code
