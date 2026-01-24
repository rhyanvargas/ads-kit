---
description: Project-specific security requirements
alwaysApply: true
---

# Security Requirements

> Project-specific security patterns. Generic security practices (input validation, parameterized queries) are omitted — Cursor already knows those.

## Authentication

<!-- Your project's specific auth approach -->

- Auth library/service: `<!-- discovered -->`
- Token type: `<!-- JWT / session / OAuth -->`
- Token storage: `<!-- discovered -->`

## Authorization

<!-- Your project's permission model -->

- Permission model: `<!-- RBAC / ABAC / custom -->`
- Permission check utility: `<!-- path to auth check -->`

## Sensitive Data

<!-- Project-specific data handling requirements -->

### Fields Requiring Encryption

- `<!-- field1 -->`
- `<!-- field2 -->`

### PII Handling

- `<!-- your PII requirements -->`

## Environment Variables

<!-- Required secrets for this project -->

| Variable | Purpose | Required |
|----------|---------|----------|
| `<!-- VAR_NAME -->` | `<!-- purpose -->` | Yes/No |

## Compliance Requirements

<!-- HIPAA, SOC2, GDPR, etc. if applicable -->

- `<!-- requirement 1 -->`
- `<!-- requirement 2 -->`

## Security Patterns

<!-- Project-specific security implementations -->

- Audit logging: `<!-- path/approach -->`
- Rate limiting: `<!-- path/approach -->`
- CSRF protection: `<!-- path/approach -->`

## Reference Files

@<!-- path/to/auth-middleware -->
@<!-- path/to/permission-check -->
