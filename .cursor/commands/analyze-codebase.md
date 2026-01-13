# Analyze Codebase

## Overview
Run a full, **report-only** audit of this repository against the project rules in `.cursor/rules/`. Outputs a structured Markdown report highlighting code violations and rule-doc inconsistencies.

## Parameters
Anything typed after `/analyze-codebase` is treated as scoping hints:
- `/analyze-codebase backend only`
- `/analyze-codebase focus on auth + security`

If no scope is provided, analyze the whole repo.

## Constraints
- [ ] Do **not** modify code or files (report only)
- [ ] Exclude `node_modules/` from all searches
- [ ] Avoid reading large generated/lock files

## Steps

1. **Load rules**
   - Read all `.cursor/rules/**/RULE.md` files
   - Extract verifiable requirements with applicability (global vs glob-scoped)

2. **Scan the codebase**
   - Use grep/search to find high-signal patterns
   - Targeted file reads only for confirmation
   - Apply rules to their scoped paths (e.g., `express-backend` → `ai_request_form_backend/**/*.ts`)

3. **Detect rule-doc conflicts**
   - Cross-check rule documents for contradictions
   - Quote conflicting lines and propose reconciliation

4. **Generate report**
   - Use the output template below
   - Every finding needs: rule reference, location, evidence, impact, suggested fix

## Output Template

### Rules Compliance Report

#### Scope
- Scope input: <user input>
- Exclusions: `node_modules/`

#### Summary
| Severity | Count |
|----------|-------|
| Blocker  |       |
| High     |       |
| Medium   |       |
| Low      |       |

#### Findings
| Severity | Rule | Location | Evidence | Suggested Fix |
|----------|------|----------|----------|---------------|
|          |      |          |          |               |

#### Rule-Doc Conflicts
| Conflict | Where | Proposed Resolution |
|----------|-------|---------------------|
|          |       |                     |

#### Top 5 Prioritized Fixes
1. 
2. 
3. 
4. 
5. 
