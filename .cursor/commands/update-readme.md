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
2. List missing / stale / wrong-audience / dense-Quick-Start findings before editing.
3. Patch README sections to match reality; prefer links over duplicated content.
4. For npm CLIs: Interactive happy path first, Non-interactive flags second (readme-authoring `quick-start-patterns`).
5. Verify install/run commands and claimed stack against actual files.
6. Do not invent features, APIs, or dependencies.
