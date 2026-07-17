# /plan-impl

Create an implementation plan from a specification.

## Skill

Read and follow **`skills/spec-driven-workflow`**. For granular task style, recommended upstream `writing-plans` (see `recommended-skills.json`) may also apply.

## Usage

```
/plan-impl .cursor/docs/specs/{feature-name}.md
```

## Behavior

1. Read the spec; if open questions or unconfirmed assumptions remain, resolve those before planning.
2. Break work into ordered, verifiable tasks (files, tests, risks). Prefer tasks that map to `REQ-XXX` and stay within a focused file set.
3. Write `.cursor/plans/{feature-name}.plan.md` with trackable todos.
4. Suggest `/implement-spec` only after the user approves the plan (medium+).

Keep this command thin — planning depth lives in the skill / recommended upstream.
