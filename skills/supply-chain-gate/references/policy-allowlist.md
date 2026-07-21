# Policy allowlist (ADSK kit default)

**When to read:** Applying or documenting Socket block vs warn for this repo.

Canonical copy for humans: repo root `SECURITY.md` → “Socket policy (this repo)”.
Keep this file aligned when policy changes.

| Alert class | Stance | Notes |
|-------------|--------|-------|
| Known malware / AI malware / typosquat / obfuscated code | **Block** | Never merge |
| Install scripts on published deps | **Block** | No consumer `postinstall` / `preinstall` |
| Git / HTTP / GitHub URL dependencies | **Block** | Registry + lockfile only |
| Telemetry / protestware | **Block** | |
| New High capability creep (network, eval, env harvest) without justification | **Block** | PR must justify exceptions |
| Filesystem / shell in `create-adsk` | **Monitor / warn** | Expected CLI behavior |
| Recently published / new author / low downloads | **Monitor** | Cool-down; not a merge blocker alone |
| Wildcard ranges on published `create-adsk` production deps | **Warn → fix** | Prefer exact pins |

Do **not** gut `fs` or `child_process` in `create-adsk` just to pad Supply Chain scores.
