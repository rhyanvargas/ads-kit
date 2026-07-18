# README writing guide

**When to load:** Prose cleanup, AI-tone removal, or deciding how thorough examples should be.

## Do

- Lead with the shortest path to a working result
- Show copy-pasteable commands and code; show expected output when it helps
- Use tables for env vars, flags, and script maps
- Write for a fresh machine — spell out prerequisites
- Prefer second person and active voice (“Run…”, “You get…”)
- Keep badges to ≤3–4 useful ones (version, build, license)

## Don’t

- Fabricate APIs, flags, or sample output
- Assume “the usual setup commands”
- Dump every internal module into an API section
- Paste full CONTRIBUTING / architecture docs into the README
- Use significance inflation (“pivotal”, “seamless”, “game-changer”)
- Use promotional filler or rule-of-three marketing lists without evidence

## Example hygiene

| Prefer | Avoid |
|--------|--------|
| Snippets from `examples/` or tests | Made-up APIs that “look right” |
| One minimal quick start (< ~20 lines) | Kitchen-sink first example |
| Correct package manager from lockfile | Defaulting to `npm` everywhere |

## Length

- Prefer scannable headers, lists, and tables over walls of prose
- TOC only when the README is long (~200+ lines)
- “Too short to onboard” is worse than “a bit long” — but cut duplication via links

## Voice check (before finish)

Read the draft once as a busy new user. Delete anything that doesn’t help them install, understand, or run the next command.
