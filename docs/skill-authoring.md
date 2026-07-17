# Skill authoring (ADSK)

Conventions for first-party skills in this repo. Aligned with [agentskills.io](https://agentskills.io).

## Spec compliance

- Folder name matches YAML `name`
- `description` states **what** and **when** (trigger keywords); ≤ 1024 characters
- Keep `SKILL.md` lean (&lt; ~500 lines / ~5k tokens)
- Put depth in `references/` (or `scripts/`) and tell the agent **when** to load each file

See:

- [Quickstart](https://agentskills.io/skill-creation/quickstart)
- [Best practices](https://agentskills.io/skill-creation/best-practices)
- [Specification](https://agentskills.io/specification)

## Progressive disclosure

1. **Catalog** — `name` + `description` at session start  
2. **Instructions** — full `SKILL.md` when activated  
3. **Resources** — references/scripts only when needed  

## Validation

```bash
npx --yes skills-ref validate ./skills/<skill-name>
```

(See current install notes on [agentskills.io specification — validation](https://agentskills.io/specification#validation).)

## Descriptions (trigger quality)

- Prefer third-person, concrete triggers (“Use when…”)
- Include near-miss negatives in trigger evals (should not fire)
- Optimize with ~20 labeled queries; see [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions)

## ADSK layout

```
skills/<name>/
├── SKILL.md
├── references/          # optional deep docs
├── scripts/             # optional deterministic helpers
└── evals/
    ├── evals.json       # output-quality cases
    └── trigger/         # optional trigger query sets
```

## Anti-patterns

- Duplicating the skill body into Cursor commands
- Vague instructions (“handle errors appropriately”) without project-specific procedure
- Loading every reference up front
- Vendoring unpinned upstream skills into git without review
