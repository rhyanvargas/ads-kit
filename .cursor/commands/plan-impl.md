# /plan-impl

Create an implementation plan from a specification.

## Skill

Read and follow **`skills/spec-driven-workflow`**. For granular task style, recommended upstream `writing-plans` (see `recommended-skills.json`) may also apply.

## Usage

```
/plan-impl .cursor/docs/specs/{feature-name}.md
```

## Behavior

1. Read the spec.
2. Break work into ordered, verifiable tasks (files, tests, risks).
3. Write `.cursor/plans/{feature-name}.plan.md` with trackable todos.
4. Suggest `/implement-spec` when the user approves the plan.

Keep this command thin — planning depth lives in the skill / recommended upstream.
