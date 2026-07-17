# Getting Started

Set up ADSK’s spec-driven workflow in your project.

## Prerequisites

- An Agent Skills–compatible agent (Cursor, Claude Code, etc.)
- A project to work with (new or existing)

## Installation

### Option A: Use this repo directly

```bash
git clone https://github.com/rhyanvargas/agentic-development-starter-kit.git
cd agentic-development-starter-kit
```

Open in your agent tool and start with `/quick-start` (Cursor) or activate `spec-driven-workflow`.

### Option B: Copy into another project

```bash
cp -R skills /path/to/your-project/
cp -R .cursor /path/to/your-project/   # optional Cursor wiring
# Ensure .cursor/skills/<name> → ../../skills/<name>
```

### Option C: Global hub install

```bash
npx skills add rhyanvargas/agentic-development-starter-kit -g
```

Hub layout (skills.sh / agentskills.io model):

```bash
# After install, skills live under ~/.agents/skills/
# Cursor global discovery often symlinks ~/.cursor/skills → hub
```

See also root `docs/upgrading.md` for update modes.

## First run

### Brownfield (existing projects)

1. Activate or open the project with ADSK skills available
2. Run `/quick-start` (Cursor) or follow `references/brownfield-workflow.md`
3. Extract a baseline: `/extract-spec path/` (or write a current-behavior spec)
4. Draft the change with `/draft-spec`, then plan/implement/review by size

### Greenfield (new projects)

1. `/quick-start` (or configure project rules/verify commands)
2. `/draft-spec "your first feature"`
3. Follow `references/greenfield-workflow.md`

## Verify setup

1. **Skills discoverable** — agent lists `spec-driven-workflow` and `devops-strategy-facilitator`
2. **Commands (Cursor)** — `/draft-spec`, `/plan-impl`, `/implement-spec`, `/review`, `/extract-spec`, `/quick-start`, `/design-devops-strategy`, `/update-readme`
3. **Folders**:
   ```
   skills/                 ✓ SKILL.md source of truth
   .cursor/commands/       ✓ slash commands (optional)
   .cursor/docs/specs/     ✓ generated specs
   .cursor/plans/          ✓ implementation plans
   .cursor/rules/          ✓ RULE.md folders
   .cursor/skills/         ✓ relative symlinks → ../../skills/
   ```

## Next steps

- [Greenfield Workflow](greenfield-workflow.md)
- [Brownfield Workflow](brownfield-workflow.md)
- [Commands Reference](commands-reference.md)
- [Problem Size Guide](problem-size-guide.md)
- Repo [docs/lifecycle-coverage.md](../../../docs/lifecycle-coverage.md)
