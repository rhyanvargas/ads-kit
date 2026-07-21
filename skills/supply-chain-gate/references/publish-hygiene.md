# Publish hygiene (`create-adsk`)

**When to read:** Before tagging / publishing the npm package.

## Checklist

- [ ] No consumer lifecycle scripts (`postinstall` / `preinstall`); `prepack` build-only is OK
- [ ] Production dependencies exact-pinned
- [ ] `publishConfig.provenance` + Trusted Publishing still configured (`SECURITY.md`)
- [ ] `npm audit --audit-level=high` clean on the release commit
- [ ] Socket Alerts reviewed for the version about to publish (block classes clear)
- [ ] Do not remove filesystem/shell usage to chase package-health 100s

Release mechanics (tags, release-please): `release-automation` / `docs/RELEASE.md`.
