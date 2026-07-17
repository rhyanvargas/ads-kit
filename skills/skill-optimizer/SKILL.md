---
name: skill-optimizer
description: >-
  Author and optimize Agent Skills for clarity, trigger accuracy, and token
  cost. Use when creating a new skill, editing SKILL.md, reviewing skill
  quality, optimizing descriptions, adding progressive disclosure, or when
  /optimize-skill is invoked. Do not use for general app feature specs or
  DevOps strategy sessions.
---

# Skill Optimizer

Make every skill **discoverable**, **lean when activated**, and **eval-backed**.
Aligned with [agentskills.io best practices](https://agentskills.io/skill-creation/best-practices)
and [optimizing descriptions](https://agentskills.io/skill-creation/optimizing-descriptions).

## When this skill applies

- Creating or substantially editing any skill (kit `skills/` or adopter `.agents/skills/`)
- User asks to optimize, slim, or improve trigger quality of a skill
- `/optimize-skill` is invoked

## Non-negotiable gates (do before calling done)

1. **Validate** — `npx --yes skills-ref validate <skill-dir>`
2. **Name** — folder name = YAML `name`; lowercase/hyphens; no consecutive hyphens
3. **Description** — what + when; ≤1024 chars; concrete triggers; at least one near-miss “do not use…” boundary when adjacent skills exist
4. **Body size** — `SKILL.md` under 500 lines / ~5k tokens; prefer under ~1500 tokens for workflow skills
5. **Progressive disclosure** — depth in `references/` / `scripts/`; each file has an explicit *when to read*
6. **Token test** — every paragraph: “Would the agent get this wrong without it?” If no, cut or move to a reference
7. **Trigger set** — ~20 labeled queries in `evals/trigger/eval_queries.json` (~50/50 should/shouldn’t; include near-misses)
8. **Output evals** — at least 2–3 cases (+1 edge) in `evals/evals.json` when the skill changes behavior

## Procedure

### 1. Scope the unit

One coherent job per skill. Too narrow → many skills load for one task. Too broad → weak triggers and unused instructions.

### 2. Write description for triggers (catalog tier)

Prefer: capability verbs + **Use when…** + **Do not use for…** (near-misses).

- Imperative / agent-directed (“Use when…”) over “This skill helps with…”
- User intent keywords, not internal file layout
- Keep short (few sentences); every installed skill pays this cost at session start

Read `references/description-checklist.md` while drafting or revising descriptions.

### 3. Write lean instructions (activation tier)

- Add what the agent lacks: project conventions, fragile sequences, defaults, gotchas, output templates
- Omit what the model already knows (generic HTTP/PDF/DB primers)
- Prefer procedures, checklists, and templates over essays
- Defaults with escape hatches — not equal menus of options
- Match specificity to fragility (prescriptive for migrations/scripts; freer for reviews)

### 4. Progressive disclosure (resource tier)

```
SKILL.md (always on activate) → references/* or scripts/* (only when instructed)
```

In `SKILL.md`, name each reference and the **condition** to load it. Soft triggers (“see overview for why”) invite early loads — tighten them.

Read `references/token-budget.md` for cut/move heuristics.

### 5. Eval loop

| Loop | Artifact | Goal |
|------|----------|------|
| Trigger | `evals/trigger/eval_queries.json` | Right skill activates; near-misses do not |
| Output | `evals/evals.json` | With-skill beats without/prior; watch token Δ |

Iterate: fail train queries → generalize description/instructions → recheck held-out queries. Do not overfit keywords from individual failures. Details: `references/eval-loop.md` and repo `docs/evaluating-skills.md`.

### 6. Layout (kit vs adopter)

| Context | Skill path | Discovery |
|---------|------------|-----------|
| **ADSK kit repo** | `skills/<name>/` | Symlink `.agents/skills/<name>` and `.cursor/skills/<name>` → `../../skills/<name>` |
| **Adopter app** | `.agents/skills/<name>/` only | No root `skills/` folder |

Optional thin Cursor command may invoke this skill; do not duplicate the playbook into the command body.

## Done checklist

Copy and tick:

```
- [ ] skills-ref validate passes
- [ ] description ≤1024; what + when + near-miss boundary if needed
- [ ] SKILL.md lean; no kit-meta / rationale that belongs in references
- [ ] Every reference has a when-to-load condition
- [ ] ~20 trigger queries with near-miss negatives
- [ ] Output evals present for behavior changes
- [ ] Kit-only: discovery symlinks added
```

## Official references

- [Specification](https://agentskills.io/specification) (progressive disclosure, frontmatter)
- [Best practices](https://agentskills.io/skill-creation/best-practices)
- [Optimizing descriptions](https://agentskills.io/skill-creation/optimizing-descriptions)
- [Evaluating skills](https://agentskills.io/skill-creation/evaluating-skills)
