#!/usr/bin/env bash
# Create (and optionally push) create-adsk-vX.Y.Z from packages/create-adsk/package.json.
# Plan: .cursor/plans/create_adsk_npm_first_publish.plan.md (REQ-004)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PKG_JSON="${ROOT}/packages/create-adsk/package.json"
push=false

usage() {
  cat <<EOF
Usage: $(basename "$0") [--push]

Create an annotated tag create-adsk-vX.Y.Z matching packages/create-adsk/package.json version.

Options:
  --push   Push the tag to origin after creating it locally
EOF
}

for arg in "$@"; do
  case "$arg" in
    --push) push=true ;;
    -h | --help) usage; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; usage >&2; exit 1 ;;
  esac
done

if [[ ! -f "${PKG_JSON}" ]]; then
  echo "Missing ${PKG_JSON}" >&2
  exit 1
fi

version="$(node -p "require('${PKG_JSON}').version")"
tag="create-adsk-v${version}"

if git -C "${ROOT}" rev-parse "${tag}" >/dev/null 2>&1; then
  echo "Tag ${tag} already exists locally." >&2
  exit 1
fi

if git -C "${ROOT}" ls-remote --exit-code origin "refs/tags/${tag}" >/dev/null 2>&1; then
  echo "Tag ${tag} already exists on origin." >&2
  exit 1
fi

if ! git -C "${ROOT}" diff --quiet; then
  echo "Working tree has uncommitted changes; commit or stash before tagging." >&2
  exit 1
fi

git -C "${ROOT}" tag -a "${tag}" -m "create-adsk v${version}"
echo "Created tag ${tag}"

if [[ "${push}" == true ]]; then
  git -C "${ROOT}" push origin "${tag}"
  echo "Pushed ${tag} — watch publish-create-adsk workflow on GitHub Actions."
else
  echo "Push when ready: git push origin ${tag}"
fi
