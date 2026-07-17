# Lifecycle coverage (ADSK)

How The Agentic Development Starter Kit maps to enterprise product delivery stages.

## Map

| Stage | Coverage | Mechanism |
|-------|----------|-----------|
| Ideate / discover | Partial | Optional: Superpowers `brainstorming`; product-discovery skills only after trust review |
| Plan / organize | **Core** | First-party `spec-driven-workflow` + recommended `writing-plans` |
| Design (system) | **Core** | Captured in specs (`spec-writing-guide`) |
| Design (UI) | Optional | `frontend-design` (Anthropic) via recommended optional list |
| Develop | **Core** | SDD implement + recommended TDD |
| Test | **Core** | Recommended TDD + Cursor `testing` / `project-cmds` rules in consumer projects |
| Deploy | **Core (strategy)** | First-party `devops-strategy-facilitator` (strategy, not full pipelines) |
| Secure | **Gap (v1)** | Documented gap — use org-approved security review process; discover via `find-skills` under allowlist |
| Maintain / monitor | **Gap (v1)** | Observability minimums only inside DevOps strategy template |
| Debug | **Recommended** | Superpowers `systematic-debugging` |
| Author agent skills | **Core** | First-party `skill-optimizer` (+ Cursor `skill-authoring` rule / `/optimize-skill`) |

## First-party vs recommended

```text
ADSK first-party (in this repo)
├── spec-driven-workflow     → specify, plan, implement, review, brownfield
├── devops-strategy-facilitator → delivery strategy decisions
└── skill-optimizer          → create/optimize skills (triggers, tokens, evals)


Recommended upstream (pinned in recommended-skills.json)
├── obra/superpowers         → plans, TDD, debug, review habits
├── vercel-labs find-skills  → safe discovery under trust policy
└── anthropics skill-creator → maintainers / eval automation

Do not add overlapping SDD packs — see recommended-skills.json do_not_add.overlapping-sdd
```

## Trust criteria

Do **not** install arbitrary skills.sh long-tail packages into production teams.

Prefer:

1. Official or well-known orgs (`anthropics`, `vercel-labs`, `obra`, …)
2. Compatible open-source license
3. Strong adoption signal
4. Human review of `SKILL.md` and `scripts/`
5. Pinned versions with intentional upgrades

Machine-readable list: [`recommended-skills.json`](../recommended-skills.json).  
Decision scorecard: [`docs/evals/SCORECARD.md`](evals/SCORECARD.md).

## Extending coverage

When filling Secure / Monitor gaps:

1. Prefer a **thin first-party skill** if the procedure is company-critical and must be portable.
2. Or add a **pinned recommended** entry after trust review.
3. Add eval cases so teams can compare before/after.

See [docs/skill-authoring.md](skill-authoring.md) and [CONTRIBUTING.md](../CONTRIBUTING.md).
