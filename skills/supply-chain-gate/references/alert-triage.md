# Alert triage

**When to read:** Socket PR comment, `socket-security` CI job, or Socket.dev Alerts tab is red/yellow.

## Steps

1. List every **new** alert on the PR (not the whole historical package score).
2. For each alert, note severity + type (install scripts, malware, shell, filesystem, wildcard, recently published, …).
3. Apply stance from `policy-allowlist.md`:
   - **Block** → fix before merge (or reject the dep).
   - **Warn** → fix if cheap (e.g. pin versions); else document.
   - **Monitor** → no code change required; mention cool-down/reputation if relevant.
4. Confirm the failing check is Socket policy (or API secret missing — see `socket-github-actions.md`), not `npm audit` / skills-ci.
5. After fixes: push and wait for Socket re-scan; do not use `--no-verify` / skip hooks.

## Common false “must fix to 100”

| Signal | Reality |
|--------|---------|
| Filesystem / shell on `create-adsk` | Product requires writing config and spawning `npx skills` |
| Recently published / new author | Time + downloads; Trusted Publishing helps trust, not score wipe |
| Quality/Maintenance &lt; 100 | Stars, issues, version history — not a PR blocker |
