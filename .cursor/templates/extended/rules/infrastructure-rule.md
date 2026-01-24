---
description: Project-specific infrastructure and CI/CD patterns
globs:
  - ".github/**"
  - "**/*.yaml"
  - "**/*.yml"
  - "**/Dockerfile*"
---

# Infrastructure Patterns

> Project-specific infrastructure conventions.

## CI/CD Platform

<!-- Your project's CI/CD setup -->

- Platform: `<!-- GitHub Actions / GitLab CI / etc. -->`
- Config location: `<!-- path -->`

## Workflows

<!-- Your project's CI workflows -->

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `<!-- name -->` | `<!-- trigger -->` | `<!-- purpose -->` |

## Deployment

<!-- Your project's deployment approach -->

- Environments: `<!-- dev / staging / prod -->`
- Deploy method: `<!-- approach -->`
- Hosting: `<!-- platform -->`

## Docker

<!-- Your project's containerization approach, if applicable -->

- Base image: `<!-- image -->`
- Dockerfile location: `<!-- path -->`
- Compose file: `<!-- path -->`

## Environment Management

<!-- How environments are configured -->

- Env file pattern: `<!-- .env.* -->`
- Secret management: `<!-- approach -->`

## Monitoring

<!-- Your project's observability setup -->

- Logging: `<!-- tool/approach -->`
- Metrics: `<!-- tool/approach -->`
- Alerting: `<!-- tool/approach -->`

## Reference Files

@<!-- path/to/main-workflow -->
@<!-- path/to/dockerfile -->
