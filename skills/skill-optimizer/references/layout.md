# Skill layout (kit vs adopter)

Load when creating a new skill or when the user is unsure where files should live.

| Context | Skill path | Discovery |
|---------|------------|-----------|
| **ADSK kit repo** | `skills/<name>/` | Symlink `.agents/skills/<name>` and `.cursor/skills/<name>` → `../../skills/<name>` |
| **Adopter app** | `.agents/skills/<name>/` only | No root `skills/` folder |

After adding/removing a **kit** first-party skill, sync discovery links: `./scripts/sync-adsk.sh kit` (or `/sync-adsk`).

Optional thin Cursor command may invoke the skill; do not duplicate the playbook into the command body.
