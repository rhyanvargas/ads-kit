# Evidence discovery

**When to load:** Large or monorepo trees, unclear public surface, or update/sync audits where claims must be verified.

## Scope

Start from the directory that owns the README. Do not document sibling packages as “this” project’s API.

```
monorepo/
├── README.md                 ← whole product
└── packages/foo/README.md    ← only packages/foo/
```

## Collect (parallelize when tools allow)

| Lane | Look for | Capture |
|------|----------|---------|
| Tooling | Lockfiles, `package.json` / `pyproject.toml` / `go.mod` / `Cargo.toml`, CI | Package manager, install/build/test commands, runtime versions |
| Surface | `main`/`exports`, `cmd/`, `src/index.*`, Dockerfile `CMD`, CLI `--help` | Public entry points only — not private helpers |
| Examples | `examples/`, `*.test.*` / `*_test.go`, JSDoc `@example` | Copy-pasteable real usage |
| Docs | `CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md`, `ARCHITECTURE.md`, `docs/` | Cross-links; don’t duplicate |
| Drift | Existing README vs files above | Missing / stale / wrong PM commands |

## Package manager (JS)

| Lockfile | Use |
|----------|-----|
| `pnpm-lock.yaml` | `pnpm` |
| `yarn.lock` | `yarn` |
| `bun.lockb` / `bun.lock` | `bun` |
| `package-lock.json` | `npm` |

If an `openspec/config.yml` (or similar) pins the package manager, prefer that over lockfile guesswork.

## Hard rules

- Document **exported / user-facing** APIs only.
- **Never invent** install commands, env vars, or examples.
- If evidence is missing, ask or mark as assumption — don’t guess.
- Prefer linking to `docs/` over embedding large guides.

## Sync output shape

Before editing, list findings as facts:

```text
Findings:
- Uses pnpm (pnpm-lock.yaml); scripts: dev, test, build
- Public export: createClient from src/index.ts
- README still says `npm install` (stale)
- AGENTS.md exists — link from Contributing
```
