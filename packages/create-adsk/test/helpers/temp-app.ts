import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach } from "vitest";
import { getSnapshotRoot } from "../../src/snapshot.js";

const temps: string[] = [];

afterEach(() => {
  while (temps.length) {
    const t = temps.pop();
    if (t) rmSync(t, { recursive: true, force: true });
  }
});

export function makeTempApp(): string {
  const dir = mkdtempSync(join(tmpdir(), "create-adsk-"));
  temps.push(dir);
  return dir;
}

export function snapshotRoot(): string {
  return getSnapshotRoot();
}
