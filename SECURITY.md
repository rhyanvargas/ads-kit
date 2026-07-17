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

## Skill supply-chain guidance

ADSK recommends (but does not vendor) third-party skills. Treat unpinned installs
from public skill registries as untrusted until reviewed:

- Prefer official orgs and pinned versions in [`recommended-skills.json`](recommended-skills.json)
- Review `SKILL.md` and any `scripts/` before enabling in production environments
- Do not install skills that request credentials, broad network exfiltration, or opaque binaries without review

See [docs/lifecycle-coverage.md](docs/lifecycle-coverage.md) for trust criteria.
