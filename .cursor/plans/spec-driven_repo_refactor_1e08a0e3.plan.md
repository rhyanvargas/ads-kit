---
name: Spec-Driven Repo Refactor
overview: Refactor the repo from discovery-first to spec-driven, implementing the starter template recommendation with modular docs, minimal README, clear Greenfield/Brownfield workflows (with Mermaid diagrams), and gap-closing guides for problem size and spec writing.
todos: []
isProject: false
---

# Spec-Driven Repo Refactor Plan

## Current State vs Target

| Aspect | Current | Target |

|--------|---------|--------|

| Approach | Discovery-first | Spec-driven (spec → plan → implement) |

| Commands | quick-start, analyze-codebase, create-rules, create-feature-spec | Add: draft-spec, plan-impl, implement-spec, review, extract-spec |

| README | ~100 lines, philosophy-heavy | ~60 lines, scannable |

| Docs | 1 file (starter-template-recommendation.md) | Modular docs with single source of truth |

| Workflows | Implicit | Explicit Greenfield + Brownfield with Mermaid |

---

## 1. New Commands (`.cursor/commands/`)

Add five spec-driven commands. Keep existing commands where they serve distinct purposes.

| Command | Purpose | Replaces/Complements |

|---------|---------|----------------------|

| `draft-spec.md` | Generate spec from brief idea; ask for details if needed; output to `docs/specs/` | Simpler variant of create-feature-spec |

| `plan-impl.md` | Read spec, produce implementation plan in `.cursor/plans/`; use Plan Mode (Shift+Tab) | New |

| `implement-spec.md` | Generate code from spec/plan; follow rules; run tests | New |

| `review.md` | Post-implementation quality check; flag issues; suggest fixes | Complements analyze-codebase (which stays report-only for drift) |

| `extract-spec.md` | Reverse-engineer spec from existing code; brownfield documentation | New |

**Retain:** `quick-start`, `analyze-codebase`, `create-rules`, `init-project-config`.

**Adapt:** `create-feature-spec` → keep for formal/spike-heavy specs; document in [docs/commands-reference.md](docs/commands-reference.md) as "extended" option.

---

## 2. Rule Templates

Add three focused rule templates under `.cursor/templates/` (referenced by quick-start and create-rules):

- `coding-style.rule.md` — Naming, formatting, lint rules
- `architecture.rule.md` — Layered design, error handling, module boundaries  
- `project-cmds.rule.md` — Build, test, run commands the agent should use

These are **templates**; quick-start populates `project.mdc` with discovered content. Teams can split into separate rule files via create-rules if needed.

---

## 3. README Refactor

Target: ~60 lines, scannable. Structure:

```markdown
# Cursor Spec-Driven Starter

## Purpose
One sentence. Spec-first AI coding: write specs, let the agent implement.

## Quick Start
1. Copy `.cursor/` into project root
2. Run `/quick-start` (brownfield) or `/init-project-config` (greenfield)
3. Run `/draft-spec "your feature"` → `/plan-impl` → `/implement-spec`

## Workflows
- **Greenfield**: Idea → Spec → Plan → Implement → Review
- **Brownfield**: Extract specs from code → Establish rules → Spec new changes → Implement

[Link to docs/greenfield-workflow.md] [Link to docs/brownfield-workflow.md]

## Commands
| Command | When |
|---------|------|
| /draft-spec | New feature idea |
| /plan-impl | Before coding |
| /implement-spec | After plan approved |
| /review | After implementation |
| /extract-spec | Brownfield: document existing code |
| /quick-start | First-time setup |

## Docs
- [Getting Started](docs/getting-started.md)
- [Commands Reference](docs/commands-reference.md)
- [Extending](docs/extending.md)
- [Best Practices](docs/best-practices.md)

## Extending
Add rules when the agent repeats mistakes. Add commands for recurring workflows.

## References
- [Cursor Agent Best Practices](https://cursor.com/blog/agent-best-practices)
- [Spec-Driven Development](docs/spec-driven-overview.md)
```

---

## 4. Modular Docs Structure

| File | Purpose |

|------|---------|

| [docs/getting-started.md](docs/getting-started.md) | Install, verify, first run (moved from README) |

| [docs/greenfield-workflow.md](docs/greenfield-workflow.md) | Step-by-step Greenfield flow + **Mermaid diagram** |

| [docs/brownfield-workflow.md](docs/brownfield-workflow.md) | Step-by-step Brownfield flow + **Mermaid diagram** |

| [docs/problem-size-guide.md](docs/problem-size-guide.md) | **Gap:** When to use full workflow vs skip spec/plan (trivial fixes) |

