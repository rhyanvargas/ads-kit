# Security Policy

## Supported versions

Security fixes are applied to the latest release on `main` and the most recent
semver tag when practical.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security-sensitive reports.

Prefer one of:

1. GitHub **Private vulnerability reporting** on this repository (Security tab), if enabled.
2. Email the maintainers listed in the GitHub repo profile / recent release notes.

Include:

- Description of the issue and impact
- Steps to reproduce (or proof-of-concept)
- Affected paths (skills, scripts, install docs)
- Whether the issue involves recommended upstream skills (if so, name the source)

## Dependency security

This repository uses free GitHub Dependabot and an npm audit CI gate:

- **Dependabot version updates:** [`.github/dependabot.yml`](.github/dependabot.yml) — weekly npm (root workspace / `create-adsk`) and GitHub Actions updates
- **Dependabot alerts + security updates:** enable once in the GitHub Security tab (not fully encoded in YAML)
- **CI audit gate:** [`.github/workflows/skills-ci.yml`](.github/workflows/skills-ci.yml) runs `npm ci` then `npm audit --audit-level=high` on every PR and push to `main`

Local check:

```bash
npm ci && npm audit --audit-level=high
```

## npm Trusted Publishing (`create-adsk`)

The `create-adsk` package publishes from GitHub Actions with [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC) — no long-lived `NPM_TOKEN` in repo secrets. Provenance attestations are enabled via `publishConfig.provenance`.

| Artifact | Role |
|----------|------|
| [`.github/workflows/publish-create-adsk.yml`](.github/workflows/publish-create-adsk.yml) | OIDC publish on `create-adsk-v*` tags (or manual `workflow_dispatch`) |
| [`packages/create-adsk/package.json`](packages/create-adsk/package.json) | `publishConfig.access` + `provenance` |

**Maintainer bootstrap (once):** npm requires the package name to exist before Trusted Publisher can be configured. Publish a one-time placeholder (e.g. `0.0.0`) or the first real version with an interactive npm login / short-lived token, then on npmjs.com → package **Settings → Trusted Publisher**:

- Organization or user: `rhyanvargas`
- Repository: `agentic-development-starter-kit`
- Workflow filename: `publish-create-adsk.yml` (filename only)
- Allowed actions: `npm publish`

After Trusted Publisher works, prefer restricting token publish access on the package (npm “disallow tokens” / 2FA settings). Day-to-day release steps: [docs/RELEASE.md](docs/RELEASE.md).

## Skill supply-chain guidance

ADSK recommends (but does not vendor) third-party skills. Treat unpinned installs
from public skill registries as untrusted until reviewed:

- Prefer official orgs and pinned versions in [`recommended-skills.json`](recommended-skills.json)
- Review `SKILL.md` and any `scripts/` before enabling in production environments
- Do not install skills that request credentials, broad network exfiltration, or opaque binaries without review

See [docs/lifecycle-coverage.md](docs/lifecycle-coverage.md) for trust criteria.
