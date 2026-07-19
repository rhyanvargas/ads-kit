#!/usr/bin/env bash
# Verify create-adsk on the npm registry matches the in-repo package version.
# Plan: .cursor/plans/create_adsk_npm_first_publish.plan.md (REQ-005)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PKG_JSON="${ROOT}/packages/create-adsk/package.json"
PKG_NAME="create-adsk"
run_npx=false
expected_version=""

usage() {
  cat <<EOF
Usage: $(basename "$0") [--npx] [--version X.Y.Z]

Checks npm registry metadata for ${PKG_NAME}.

Options:
  --npx            Also run: npx create-adsk@VERSION --help
  --version X.Y.Z  Expected registry version (default: package.json version)
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --npx) run_npx=true; shift ;;
    --version)
      expected_version="${2:-}"
      shift 2
      ;;
    -h | --help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

if [[ ! -f "${PKG_JSON}" ]]; then
  echo "Missing ${PKG_JSON}" >&2
  exit 1
fi

if [[ -z "${expected_version}" ]]; then
  expected_version="$(node -p "require('${PKG_JSON}').version")"
fi

echo "Expected registry version: ${expected_version}"

if ! registry_version="$(npm view "${PKG_NAME}@${expected_version}" version 2>/dev/null)"; then
  echo "FAIL: ${PKG_NAME}@${expected_version} not found on npm registry." >&2
  echo "Run bootstrap first: ./scripts/npm-bootstrap-create-adsk-placeholder.sh" >&2
  exit 1
fi

echo "OK: npm view ${PKG_NAME}@${registry_version} version"

repo_url="$(npm view "${PKG_NAME}" repository.url 2>/dev/null || true)"
if [[ -n "${repo_url}" ]]; then
  echo "OK: repository.url=${repo_url}"
else
  echo "WARN: no repository.url on registry package" >&2
fi

if [[ "${run_npx}" == true ]]; then
  echo "Running: npx ${PKG_NAME}@${expected_version} --help"
  npx "${PKG_NAME}@${expected_version}" --help >/dev/null
  echo "OK: npx ${PKG_NAME}@${expected_version} --help"
fi

echo "Registry verification passed."
