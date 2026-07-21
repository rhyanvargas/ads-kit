# /setup-socket

Triage Socket / supply-chain gates and harden dependency changes before merge or publish.

## Skill

Read and follow **`skills/supply-chain-gate`** (adopter apps: `.agents/skills/supply-chain-gate`).

## Usage

```
/setup-socket
/setup-socket "Socket CI failed on this PR"
/setup-socket "Can we add lodash? Check supply chain"
/setup-socket "Refresh Socket Actions + policy allowlist"
```

## Behavior

1. Classify: PR triage, workflow setup, dependency intake, or publish hygiene.
2. Apply block/warn/monitor from the skill policy allowlist (and `SECURITY.md` in this kit).
3. Fix blockers or stop for an explicit exception; call out secrets/dashboard steps still required.
