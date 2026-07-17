# /draft-spec

Generate a specification from a feature idea.

## Skill

Read and follow **`skills/spec-driven-workflow`** (especially `references/spec-writing-guide.md`).

## Usage

```
/draft-spec "your feature idea or description"
```

## Behavior

1. Clarify if the idea is vague (2–3 questions max).
2. Scan the codebase for related patterns.
3. Write a testable spec (prefer `REQ-XXX` IDs + acceptance criteria + test strategy).
4. Save under `.cursor/docs/specs/{feature-name}.md` (create folders if needed).
5. Suggest `/plan-impl` for medium+ work, or `/implement-spec` for small changes.

Do not duplicate the full playbook here — the skill is the source of truth.
