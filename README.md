# Cursor Rules Starter Kit

A drop-in `.cursor/` folder that helps Cursor understand your existing codebase — no manual configuration required.

## What Is This?

This repo contains a ready-to-use `.cursor/` folder you can clone into any project (brownfield or greenfield). It includes:

- **Discovery-based rules** — Automatically learns your project's patterns
- **Slash commands** — `/quick-start`, `/analyze-codebase`, `/create-rules`
- **Extended templates** — Comprehensive rules for large teams (optional)

## Installation

### Option 1: Clone the `.cursor/` folder (Recommended)

```bash
# From your project root
git clone --depth 1 https://github.com/YOUR_USERNAME/cursor-rules-starter.git temp-cursor
cp -r temp-cursor/.cursor .
rm -rf temp-cursor
```

### Option 2: Add as a git subtree

```bash
git subtree add --prefix=.cursor https://github.com/YOUR_USERNAME/cursor-rules-starter.git main --squash
```

### Option 3: Manual download

1. Download this repo as a ZIP
2. Extract the `.cursor/` folder
3. Copy it into your project root

## Getting Started

After installation, run this in Cursor's chat:

```
/quick-start
```

The command will:
1. **Scan your codebase** to discover existing architecture
2. **Show you what it found** for confirmation
3. **Update the rules file** automatically

No manual editing. No placeholder replacement. Just run the command.

## What's Inside

```
.cursor/
├── README.md              ← Getting started guide
├── rules/
│   └── project.mdc        ← Your rules (auto-populated by /quick-start)
├── commands/
│   ├── quick-start.md     ← Discovers and documents your architecture
│   ├── analyze-codebase.md
│   ├── create-rules.md
│   └── create-feature-spec.md
└── templates/
    └── extended/          ← Comprehensive templates for large teams
        └── rules/
```

## Philosophy

### Discovery Over Prescription

This toolkit **discovers** your existing architecture rather than prescribing patterns:

| Traditional Approach | This Toolkit |
|---------------------|--------------|
| "Fill in this template" | "Let me scan your codebase" |
| "What pattern do you want?" | "Here's what I found — is this right?" |
| Prescribes best practices | Documents YOUR practices |
| Introduces external bias | Preserves existing conventions |

### Why This Matters

- **Brownfield projects**: Respects and documents existing architecture
- **Greenfield projects**: Learns patterns as you establish them
- **Architecture integrity**: Helps maintain consistency without imposing opinions

### When to Add Rules

Per [Cursor's documentation](https://docs.cursor.com/context/rules-for-ai):

> *"Start simple. Add rules only when you notice Agent making the same mistake repeatedly."*

Cursor already knows common patterns. Only add rules for things that are **unique to YOUR project**.

## Commands

| Command | Purpose |
|---------|---------|
| `/quick-start` | Discovers your architecture, updates rules automatically |
| `/analyze-codebase` | Audits code against documented rules (catches drift) |
| `/create-rules` | Generates comprehensive rules from templates |
| `/create-feature-spec` | Creates feature specification document |

## Maintaining Architecture Integrity

```bash
# Initial setup — document existing architecture
/quick-start

# Periodic checks — catch drift between docs and code
/analyze-codebase

# When architecture evolves — update documentation
/quick-start
```

## Extended Templates

For large teams needing comprehensive documentation, see `templates/extended/rules/`:

| Template | Coverage |
|----------|----------|
| `general-rule.md` | Code organization, naming, error handling |
| `typescript-rule.md` | Type safety patterns |
| `react-rule.md` | Component patterns |
| `python-rule.md` | Python idioms |
| `api-rule.md` | REST/GraphQL patterns |
| `security-rule.md` | Security best practices |
| `testing-rule.md` | Testing strategy |
| `documentation-rule.md` | Documentation standards |
| `git-rule.md` | Git workflow |
| `infrastructure-rule.md` | CI/CD patterns |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

[MIT](LICENSE)
