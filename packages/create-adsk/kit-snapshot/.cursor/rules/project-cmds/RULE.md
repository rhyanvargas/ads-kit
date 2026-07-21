---
description: "Exact build/test/lint/typecheck commands for this repo"
alwaysApply: true
---

# Project Commands (build/test/lint/typecheck)

This rule should list the **exact** commands the agent must use to verify work in this repo.

If this repo has no code/test tooling (docs-only), state that explicitly.

## Default (docs + sync + skill CI + create-adsk)

This repository is documentation/templates plus `scripts/sync-adsk.sh`, Tier 1 skill gates in `scripts/check-skills-ci.sh`, and the `create-adsk` workspace package under `packages/create-adsk`.

## Commands

```bash
# Smoke (sync script):  ./scripts/sync-adsk.sh self-check
# Kit symlinks:         ./scripts/sync-adsk.sh kit
# Dry-run kit:          ./scripts/sync-adsk.sh kit --dry-run
# Skill Tier 1 gates:   ./scripts/check-skills-ci.sh
# Skill Tier 1 fixtures:./scripts/check-skills-ci.sh --self-test
# Dependency audit:     npm ci && npm audit --audit-level=high
# create-adsk snapshot: ./scripts/prepare-create-adsk-snapshot.sh
# create-adsk npm placeholder: ./scripts/npm-bootstrap-create-adsk-placeholder.sh
# create-adsk npm tag:       ./scripts/tag-create-adsk-release.sh [--push]
# create-adsk npm verify:    ./scripts/verify-create-adsk-registry.sh [--npx]
# release-please refresh:    gh workflow run release-please.yml
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
