#!/usr/bin/env bash
# run-skill-evals-soft.sh — Tier 2 soft eval prep (local + CI).
#
# Packages one first-party skill's eval harness into a SCORECARD-ready artifact.
# Does NOT call LLMs. Maintainers run with_skill vs without_skill using the
# generated prompts, grade assertions, then paste results into docs/evals/SCORECARD.md.
#
# Spec: .cursor/docs/specs/skill-eval-ci.md
# Runbook: docs/evaluating-skills.md (Tier 2)
#
# Usage:
#   ./scripts/run-skill-evals-soft.sh
#   ./scripts/run-skill-evals-soft.sh --skill skill-optimizer
#   ./scripts/run-skill-evals-soft.sh --skill readme-authoring --out /tmp/tier2-out
#   ./scripts/run-skill-evals-soft.sh --self-test

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
SKILLS_ROOT="${REPO_ROOT}/skills"
DEFAULT_SKILL="skill-optimizer"

usage() {
  cat <<'EOF'
run-skill-evals-soft.sh — Tier 2 soft eval package (no LLM)

Usage:
  ./scripts/run-skill-evals-soft.sh [--skill NAME] [--out DIR]
  ./scripts/run-skill-evals-soft.sh --self-test
  ./scripts/run-skill-evals-soft.sh -h|--help

Default skill: skill-optimizer (first-party optimizer gate).
Writes tier2-summary.md + scorecard-paste.md (+ cases.json) under --out
(default: <repo>/.adsk-tier2-out/<skill>/ — gitignored via .adsk-* pattern if present,
 or use an explicit --out under /tmp).

Exit 0 on success; non-zero on failure.
EOF
}

fail() {
  echo "ERROR: $*" >&2
  return 1
}

