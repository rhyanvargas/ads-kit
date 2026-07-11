# Getting Started

Set up the spec-driven workflow in your project.

## Prerequisites

- [Cursor IDE](https://cursor.com) installed
- A project to work with (new or existing)

## Installation

### Option 1: Copy from clone

```bash
# Clone the starter
git clone https://github.com/your-org/cursor-spec-driven-starter.git

# Copy .cursor folder to your project
cp -rn cursor-spec-driven-starter/.cursor your-project/
```

### Option 2: Manual setup

1. Create the folder structure:
   ```
   your-project/
   └── .cursor/
       ├── commands/
       ├── docs/
       │   └── specs/
       ├── plans/
       ├── rules/
       │   └── project/
       │       └── RULE.md
       ├── skills/
       └── templates/
   ```

2. Copy command files to `.cursor/commands/`
3. Copy skills to `.cursor/skills/`
4. Copy rule folders to `.cursor/rules/` (each folder needs a `RULE.md`)

## First Run

### For existing projects (brownfield)

1. Open your project in Cursor
2. Run `/quick-start` in the chat
3. Review the detected configuration
4. Run `/extract-spec src/` to document existing code

### For new projects (greenfield)

1. Open your project in Cursor
2. Run `/quick-start` to set up rules
3. Run `/draft-spec "your first feature"` to create a spec
4. Follow the spec-driven workflow

## Verify Setup

Check that everything is working:

1. **Commands available**: Type `/` in chat — you should see:
   - `/draft-spec`
   - `/plan-impl`
   - `/implement-spec`
   - `/review`
   - `/extract-spec`
   - `/quick-start`
   - `/design-devops-strategy`
   - `/update-readme`

2. **Skills available**: Cursor Settings → Rules → Agent Decides (or type `/` and search skill names)

3. **Folders exist**:
   ```
   .cursor/
   ├── commands/     ✓ slash commands
   ├── docs/specs/   ✓ generated specs land here
   ├── plans/        ✓ implementation plans
   ├── rules/        ✓ RULE.md folders
   ├── skills/       ✓ SKILL.md workflows + references/
   └── templates/    ✓ rule-templates.md
   ```

## Next Steps

- [Greenfield Workflow](greenfield-workflow.md) - Start a new feature
- [Brownfield Workflow](brownfield-workflow.md) - Work with existing code
- [Commands Reference](commands-reference.md) - All commands explained
- [Problem Size Guide](problem-size-guide.md) - When to use which workflow
