# Quick Start

## Overview

Set up minimal Cursor rules for your project. Creates a single, focused rule file based on YOUR project's unique patterns.

> **Philosophy**: *"Add rules only when Agent makes the same mistake repeatedly."* — Cursor Docs

## Parameters

```text
/quick-start              # Interactive setup
/quick-start agents-only  # Creates only AGENTS.md (simplest)
```

## Steps

1. **Ask architecture questions**
   - Folder structure? (feature-based, layer-based, custom)
   - Internal libraries Agent doesn't know about?
   - Patterns that DIFFER from defaults?
   - Anti-patterns to avoid?

2. **Identify reference files**
   - Ask user for 2-3 canonical example files
   - These become `@path/to/file` references in the rule

3. **Create rule file**
   - Use template at `.cursor/templates/rules/project.mdc`
   - Output to `.cursor/rules/project.mdc`
   - For `agents-only`: create `AGENTS.md` in project root instead

4. **Summarize**
   - Show what was created
   - Remind user: add more rules only when needed

## Output

Creates `.cursor/rules/project.mdc`:

```markdown
---
description: Project-specific standards
alwaysApply: true
---

# Project Standards

## Architecture
[Your specific folder structure]

## Internal Libraries
[Libraries Agent doesn't know about]

## Patterns We Use
[Only things that differ from defaults]

## Reference Files
@path/to/example-component.tsx
@path/to/example-api-route.ts
```

## When to Use Extended Templates

Use `/create-rules` instead if:
- Large teams needing comprehensive documentation
- Compliance/audit requirements
- Code review automation

## Completion Checklist

- [ ] Architecture questions answered
- [ ] Reference files identified
- [ ] Rule file created (`.cursor/rules/project.mdc` or `AGENTS.md`)
- [ ] User reminded to add rules incrementally