SKILL_NAME=""
OUT_DIR=""
SELF_TEST=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --skill)
      [[ $# -ge 2 ]] || { fail "--skill requires a name"; exit 1; }
      SKILL_NAME="$2"
      shift 2
      ;;
    --out)
      [[ $# -ge 2 ]] || { fail "--out requires a directory"; exit 1; }
      OUT_DIR="$2"
      shift 2
      ;;
    --self-test)
      SELF_TEST=1
      shift
      ;;
    *)
      fail "unknown argument: $1"
      exit 1
      ;;
  esac
done

if [[ -z "${SKILL_NAME}" ]]; then
  SKILL_NAME="${DEFAULT_SKILL}"
fi

package_skill() {
  local name="$1"
  local out="$2"
  local skill_dir="${SKILLS_ROOT}/${name}"
  local evals_json="${skill_dir}/evals/evals.json"
  local trigger_json="${skill_dir}/evals/trigger/eval_queries.json"

  if [[ ! -d "${skill_dir}" ]]; then
    echo "ERROR: skill not found: ${skill_dir}" >&2
    return 1
  fi
  if [[ ! -f "${skill_dir}/SKILL.md" ]]; then
    echo "ERROR: missing SKILL.md: ${skill_dir}" >&2
    return 1
  fi
  if [[ ! -f "${evals_json}" ]]; then
    echo "ERROR: missing ${evals_json}" >&2
    return 1
  fi
  if [[ ! -f "${trigger_json}" ]]; then
    echo "ERROR: missing ${trigger_json}" >&2
    return 1
  fi

  mkdir -p "${out}"

  python3 - "$name" "$evals_json" "$trigger_json" "$out" <<'PY'
import json, sys
from datetime import datetime, timezone
from pathlib import Path

name, evals_path, trigger_path, out_dir = sys.argv[1:5]
out = Path(out_dir)
evals = json.loads(Path(evals_path).read_text(encoding="utf-8"))
triggers = json.loads(Path(trigger_path).read_text(encoding="utf-8"))

if evals.get("skill_name") != name:
    sys.exit(f"skill_name mismatch: evals={evals.get('skill_name')!r} folder={name!r}")

cases = evals.get("evals") or []
if not cases:
    sys.exit("evals array empty")

n_trig = len(triggers)
n_true = sum(1 for t in triggers if t.get("should_trigger") is True)
n_false = sum(1 for t in triggers if t.get("should_trigger") is False)
now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

manifest = {
    "tier": 2,
    "skill_name": name,
    "generated_at": now,
    "mode": "package_only_no_llm",
    "skill_path": f"skills/{name}",
    "case_count": len(cases),
    "trigger_query_count": n_trig,
    "trigger_should_true": n_true,
    "trigger_should_false": n_false,
    "cases": [
        {
            "id": c.get("id"),
            "prompt": c.get("prompt"),
            "expected_output": c.get("expected_output"),
            "assertions": c.get("assertions") or [],
        }
        for c in cases
    ],
}
(out / "cases.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

# Per-case grading stubs (fill after agent runs)
for c in cases:
    cid = c.get("id")
    case_dir = out / f"eval-{cid}"
    for arm in ("with_skill", "without_skill"):
        arm_dir = case_dir / arm
        arm_dir.mkdir(parents=True, exist_ok=True)
        grading = {
            "skill_name": name,
            "eval_id": cid,
            "arm": arm,
            "assertions": [
                {"text": a, "result": "PENDING", "evidence": ""}
                for a in (c.get("assertions") or [])
            ],
            "pass_count": None,
            "fail_count": None,
            "notes": "Set result to PASS or FAIL with evidence after the agent run.",
        }
        (arm_dir / "grading.json").write_text(
            json.dumps(grading, indent=2) + "\n", encoding="utf-8"
        )
        (arm_dir / "README.md").write_text(
            f"# {arm} — {name} eval {cid}\n\n"
            f"1. Open a **clean** agent context.\n"
            f"2. {'Attach' if arm == 'with_skill' else 'Do not attach'} `skills/{name}`.\n"
            f"3. Paste the prompt from `cases.json` (id={cid}).\n"
            f"4. Save transcript/outputs here; grade `grading.json`.\n",
            encoding="utf-8",
        )

rows = []
for c in cases:
    cid = c.get("id")
    rows.append(
        f"| `{name}` | {cid} | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _pending_ |"
    )

scorecard = f"""# SCORECARD paste block — `{name}`

Generated: {now}

Copy the results table into [docs/evals/SCORECARD.md](../../docs/evals/SCORECARD.md)
under **Template for pasting run results** (replace `_TBD_` rows for this skill).

After grading all cases, compute:

- `with_skill pass_rate` = assertions PASS / total assertions (across cases, with_skill arm)
- `without_skill pass_rate` = same for without_skill
- `Δ pass_rate` = with − without
- `Token Δ` = with_skill tokens − without_skill tokens (if measured)

| Skill | Eval id / Iteration | with_skill pass_rate | without_skill pass_rate | Δ pass_rate | Token Δ | Recommendation |
|-------|---------------------|----------------------|-------------------------|-------------|---------|----------------|
{chr(10).join(rows)}

## Aggregate (fill after all cases)

| Skill | Iteration | with_skill pass_rate | without_skill pass_rate | Δ pass_rate | Token Δ | Recommendation |
|-------|-----------|----------------------|-------------------------|-------------|---------|----------------|
| `{name}` | 1 | _TBD_ | _TBD_ | _TBD_ | _TBD_ | keep / revise / replace |

## Checklist before pasting into SCORECARD

- [ ] Each `eval-*/with_skill/grading.json` and `without_skill/grading.json` has PASS/FAIL (not PENDING)
- [ ] Evidence quotes paths or output snippets
- [ ] Aggregate row filled
- [ ] PR or follow-up commit updates `docs/evals/SCORECARD.md` (Eval readiness note if now benchmarked)
"""
(out / "scorecard-paste.md").write_text(scorecard, encoding="utf-8")

case_lines = []
for c in cases:
    cid = c.get("id")
    n_a = len(c.get("assertions") or [])
    prompt = (c.get("prompt") or "").replace("\n", " ")
    if len(prompt) > 120:
        prompt = prompt[:117] + "..."
    case_lines.append(f"- **eval-{cid}** ({n_a} assertions): {prompt}")

summary = f"""# Tier 2 soft evals — `{name}`

Generated: {now}

## Status

| Field | Value |
|-------|-------|
| Mode | **Package only** (no LLM agent loops in Actions) |
| Skill | `skills/{name}` |
| Output cases | {len(cases)} |
| Trigger queries | {n_trig} (should_trigger true={n_true}, false={n_false}) |
| Soft signal | Yes — must not be a required PR check |

Full with_skill vs without_skill agent automation is **not** in CI yet (cost/flakiness).
This artifact prepares one skill for a maintainer-run Tier 2 iteration.

## Runbook (maintainer)

1. Use this artifact directory (or regenerate: `./scripts/run-skill-evals-soft.sh --skill {name}`).
2. For each `eval-<id>/`:
   - **with_skill:** clean context + skill attached → paste prompt from `cases.json` → save outputs → grade `grading.json`
   - **without_skill:** clean context, no skill → same prompt → grade
3. Prefer scripted checks for mechanical assertions; LLM/blind A/B for semantic ones (see `docs/evaluating-skills.md`).
4. Fill `scorecard-paste.md` aggregate row; paste into `docs/evals/SCORECARD.md`.
5. Optional: zip this directory and attach to a GitHub Actions run artifact, or open a docs PR with SCORECARD numbers.

## Cases

{chr(10).join(case_lines)}

## Files in this package

| File | Purpose |
|------|---------|
| `cases.json` | Manifest + prompts/assertions |
| `scorecard-paste.md` | Copy-paste block for SCORECARD |
| `eval-*/with_skill/` | Workspace + `grading.json` stub |
| `eval-*/without_skill/` | Workspace + `grading.json` stub |

## Related

- Runbook: `docs/evaluating-skills.md` (Tier 2)
- Spec: `.cursor/docs/specs/skill-eval-ci.md`
- Tier 1 (PR hard gate): `./scripts/check-skills-ci.sh`
"""
(out / "tier2-summary.md").write_text(summary, encoding="utf-8")
print(f"Wrote Tier 2 package for {name} → {out}")
PY
}

run_self_test() {
  local tmp
  tmp="$(mktemp -d "${TMPDIR:-/tmp}/adsk-tier2-selftest.XXXXXX")"
  # shellcheck disable=SC2064
  trap "rm -rf '${tmp}'" EXIT

  echo "→ Self-test: package default skill (${DEFAULT_SKILL})"
  package_skill "${DEFAULT_SKILL}" "${tmp}/out"
  [[ -f "${tmp}/out/tier2-summary.md" ]] || fail "missing tier2-summary.md"
  [[ -f "${tmp}/out/scorecard-paste.md" ]] || fail "missing scorecard-paste.md"
  [[ -f "${tmp}/out/cases.json" ]] || fail "missing cases.json"
  grep -q "${DEFAULT_SKILL}" "${tmp}/out/tier2-summary.md" || fail "summary missing skill name"
  grep -q "SCORECARD" "${tmp}/out/scorecard-paste.md" || fail "paste missing SCORECARD marker"
  python3 -c "import json; m=json.load(open('${tmp}/out/cases.json')); assert m['case_count']>=1" \
    || fail "cases.json invalid"

  echo "→ Self-test: reject unknown skill"
  if package_skill "not-a-real-skill" "${tmp}/bad" 2>/dev/null; then
    fail "expected failure for unknown skill"
    exit 1
  fi

  echo "→ Self-test passed"
}

if [[ "${SELF_TEST}" -eq 1 ]]; then
  run_self_test
  exit 0
fi

if [[ -z "${OUT_DIR}" ]]; then
  OUT_DIR="${REPO_ROOT}/.adsk-tier2-out/${SKILL_NAME}"
fi

package_skill "${SKILL_NAME}" "${OUT_DIR}" || exit 1
echo "Next: grade eval-*/{with,without}_skill/grading.json then paste scorecard-paste.md into docs/evals/SCORECARD.md"