| [docs/spec-writing-guide.md](docs/spec-writing-guide.md) | **Gap:** Functional vs technical spec; when to add detail |

| [docs/commands-reference.md](docs/commands-reference.md) | All commands, params, when to use |

| [docs/extending.md](docs/extending.md) | Add rules, commands, skills |

| [docs/best-practices.md](docs/best-practices.md) | Cursor refs, Fowler/Merced article refs |

| [docs/spec-driven-overview.md](docs/spec-driven-overview.md) | Condensed from starter-template-recommendation (philosophy, components) |

**Deprecate/archive:** `docs/starter-template-recommendation.md` — content split into spec-driven-overview, workflows, and guides. Keep as `docs/archive/starter-template-recommendation.md` for reference.

---

## 5. Mermaid Workflow Diagrams

### Greenfield (in docs/greenfield-workflow.md)

```mermaid
flowchart LR
    subgraph greenfield [Greenfield Workflow]
        A[Idea] --> B[/draft-spec]
        B --> C[Spec doc]
        C --> D[/plan-impl]
        D --> E[Plan]
        E --> F[/implement-spec]
        F --> G[Code]
        G --> H[/review]
        H --> I{Done?}
        I -->|Yes| J[Archive spec]
        I -->|No| C
    end
```

### Brownfield (in docs/brownfield-workflow.md)

```mermaid
flowchart LR
    subgraph brownfield [Brownfield Workflow]
        A[Legacy code] --> B[/quick-start]
        B --> C[Rules updated]
        A --> D[/extract-spec]
        D --> E[Spec docs]
        E --> F[New change]
        F --> G[/draft-spec]
        G --> H[Spec]
        H --> I[/plan-impl]
        I --> J[Plan]
        J --> K[/implement-spec]
        K --> L[Code]
        L --> M[/review]
        M --> N[Strangler pattern]
    end
```

---

## 6. Gap-Closing Content

### Problem Size Guide (docs/problem-size-guide.md)

| Problem Size | Workflow | Commands |

|-------------|----------|----------|

| **Trivial** (1-line fix, typo) | Skip spec/plan | Describe in chat, implement directly |

| **Small** (single file, clear scope) | Optional plan | /draft-spec → /implement-spec |

| **Medium** (multi-file, 3–5 day story) | Full workflow | /draft-spec → /plan-impl → /implement-spec → /review |

| **Large** (epic, unclear) | Spec + research | /create-feature-spec (spike) → /draft-spec → plan → implement |

### Spec Writing Guide (docs/spec-writing-guide.md)

- **Functional spec**: What the system does (behavior, acceptance criteria). Keep in spec.
- **Technical spec**: How it’s built (stack, patterns). Put in rules (`architecture.rule.md`, `coding-style.rule.md`).
- **When to add technical detail to spec**: Integration points, non-obvious constraints, or when rules don’t cover it.

---

## 7. .cursor/README.md

Slim to ~30 lines: purpose, quick start, link to main docs. Single source of truth in `/docs`.

---

## 8. File Change Summary

| Action | Path |

|--------|------|

| Create | `.cursor/commands/draft-spec.md` |

| Create | `.cursor/commands/plan-impl.md` |

| Create | `.cursor/commands/implement-spec.md` |

| Create | `.cursor/commands/review.md` |

| Create | `.cursor/commands/extract-spec.md` |

| Create | `.cursor/templates/coding-style.rule.md` |

| Create | `.cursor/templates/architecture.rule.md` |

| Create | `.cursor/templates/project-cmds.rule.md` |

| Create | `docs/getting-started.md` |

| Create | `docs/greenfield-workflow.md` |

| Create | `docs/brownfield-workflow.md` |

| Create | `docs/problem-size-guide.md` |

| Create | `docs/spec-writing-guide.md` |

| Create | `docs/commands-reference.md` |

| Create | `docs/extending.md` |

| Create | `docs/best-practices.md` |

| Create | `docs/spec-driven-overview.md` |

| Create | `docs/archive/` (move starter-template-recommendation.md) |

| Rewrite | `README.md` |

| Rewrite | `.cursor/README.md` |

| Update | `.cursor/commands/quick-start.md` (align with spec-driven init) |

---

## 9. Implementation Order

1. Create new commands (draft-spec, plan-impl, implement-spec, review, extract-spec)
2. Create rule templates (coding-style, architecture, project-cmds)
3. Create docs (getting-started, greenfield, brownfield, problem-size, spec-writing, commands-reference, extending, best-practices, spec-driven-overview)
4. Archive starter-template-recommendation, add spec-driven-overview
5. Rewrite README and .cursor/README
6. Update quick-start to reference spec-driven workflow