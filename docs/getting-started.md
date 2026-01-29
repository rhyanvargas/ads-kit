# Getting Started

Set up the spec-driven workflow in your project.

## Prerequisites

- [Cursor IDE](https://cursor.com) installed
- A project to work with (new or existing)

## Installation

### Option 1: Copy the starter

```bash
# Clone the starter
git clone https://github.com/your-org/cursor-spec-driven-starter.git

# Copy .cursor folder to your project
cp -r cursor-spec-driven-starter/.cursor your-project/
cp -r cursor-spec-driven-starter/docs your-project/
```

### Option 2: Manual setup

1. Create the folder structure:
   ```
   your-project/
   ├── .cursor/
   │   ├── commands/
   │   ├── rules/
   │   └── templates/
   └── docs/
       └── specs/
   ```

2. Copy command files to `.cursor/commands/`
3. Copy `project.mdc` to `.cursor/rules/`

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

1. **Commands available**: Type `/` in chat - you should see:
   - `/draft-spec`
   - `/plan-impl`
   - `/implement-spec`
   - `/review`
   - `/extract-spec`
   - `/quick-start`

2. **Rules loaded**: The agent should mention project context in responses

3. **Folders exist**:
   ```
   .cursor/
   ├── commands/     ✓ 6 files
   ├── rules/        ✓ project.mdc
   └── templates/    ✓ 3 files
   docs/
   └── specs/        ✓ ready for specs
   ```

## Next Steps

- [Greenfield Workflow](greenfield-workflow.md) - Start a new feature
- [Brownfield Workflow](brownfield-workflow.md) - Work with existing code
- [Commands Reference](commands-reference.md) - All commands explained
- [Problem Size Guide](problem-size-guide.md) - When to use which workflow
