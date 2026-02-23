---
description: "Testing policy (TDD guidance + requirement-to-test coverage expectations)"
alwaysApply: true
---

# Testing Rules

Tests are a first-class deliverable. For any change that affects behavior (new feature, bug fix, refactor with risk), ship tests in the same change set unless explicitly justified.

## When tests are required

- New behavior (new feature or requirement)
- Bug fixes (add a regression test that fails before the fix)
- Refactors that change control flow, data flow, or public interfaces
- Security- or correctness-sensitive logic (authz, money, permissions, data integrity)
- Integration points (API boundaries, persistence, message queues)

## When tests may be omitted (must be explicit)

Tests may be omitted only when the change is demonstrably non-behavioral, e.g.:
- Documentation-only changes
- Formatting-only changes
- Dependency bumps with no codepath changes (still run tests if they exist)

If tests are omitted, the plan/spec/review must include a short **“No tests needed because…”** note and the verification steps must still run the existing test suite (if present).

## TDD guidance (apply when practical)

- Prefer **red → green → refactor** for new behavior and bug fixes.
- For bug fixes: add a regression test that reproduces the bug, then fix until it passes.
- For brownfield code with low coverage: add **characterization tests** around current behavior before changing it.

## Coverage intent (what to test)

- Test **public interfaces and observable behavior** (inputs/outputs, side effects).
- Use the **test pyramid**: many unit tests, fewer integration tests, E2E only for critical paths.
- Avoid over-mocking; prefer real implementations at boundaries when it improves signal.
- Cover at minimum:
  - Happy path
  - Key edge cases from the spec’s acceptance criteria
  - Failure modes and error handling at boundaries

## Evidence required

- Run the test suite using the project’s test command(s) (see `.cursor/rules/project-cmds/`).
- If a repo has no automated test harness yet, include a plan task to add one (unless the repo is purely documentation).
