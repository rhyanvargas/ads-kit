# Create Rules (Extended)

## Overview

Create comprehensive coding standards using extended templates. For most projects, use `/quick-start` instead.

> **Note**: Per Cursor docs, Agent already knows common patterns (SOLID, REST, React, TypeScript). Extended rules are for large teams with specific compliance or documentation requirements.

## Parameters

```text
/create-rules                    # All extended rules
/create-rules general            # Core rules only (general, security)
/create-rules lang:typescript    # TypeScript rules
/create-rules lang:python        # Python rules
/create-rules frontend           # React/UI rules
/create-rules api                # API/backend rules
/create-rules infra              # CI/CD rules
/create-rules skip:git,docs      # Skip specific rules
```

## When to Use

- Large teams needing comprehensive documentation
- Enterprise/compliance requirements
- Code review automation
- Custom conventions Agent should follow

## Output Format (Cursor 2.2+)

Rules are created as **folders** containing `RULE.md` files:

```
.cursor/rules/
├── project/
│   └── RULE.md              # From /quick-start (always keep)
├── general/
│   └── RULE.md              # Core coding principles
├── security/
│   └── RULE.md              # Security practices
├── typescript/
│   └── RULE.md              # TypeScript patterns
│   └── scripts/             # Optional helper scripts
└── ...
```

## Templates → Output

| Type | Template | Output Folder |
|------|----------|---------------|
| General | `templates/extended/rules/general-rule.md` | `.cursor/rules/general/RULE.md` |
| Security | `templates/extended/rules/security-rule.md` | `.cursor/rules/security/RULE.md` |
| Git | `templates/extended/rules/git-rule.md` | `.cursor/rules/git/RULE.md` |
| Testing | `templates/extended/rules/testing-rule.md` | `.cursor/rules/testing/RULE.md` |
| Docs | `templates/extended/rules/documentation-rule.md` | `.cursor/rules/documentation/RULE.md` |
| TypeScript | `templates/extended/rules/typescript-rule.md` | `.cursor/rules/typescript/RULE.md` |
| Python | `templates/extended/rules/python-rule.md` | `.cursor/rules/python/RULE.md` |
| React | `templates/extended/rules/react-rule.md` | `.cursor/rules/react/RULE.md` |
| API | `templates/extended/rules/api-rule.md` | `.cursor/rules/api/RULE.md` |
| Infra | `templates/extended/rules/infrastructure-rule.md` | `.cursor/rules/infrastructure/RULE.md` |

## RULE.md Format

Each `RULE.md` file uses frontmatter to control when it applies:

```markdown
---
description: Brief description of when this rule applies
alwaysApply: true
---

# Rule Title

Rule content here...
```

### Rule Types (via frontmatter)

| Type | Frontmatter | When Applied |
|------|-------------|--------------|
| **Always Apply** | `alwaysApply: true` | Every chat session |
| **Apply Intelligently** | `description: "..."` (no globs/alwaysApply) | When Agent decides it's relevant |
| **Apply to Specific Files** | `globs: ["**/*.ts"]` | When file matches pattern |
| **Apply Manually** | (no frontmatter) | When @-mentioned in chat |

## Steps

1. **Run discovery first**
   - Suggest running `/quick-start` to discover project patterns
   - Use discovered values to populate templates

2. **Determine scope**
   - Parse parameters to determine which rules to create
   - Default: general rules (general, security, git, testing, docs)

3. **Create rule folders**
   - Create folder structure: `.cursor/rules/{rule-name}/RULE.md`
   - Read template from `.cursor/templates/extended/rules/`
   - Replace `{{placeholders}}` with discovered values
   - Remove generic content Agent already knows (SOLID, DRY, etc.)
   - Keep only project-specific guidance
   - **Warn before overwriting** existing rules

4. **Summarize output**
   - List created rule folders
   - Show frontmatter configuration for each
   - Note sections that need review

## Example Output

```
Created rules:

.cursor/rules/
├── general/
│   └── RULE.md    (alwaysApply: true)
├── security/
│   └── RULE.md    (alwaysApply: true)
├── typescript/
│   └── RULE.md    (globs: ["**/*.ts", "**/*.tsx"])
└── testing/
    └── RULE.md    (alwaysApply: true)

Next steps:
- Review each RULE.md and remove generic content
- Add project-specific patterns to "Project-Specific" sections
- Run /analyze-codebase to verify rules match your code
```

## Best Practices (from Cursor docs)

> "Keep rules under 500 lines. Split large rules into multiple, composable rules."

> "Provide concrete examples or referenced files. Avoid vague guidance."

> "Reference files instead of copying their contents—this keeps rules short."

**Do:**
- Reference canonical example files with `@filename.ts`
- Focus on YOUR project's unique patterns
- Remove generic advice Agent already knows

**Don't:**
- Copy entire style guides
- Include SOLID/DRY/KISS principles
- Document obvious conventions

## Completion Checklist

- [ ] `/quick-start` run first to discover project patterns
- [ ] Rule folders created with `RULE.md` files
- [ ] Frontmatter set with appropriate scope (alwaysApply/globs)
- [ ] Generic content removed, project-specific content added
- [ ] User warned before any overwrites
- [ ] Summary of created rules provided
