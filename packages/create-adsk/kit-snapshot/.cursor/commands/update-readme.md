# /update-readme

Synchronize README.md with the current codebase.

## Skill

Follow **`readme-authoring`** in **update/sync** mode  
(`.agents/skills/readme-authoring` — kit source: `skills/readme-authoring`).

## Usage

```
/update-readme
/update-readme --section tech-stack
```

## Behavior

1. Scope the README path (root or package) and gather evidence (manifests, scripts, entry points, existing docs).
2. List missing / stale / wrong-audience findings before editing.
3. Patch README sections to match reality; prefer links over duplicated content.
4. Verify install/run commands and claimed stack against actual files.
5. Do not invent features, APIs, or dependencies.
