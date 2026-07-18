---
description: "Exact build/test/lint/typecheck commands for this repo"
alwaysApply: true
---

# Project Commands (build/test/lint/typecheck)

This rule should list the **exact** commands the agent must use to verify work in this repo.

If this repo has no code/test tooling (docs-only), state that explicitly.

## Default (docs + sync + skill CI script)

This repository is documentation/templates plus `scripts/sync-adsk.sh` and Tier 1 skill gates in `scripts/check-skills-ci.sh`. There is no app build toolchain.

## Commands

```bash
# Smoke (sync script):  ./scripts/sync-adsk.sh self-check
# Kit symlinks:         ./scripts/sync-adsk.sh kit
# Dry-run kit:          ./scripts/sync-adsk.sh kit --dry-run
# Skill Tier 1 gates:   ./scripts/check-skills-ci.sh
# Skill Tier 1 fixtures:./scripts/check-skills-ci.sh --self-test
# create-adsk snapshot: ./scripts/prepare-create-adsk-snapshot.sh
# create-adsk test:     npm test -w create-adsk
# create-adsk build:    npm run build -w create-adsk
# create-adsk typecheck:npm run typecheck -w create-adsk
# Build:                npm run build -w create-adsk
# Test:                 ./scripts/sync-adsk.sh self-check && ./scripts/check-skills-ci.sh --self-test && npm test -w create-adsk
# Lint:                 n/a
# Typecheck:            npm run typecheck -w create-adsk
```

## Required environment (fill when applicable)

- `ENV_VAR_1`: description
- `ENV_VAR_2`: description
