```text
 █████╗ ██████╗ ███████╗██╗  ██╗
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
███████║██║  ██║███████╗█████╔╝
██╔══██║██║  ██║╚════██║██╔═██╗
██║  ██║██████╔╝███████║██║  ██╗
╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

# create-adsk

Adopt the **Agentic Development Starter Kit (ADSK)** as a versioned **profile** — first-party skills via the skills CLI plus optional Cursor commands/rules — without a skills marketplace UX.

A ready-to-adopt kit for agentic, spec-driven development — workflow skills, Cursor slash commands, and a versioned profile for your team.

## Two-tool model

| Tool | Owns |
|------|------|
| **`npx skills`** | Install and update skill folders into `.agents/skills/` |
| **`npx create-adsk`** | Apply an ADSK profile (skills + Cursor + `.adsk/config.json`) |

Use `npx skills` to install skill folders. Use `npx create-adsk` when you want this kit’s workflow + Cursor adopted as a versioned profile in your repo.

## Quick start

From your app repo:

```bash
npx create-adsk
```

That opens an interactive prompt: pick a **profile**, optionally add product packs, then install skills and Cursor wiring.

| Profile | You get |
|---------|---------|
| `core` | Spec-driven workflow + Cursor commands |
| `delivery` | Core + DevOps strategy + release automation |
| `maintainer` | Delivery + skill/README authoring + stock rules |
| `skills-only` | All first-party skills; no `.cursor/` writes |

Machine-readable source: [`profiles.json`](../../profiles.json). Contract: [`docs/product/create-adsk.md`](../../docs/product/create-adsk.md).

### Non-interactive (CI / scripts)

```bash
npx create-adsk --profile delivery --yes
```

| Flag | Meaning |
|------|---------|
| `--profile <id>` | Skip the profile picker (`core` is the default if you pass `--yes` alone) |
| `--yes` / `-y` | No prompts; use defaults (no optional packs unless `--with-optional-packs`) |

### Local kit checkout (before/without npm)

```bash
npx --yes /path/to/agentic-development-starter-kit/packages/create-adsk
```

## Commands

```bash
npx create-adsk                 # init (interactive)
npx create-adsk update          # refresh from .adsk/config.json
npx create-adsk status          # profile + drift (exit 1 if drift)
npx create-adsk --help
```

Other flags: `--dry-run`, `--scope project|global`, `--force-rules`, `--with-optional-packs`, `--target <dir>`.

## Develop in this monorepo

```bash
# from kit root
./scripts/prepare-create-adsk-snapshot.sh
cd packages/create-adsk && npm install && npm test && npm run build
node dist/cli.js --help
```

## Releases (kit vs npm)

Kit GitHub releases (`v*`) and this npm package are **independent**.

| You want… | Do this |
|-----------|---------|
| Land code on GitHub | PR → green `tier1` → merge to `main` |
| Kit changelog / GitHub Release | Merge the release-please PR when ready |
| New `npx create-adsk` on npm | Bump `package.json` version on `main`, then tag `create-adsk-vX.Y.Z` |

Full maintainer workflow: [`docs/RELEASE.md`](../../docs/RELEASE.md).

Publishing uses [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC + provenance) via [`.github/workflows/publish-create-adsk.yml`](../../.github/workflows/publish-create-adsk.yml) — no long-lived `NPM_TOKEN`.
