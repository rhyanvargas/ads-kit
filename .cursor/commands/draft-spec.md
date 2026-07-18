# /draft-spec

Generate a specification from a feature idea.

## Skill

Read and follow **`skills/spec-driven-workflow`** (especially `references/spec-writing-guide.md` and `references/artifact-homes.md`). For Cursor output homes, also follow `references/cursor-adapter.md`.

## Usage

```
/draft-spec "your feature idea or description"
```

## Behavior

1. If the idea is vague: surface assumptions and reframe into success criteria (2–3 questions max). Do not silently invent requirements.
2. Scan the codebase for related patterns.
3. Write a testable spec (prefer `REQ-XXX` IDs + acceptance criteria + test strategy). Include Assumptions / Open Questions when anything is unresolved.
4. **Resolve the spec path** via the skill (`artifact-homes.md`). As a Cursor `/` command, default to `.cursor/docs/specs/{feature-name}.md` unless the project already uses `docs/specs/` or the user passed `--out`.
5. Pause for user review on medium+ work; then suggest `/plan-impl`, or `/implement-spec` for small changes.

Do not duplicate the full playbook here — the skill is the source of truth.
