import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

/** Resolve vendored kit-snapshot/ (next to dist/ or package root). */
export function getSnapshotRoot(override?: string): string {
  if (override) return override;
  const candidates = [
    join(HERE, "..", "kit-snapshot"),
    join(HERE, "kit-snapshot"),
  ];
  for (const c of candidates) {
    if (existsSync(join(c, "profiles.json"))) return c;
  }
  throw new Error(
    `kit-snapshot not found (looked in ${candidates.join(", ")}). Run scripts/prepare-create-adsk-snapshot.sh`,
  );
}

export function readKitRef(snapshotRoot: string): string {
  const p = join(snapshotRoot, "KIT_REF");
  if (!existsSync(p)) return "unknown";
  return readFileSync(p, "utf8").trim() || "unknown";
}
