---
description: "Project overview, workflow, and definition-of-done quality gates"
alwaysApply: true
---

# Project Rules

This repo is **The Agentic Development Starter Kit (ADSK)** for Cursor IDE (optional wiring). It provides commands, rules, and workflows for AI-assisted development using a spec-first approach. Portable skills live in `skills/`.

## Discovery guidelines

- Explore first: scan the codebase to understand existing patterns before suggesting new ones
- Follow established conventions: match style, naming, and structure already in use
- When uncertain: ask rather than assume (architecture ambiguity, missing requirements, conflicting requirements)

## Architecture (where things live)

- **Commands**: `.cursor/commands/` — slash-command workflows
- **Rules**: `.cursor/rules/<name>/RULE.md` — persistent constraints + quality gates
- **Templates**: `.cursor/templates/` — copy-paste starters for new rules
- **Skills (source of truth)**: `skills/<name>/` — portable AgentSkills content
- **Skills (project view)**: `.cursor/skills/<name>` → `../../skills/<name>` — relative symlinks for Cursor discovery
- **Specs**: `.cursor/docs/specs/` — generated feature specs
- **Plans**: `.cursor/plans/` — implementation plans from `/plan-impl`

## Workflow

Use the spec-driven workflow:

1. `/draft-spec` — generate a spec from an idea
2. `/plan-impl` — create an implementation plan
3. `/implement-spec` — implement from spec/plan
4. `/review` — post-implementation quality check

For brownfield work, start with `/quick-start` and `/extract-spec`.

## Definition of done (quality gates)

For any change that affects behavior:

- **Spec is testable**: requirements are specific and testable (prefer `REQ-XXX` IDs).
- **Tests included**: each implemented requirement has tests (or a short, explicit “no tests needed because…” justification when truly non-behavioral).
- **Verification executed**: run the repo’s verification commands (see `@.cursor/rules/project-cmds`).

Testing policy lives in `@.cursor/rules/testing`.

## Reference

See `skills/spec-driven-workflow/references/commands-reference.md` for the full command documentation.
