#!/usr/bin/env bash
# Copy kit artifacts into packages/create-adsk/kit-snapshot for create-adsk runtime.
# Decision: commit the generated snapshot so installs from git work without prepare.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${ROOT}/packages/create-adsk/kit-snapshot"
STOCK_RULES=(skill-authoring testing project-cmds)

rm -rf "${DEST}"
mkdir -p "${DEST}/.cursor/commands" "${DEST}/.cursor/rules"

cp "${ROOT}/profiles.json" "${DEST}/profiles.json"
cp "${ROOT}/recommended-skills.json" "${DEST}/recommended-skills.json"

if [[ -d "${ROOT}/.cursor/commands" ]]; then
  cp "${ROOT}/.cursor/commands/"*.md "${DEST}/.cursor/commands/" 2>/dev/null || true
fi

for r in "${STOCK_RULES[@]}"; do
  if [[ -d "${ROOT}/.cursor/rules/${r}" ]]; then
    mkdir -p "${DEST}/.cursor/rules/${r}"
    cp -R "${ROOT}/.cursor/rules/${r}/." "${DEST}/.cursor/rules/${r}/"
  fi
done

# Skill names for path rewrite (SKILL.md markers only — not full skill trees)
mkdir -p "${DEST}/skills"
for d in "${ROOT}/skills"/*/; do
  [[ -d "$d" ]] || continue
  name="$(basename "$d")"
  if [[ -f "${d}/SKILL.md" ]]; then
    mkdir -p "${DEST}/skills/${name}"
    # Placeholder so listSkillNamesFromSnapshot finds SKILL.md
    printf '# %s\n' "${name}" >"${DEST}/skills/${name}/SKILL.md"
  fi
done

if git -C "${ROOT}" rev-parse HEAD >/dev/null 2>&1; then
  sha="$(git -C "${ROOT}" rev-parse HEAD)"
  printf 'rhyanvargas/agentic-development-starter-kit@%s\n' "${sha}" >"${DEST}/KIT_REF"
else
  printf 'rhyanvargas/agentic-development-starter-kit@unknown\n' >"${DEST}/KIT_REF"
fi

echo "Prepared ${DEST}"
