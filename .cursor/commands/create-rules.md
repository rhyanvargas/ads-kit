# Create Rules (Extended)

## Overview

Create comprehensive coding standards using extended templates. For most projects, use `/quick-start` instead.

> **Note**: Agent already knows common patterns (SOLID, REST, React, TypeScript). Only use this for project-specific conventions or large team requirements.

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

## Templates

| Type | Template | Output |
|------|----------|--------|
| General | `extended/rules/general-rule.md` | `.cursor/rules/general/RULE.md` |
| Security | `extended/rules/security-rule.md` | `.cursor/rules/security/RULE.md` |
| Git | `extended/rules/git-rule.md` | `.cursor/rules/git/RULE.md` |
| Testing | `extended/rules/testing-rule.md` | `.cursor/rules/testing/RULE.md` |
| Docs | `extended/rules/documentation-rule.md` | `.cursor/rules/documentation/RULE.md` |
| TypeScript | `extended/rules/typescript-rule.md` | `.cursor/rules/typescript/RULE.md` |
| Python | `extended/rules/python-rule.md` | `.cursor/rules/python/RULE.md` |
| React | `extended/rules/react-rule.md` | `.cursor/rules/react/RULE.md` |
| API | `extended/rules/api-rule.md` | `.cursor/rules/api/RULE.md` |
| Infra | `extended/rules/infrastructure-rule.md` | `.cursor/rules/infrastructure/RULE.md` |

## Steps

1. **Check prerequisites**
   - Look for `.cursor/project-config.yaml` for placeholder values
   - If missing, suggest running `/init-project-config` first

2. **Determine scope**
   - Parse parameters to determine which rules to create
   - Default: all general rules (general, security, git, testing, docs)

3. **Create rules**
   - Read each template from `.cursor/templates/extended/rules/`
   - Replace `{{placeholders}}` with config values or sensible defaults
   - Set appropriate `globs` patterns for language-specific rules
   - **Warn before overwriting** existing rules

4. **Summarize output**
   - List all created rule files
   - Note any placeholders that need manual review

## Completion Checklist

- [ ] Config file checked (or user notified to run `/init-project-config`)
- [ ] Requested rules created from templates
- [ ] Placeholders replaced with config values
- [ ] User warned before any overwrites
- [ ] Summary of created files provided
