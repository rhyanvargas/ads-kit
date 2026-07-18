import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { AdskConfig } from "./types.js";
import { isProfileId } from "./profiles.js";

export const CONFIG_REL_PATH = ".adsk/config.json";

export function configPath(appRoot: string): string {
  return join(appRoot, CONFIG_REL_PATH);
}

export function writeConfig(appRoot: string, cfg: AdskConfig): void {
  const path = configPath(appRoot);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(cfg, null, 2)}\n`, "utf8");
}

export function readConfig(appRoot: string): AdskConfig | null {
  const path = configPath(appRoot);
  if (!existsSync(path)) return null;
  const raw = JSON.parse(readFileSync(path, "utf8")) as Partial<AdskConfig>;
  return validateConfig(raw);
}

function validateConfig(raw: Partial<AdskConfig>): AdskConfig {
  if (raw.version !== 1) throw new Error("Invalid .adsk/config.json: version must be 1");
  if (!raw.profile || !isProfileId(raw.profile)) {
    throw new Error("Invalid .adsk/config.json: missing/invalid profile");
  }
  if (raw.cursor !== "commands" && raw.cursor !== "none") {
    throw new Error("Invalid .adsk/config.json: cursor must be commands|none");
  }
  if (raw.rules !== "stock" && raw.rules !== "none") {
    throw new Error("Invalid .adsk/config.json: rules must be stock|none");
  }
  if (raw.scope !== "project" && raw.scope !== "global") {
    throw new Error("Invalid .adsk/config.json: scope must be project|global");
  }
  if (typeof raw.kitRef !== "string" || !raw.kitRef) {
    throw new Error("Invalid .adsk/config.json: kitRef required");
  }
  if (!Array.isArray(raw.optionalPacks)) {
    throw new Error("Invalid .adsk/config.json: optionalPacks must be an array");
  }
  return {
    version: 1,
    profile: raw.profile,
    cursor: raw.cursor,
    rules: raw.rules,
    scope: raw.scope,
    kitRef: raw.kitRef,
    optionalPacks: raw.optionalPacks.map(String),
  };
}
