# Edge cases

Load when create/edit is blocked or the PR state is ambiguous.

| Situation | What to do |
|-----------|------------|
| Uncommitted changes | Ask whether to commit first; do not include unrelated files |
| Branch not pushed | `git push -u origin HEAD` then create |
| PR already open with empty template | `gh pr edit` — fill title + body; do not open a second PR |
| PR already open with a good body | Ask before overwriting |
| Wrong base branch | Detect default with `gh repo view --json defaultBranchRef`; recreate or `gh pr edit --base` only if user confirms |
| Fork / no write access | Use `gh pr create` from the fork; report permission errors plainly |
| `gh` not authenticated | Stop; tell user to run `gh auth login` |
| Closed unmerged PR for same head | Open a **new** PR with a filled body (do not revive silently unless user asks) |
| User created via Diff-tab UI | Explain path mismatch once; offer to fill via `gh pr edit` now |

Never force-push or rewrite history as part of this skill unless the user explicitly asks.
