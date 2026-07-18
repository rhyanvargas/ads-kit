---
description: "Exact build/test/lint/typecheck commands for this repo"
alwaysApply: true
---

# Project Commands (build/test/lint/typecheck)

This rule should list the **exact** commands the agent must use to verify work in this repo.

If this repo has no code/test tooling (docs-only), state that explicitly.

## Default (docs + sync script)

This repository is documentation/templates plus `scripts/sync-adsk.sh`. There is no app build/test toolchain.

## Commands

```bash
# Smoke (sync script):  ./scripts/sync-adsk.sh self-check
# Kit symlinks:         ./scripts/sync-adsk.sh kit
# Dry-run kit:          ./scripts/sync-adsk.sh kit --dry-run
# Build:                n/a
# Test:                 ./scripts/sync-adsk.sh self-check
# Lint:                 n/a
# Typecheck:            n/a
```

## Required environment (fill when applicable)

- `ENV_VAR_1`: description
- `ENV_VAR_2`: description
