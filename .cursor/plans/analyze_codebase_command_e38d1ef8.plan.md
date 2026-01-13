---
name: Analyze codebase command
overview: Add a reusable Cursor command at `.cursor/commands/analyze-codebase.md` that reviews the full repo against `.cursor/rules/*` and produces a report of rule violations and rule-doc conflicts (report-only, excluding node_modules).
todos:
  - id: read-rules
    content: Encode rule applicability logic (alwaysApply/globs) into the command workflow.
    status: completed
  - id: write-command-md
    content: Write the Markdown command content for `.cursor/commands/analyze-codebase.md` (report-only, exclude node_modules).
    status: completed
    dependencies:
      - read-rules
  - id: validate-workflow
    content: Double-check the command prompts for clarity, exclusions, and output template.
    status: completed
    dependencies:
      - write-command-md
---

# Add `/analyze-codebase` command

## Goal

Create a project command in `.cursor/commands/analyze-codebase.md` that, when run, systematically checks the entire repo against the rule set in `.cursor/rules/` and outputs a **report-only** compliance review, excluding `node_modules/`.

## What the command will do

- **Load rules** from:
- `.cursor/rules/core-conventions/RULE.md` (alwaysApply: true)
- `.cursor/rules/security/RULE.md` (alwaysApply: true)
- `.cursor/rules/express-backend/RULE.md` (globs: `ai_request_form_backend/**/*.ts`)
- `.cursor/rules/react-frontend/RULE.md` (globs: `ai_request_form_frontend/**/*.tsx, ai_request_form_frontend/**/*.jsx`)
- `.cursor/rules/testing/RULE.md` (alwaysApply: false)
- **Determine applicability**:
- Apply `alwaysApply: true` rules to the whole repo.
- Apply glob-scoped rules to matching files.
- Treat `alwaysApply: false` rules as “guidance”: still check for obvious violations (e.g., missing tests/coverage config) but don’t fail the whole repo solely on it.
- **Exclude**: `node_modules/` (and any directories already covered by `.gitignore` patterns when searching).
- **Check two kinds of issues**:
- **Code vs rules**: find violations, list file(s), evidence, and a recommended change.
- **Rules vs rules / rules internal conflicts**: highlight contradictions in rule docs (example already present: `react-frontend/RULE.md` states “Named exports for components” but its snippet uses `export default MyComponent`).
- **Output** a single, structured Markdown report:
- Summary (counts by severity)
- Rule coverage map (which rules applied to which areas)
- Violations table: `Rule` | `Location` | `Evidence` | `Impact` | `Suggested fix`
- Conflicts/ambiguities in rule docs
- Top 5 prioritized fixes

## How it will analyze the repo (tooling behavior)

Inside the command text, instruct the agent to:

- Use fast searches (`grep`) for patterns tied to rules (e.g., SQL queries without parameters, `jsonwebtoken` usage patterns, localStorage token usage, missing `client.release()` in db usage, etc.).
- Use semantic search (`codebase_search`) to find rule-relevant flows (auth middleware, CORS config, validation middleware, logging usage).
- Inspect a small number of key files directly (`read_file`) for each area to confirm findings.
- Avoid scanning or reading large lockfiles unless directly relevant.

## Files to change

- Create content in [`.cursor/commands/analyze-codebase.md`](.cursor/commands/analyze-codebase.md) (currently empty).

## Acceptance criteria

- Typing `/analyze-codebase` in Cursor triggers a workflow that produces a consistent, readable compliance report.
- Report clearly distinguishes **code violations** vs **rule-doc conflicts**.
- Default excludes `node_modules/` and does not attempt any edits (report-only).

## Implementation todos

- `read-rules`: Summarize each rule file’s applicability (globs + alwaysApply) and embed that logic into the command instructions.
- `write-command-md`: Write the full Markdown content for `.cursor/commands/analyze-codebase.md` with step-by-step workflow + report template.
- `validate-workflow`: Ensure the command text instructs the agent to avoid `node_modules/`, avoid massive file reads, and to cite evidence per violation.