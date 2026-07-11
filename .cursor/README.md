# .cursor

Cursor IDE configuration for spec-driven development.

## Contents

```
.cursor/
├── commands/   # Slash commands (/draft-spec, /review, …)
├── docs/       # Generated specs (.cursor/docs/specs/)
├── plans/      # Implementation plans (output of /plan-impl)
├── rules/      # Persistent rules (always / file-scoped)
├── skills/     # Agent skills (workflows + progressive references)
└── templates/  # Rule templates (copy into rules/ and customize)
```

## Quick Start

Run `/quick-start` in chat, then:

- [Getting started](skills/spec-driven-workflow/references/getting-started.md)
- [Commands reference](skills/spec-driven-workflow/references/commands-reference.md)
- [Spec-driven overview](skills/spec-driven-workflow/references/spec-driven-overview.md)

## Skills

| Skill | Use when |
|-------|----------|
| `spec-driven-workflow` | Specs, plans, implement, review, extract, greenfield/brownfield |
| `devops-strategy-facilitator` | Designing CI/CD / branching / promotion strategy (`/design-devops-strategy`) |
