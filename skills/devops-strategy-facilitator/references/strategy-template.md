# DevOps Strategy Template

Use this structure for the deliverable (keep ≤ ~1–2 pages).

```markdown
# DevOps Strategy — {Project Name}

## Goals
- {Goal 1}
- {Goal 2}

## Non-Goals
- {Non-goal 1}

## Delivery Model
- **Release cadence**: {e.g., on-demand | weekly | date-based release branches}
- **Promotion model**: {e.g., build once → promote artifacts}
- **Release notes**: {e.g., Conventional Commits + release-please | Keep a Changelog manual | Changesets}

## Branching & PR Policy
- **Branch types**: {e.g., feature/*, release/*, main}
- **Merge flow**: {e.g., feature/* → release/* → main}
- **PR gates**: {tests, lint, approvals, CODEOWNERS}

## CI (Build + Validate)
- **Triggers**: {PRs, pushes, schedule}
- **Responsibilities**: {lint, tests, package, SBOM, sign}
- **Artifacts**: {what, where stored, version metadata}

## CD (Deploy)
- **Environments**: {dev, prod, ...}
- **Dev**: {auto/manual}, **Prod**: {auto/manual + approvals}
- **Rollback**: {strategy}

## Secrets & Configuration
- **Secret store**: {Key Vault, etc.}
- **Config**: {pipeline vars, config files, runtime config}

## Governance & Access
- **Who can deploy to Prod**: {groups}
- **Audit trail**: {where tracked}

## Observability
- **Logs/metrics/traces**: {tools + minimum SLOs}

## Open Questions
- {Question 1}

## Decision Log
| Area | Decision | Rationale |
|------|----------|-----------|
| Branching | {…} | {…} |
| Promotion | {…} | {…} |
| Secrets | {…} | {…} |

## Assumptions
- {Assumption 1}

## Next Steps (optional)
- {Repo layout / pipeline skeleton / agent rules}
```
