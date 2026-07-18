/**
 * Port of sync-adsk.sh translate_command_body.
 * Rewrites bare skills/<name> → .agents/skills/<name> without matching
 * the substring inside .agents/skills/<name>.
 */
export function rewriteCommandBody(body: string, skillNames: string[]): string {
  let out = body;
  for (const name of skillNames) {
    const re = new RegExp(`(^|[^/])skills/${escapeRegExp(name)}`, "g");
    out = out.replace(re, `$1.agents/skills/${name}`);
  }
  out = out.replace(
    / \(or \.agents\/skills\/skill-optimizer in adopter apps\)/g,
    "",
  );
  return out;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
