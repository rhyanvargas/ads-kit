# Socket GitHub Actions

**When to read:** Wiring, repairing, or explaining `.github/workflows/socket.yml`.

Official guide: [Socket for GitHub Actions](https://docs.socket.dev/docs/socket-for-github-actions).

## This kit

| Piece | Path / name |
|-------|-------------|
| Workflow | `.github/workflows/socket.yml` |
| Secret | `SOCKET_SECURITY_API_KEY` (repo or org Actions secret) |
| App | Socket for GitHub (PR comments; separate from CLI secret) |
| Policy | `SECURITY.md` + `policy-allowlist.md` |

## Checklist

1. Socket GitHub app installed on the repo/org.
2. API token created in Socket dashboard → Actions secret `SOCKET_SECURITY_API_KEY`.
3. Workflow present; job skips with a notice if the secret is unset (does not fail forks).
4. After secret is live, optionally require check `socket-security` in branch protection.
5. Align Socket org **policy** with the allowlist (block malware/install scripts; warn/monitor expected CLI capabilities).

Do not commit API tokens. Prefer OIDC/Trusted Publishing for npm publish (see `SECURITY.md`).
