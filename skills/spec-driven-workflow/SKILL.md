---
name: spec-driven-workflow
description: >-
  Spec-driven development workflow for AI-assisted coding. Use when drafting
  specs, planning implementation, implementing from specs, reviewing code,
  extracting specs from existing code, or when the user asks about spec-driven
  development, greenfield/brownfield workflows, or problem sizing.
---

# Spec-Driven Workflow

Spec-Driven Development (SDD) shifts coding from ad-hoc prompts to structured specifications. The spec is the shared source of truth for what to build and how to know it is done.

## Quick size guide

| Size | Workflow |
|------|----------|
| Trivial | Skip formal workflow; handle in chat |
| Small | Draft spec → implement |
| Medium | Draft spec → plan → implement → review |
| Large | Research first, then full workflow |

Read `references/problem-size-guide.md` when size is unclear.

## Core procedure

1. **Specify** — Capture requirements with testable acceptance criteria (`REQ-XXX` IDs preferred). Read `references/spec-writing-guide.md` for structure.
2. **Plan** (medium+) — Break work into concrete, verifiable tasks. Prefer a written plan before multi-file changes.
3. **Implement** — Follow the spec/plan; map each requirement to tests unless non-behavioral with explicit justification.
4. **Review** — Check correctness, security-sensitive paths, test coverage, and spec compliance.
5. **Brownfield** — Document existing behavior with extract-spec before large changes. Read `references/brownfield-workflow.md`.

## Paths (defaults)

These defaults match the ADSK Cursor layout; other harnesses may use equivalent project paths:

| Artifact | Default path |
|----------|----------------|
| Specs | `.cursor/docs/specs/` or project `docs/specs/` |
| Plans | `.cursor/plans/` or project `docs/plans/` |

## Cursor slash commands (optional)

When Cursor commands from this kit are installed, they invoke this skill:

| Command | Role |
|---------|------|
| `/draft-spec` | Generate a spec |
| `/plan-impl` | Create an implementation plan |
| `/implement-spec` | Implement from spec/plan |
| `/review` | Post-implementation review |
| `/extract-spec` | Document existing code |
| `/quick-start` | Initialize workflow for a project |
| `/update-readme` | Sync README with codebase |

Full command details: `references/commands-reference.md`.

## Progressive disclosure

Load references only when needed:

| Reference | When to read |
|-----------|----------------|
| `references/getting-started.md` | First-time setup / install |
| `references/spec-driven-overview.md` | Why SDD / rationale |
| `references/problem-size-guide.md` | Choosing workflow depth |
| `references/greenfield-workflow.md` | New features |
| `references/brownfield-workflow.md` | Existing codebases |
| `references/spec-writing-guide.md` | Writing or reviewing a spec |
| `references/commands-reference.md` | Slash command details |
| `references/extending.md` | Adding rules/commands/skills |
| `references/best-practices.md` | Tips and external links |

## Quality gates

- Requirements are specific and testable.
- Implemented requirements have automated tests (or a short justification when truly non-behavioral).
- Run the project's verify commands (tests/lint/typecheck) before claiming done.
