# /quick-start

Initialize the ADSK spec-driven workflow for a project.

## Skill

Read and follow **`skills/spec-driven-workflow`**, especially `references/getting-started.md`.

## Usage

```
/quick-start
```

## Behavior

1. Detect stack (package managers, frameworks, test/lint tools).
2. Detect artifact homes (Cursor `.cursor/...` vs portable `docs/...`) via `references/artifact-homes.md`; when Cursor wiring is present, update or propose `.cursor/rules/project/` and `project-cmds` with real verify commands.
3. Guide next steps: greenfield → `/draft-spec`; brownfield → `/extract-spec`.
4. Confirm ADSK skills are discoverable under `.agents/skills/`. If missing, point to `docs/using-adsk.md` (`npx skills add rhyanvargas/agentic-development-starter-kit`).
