#!/usr/bin/env bash
# Publish a minimal create-adsk@0.0.0 placeholder so npm Trusted Publisher can be configured.
# Plan: .cursor/plans/create_adsk_npm_first_publish.plan.md (REQ-001)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PKG_NAME="create-adsk"
PLACEHOLDER_VERSION="0.0.0"

usage() {
  cat <<EOF
Usage: $(basename "$0") [--dry-run]

Reserve the npm package name with a one-time ${PKG_NAME}@${PLACEHOLDER_VERSION} publish.
Requires: npm login (interactive) on the maintainer machine — not CI.

Options:
  --dry-run   Print the publish payload without running npm publish
EOF
}

write_placeholder_manifest() {
  local dest="$1"
  cat >"${dest}" <<JSON
{
  "name": "${PKG_NAME}",
  "version": "${PLACEHOLDER_VERSION}",
  "description": "OIDC bootstrap placeholder — real releases from GitHub Actions",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rhyanvargas/agentic-development-starter-kit.git",
    "directory": "packages/create-adsk"
  }
}
JSON
}

dry_run=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) dry_run=true ;;
    -h | --help) usage; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; usage >&2; exit 1 ;;
  esac
done

if npm view "${PKG_NAME}@${PLACEHOLDER_VERSION}" version >/dev/null 2>&1; then
  echo "OK: ${PKG_NAME}@${PLACEHOLDER_VERSION} already on registry."
  echo "Next: configure Trusted Publisher on npmjs.com (see docs/RELEASE.md)."
  exit 0
fi

tmpdir="$(mktemp -d)"
trap 'rm -rf "${tmpdir}"' EXIT
write_placeholder_manifest "${tmpdir}/package.json"

if [[ "${dry_run}" == true ]]; then
  echo "[dry-run] would publish ${PKG_NAME}@${PLACEHOLDER_VERSION} from ${tmpdir}/package.json"
  cat "${tmpdir}/package.json"
  exit 0
fi

if ! npm whoami >/dev/null 2>&1; then
  echo "Not logged in to npm. Run: npm login" >&2
  exit 1
fi

echo "Publishing ${PKG_NAME}@${PLACEHOLDER_VERSION} as $(npm whoami) ..."
npm publish "${tmpdir}" --access public
echo "Done. Configure Trusted Publisher: https://www.npmjs.com/package/${PKG_NAME}/access"
