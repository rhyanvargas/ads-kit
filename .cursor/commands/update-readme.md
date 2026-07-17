# /update-readme

Synchronize README.md with the current codebase.

## Skill

Part of **`skills/spec-driven-workflow`** maintenance commands. See `references/commands-reference.md`.

## Usage

```
/update-readme
/update-readme --section tech-stack
```

## Behavior

1. Scan manifests, source layout, tests, CI, and docs for evidence.
2. Update README sections to match reality; prefer links over duplicated content.
3. Verify links and claimed tech stack against actual files.
4. Do not invent features or dependencies that are not present.
