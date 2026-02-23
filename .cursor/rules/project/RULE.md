---
description: "Project overview + workflow + definition of done for this repo"
alwaysApply: true
---

# Project Rules

This rule provides persistent context for the Cursor AI agent. It is always loaded at the start of each session.

## Project Overview

This is a **Spec-Driven Starter Template** for Cursor IDE. It provides commands, rules, and workflows for AI-assisted development using a spec-first approach.

## Discovery Guidelines

When working in this codebase:

1. **Explore first** - Scan the codebase to understand existing patterns before suggesting new ones
2. **Follow established conventions** - Match the style, naming, and structure already in use
3. **Ask when uncertain** - If architecture decisions aren't clear, missing requirements, or contain conflicting requirements, ask rather than assume.

## Architecture

- **Commands** (`.cursor/commands/`): Slash commands for spec-driven workflows
- **Templates** (`.cursor/templates/`): Rule templates for project customization
- **Docs** (`.cursor/skills/spec-driven-workflow/references/`): Modular documentation; single source of truth
- **Specs** (`.cursor/docs/specs/`): Generated specification files
- **Rules** (`.cursor/rules/`): Persistent technical constraints and quality gates (including testing policy)

## Workflow

Use the spec-driven workflow:
1. `/draft-spec` - Generate spec from idea
2. `/plan-impl` - Create implementation plan
3. `/implement-spec` - Generate code from spec
4. `/review` - Post-implementation quality check

For brownfield projects, start with `/quick-start` and `/extract-spec`.

## Coding Standards

- Keep files focused and small
- Use clear, descriptive names
- Follow existing patterns in the codebase
- Document non-obvious decisions

## Definition of Done (quality gates)

For any change that affects behavior:

- **Spec is testable**: requirements are specific and testable (prefer `REQ-XXX` IDs).
- **Tests included**: each implemented requirement has tests (or a short, explicit “no tests needed because…” justification when truly non-behavioral).
- **Verification executed**: run the repo’s verification commands (see `.cursor/rules/project-cmds/`).

Testing policy lives in `.cursor/rules/testing/`.

## Commands Reference

See `skills/spec-driven-workflow/references/commands-reference.md` for full command documentation.
