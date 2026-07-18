# /extract-spec

Document existing code as a baseline specification (brownfield).

## Skill

Read and follow **`skills/spec-driven-workflow`**, especially `references/brownfield-workflow.md` and `references/artifact-homes.md`.

## Usage

```
/extract-spec src/auth/
/extract-spec "user authentication"
```

## Behavior

1. Search and analyze the target code.
2. Document **current** behavior (not desired future) with clear requirements/gaps.
3. **Resolve the spec path** via the skill. As a Cursor `/` command, default to `.cursor/docs/specs/{area}-current.md` unless the project already uses `docs/specs/` or the user overrides.
4. Suggest drafting a **change** spec next via `/draft-spec`.
