import { readFileSync } from "node:fs";
import { join } from "node:path";
import type {
  OptionalPackDef,
  ProfileDef,
  ProfileId,
  ProfilesFile,
  RecommendedSkillEntry,
  RecommendedSkillsFile,
} from "./types.js";

const PROFILE_IDS: ProfileId[] = ["core", "delivery", "maintainer", "skills-only"];

export function isProfileId(value: string): value is ProfileId {
  return (PROFILE_IDS as string[]).includes(value);
}

export function listProfileIds(): ProfileId[] {
  return [...PROFILE_IDS];
}

export function loadProfiles(snapshotRoot: string): ProfilesFile {
  const raw = JSON.parse(
    readFileSync(join(snapshotRoot, "profiles.json"), "utf8"),
  ) as ProfilesFile;
  for (const id of PROFILE_IDS) {
    if (!raw.profiles?.[id]) {
      throw new Error(`profiles.json missing profile: ${id}`);
    }
  }
  if (!Array.isArray(raw.optional_packs?.packs)) {
    throw new Error("profiles.json optional_packs.packs must be an array");
  }
  return raw;
}

export function getProfile(profiles: ProfilesFile, id: ProfileId): ProfileDef {
  const def = profiles.profiles[id];
  if (!def) throw new Error(`Unknown profile: ${id}`);
  return def;
}

export function listOptionalPackIds(profiles: ProfilesFile): string[] {
  return profiles.optional_packs.packs.map((p) => p.id);
}

export function getOptionalPack(
  profiles: ProfilesFile,
  id: string,
): OptionalPackDef {
  const pack = profiles.optional_packs.packs.find((p) => p.id === id);
  if (!pack) {
    throw new Error(
      `Unknown pack "${id}". Expected: ${listOptionalPackIds(profiles).join(", ")}`,
    );
  }
  return pack;
}

export function expandPackIdsToEntryIds(
  profiles: ProfilesFile,
  packIds: string[],
): string[] {
  const entries: string[] = [];
  for (const packId of packIds) {
    const pack = getOptionalPack(profiles, packId);
    for (const entryId of pack.entry_ids) {
      if (!entries.includes(entryId)) entries.push(entryId);
    }
  }
  return entries;
}

/** Parse `--packs a,b` into validated pack IDs. */
export function parsePackIdsFlag(
  raw: string,
  profiles: ProfilesFile,
): string[] {
  const ids = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const known = new Set(listOptionalPackIds(profiles));
  for (const id of ids) {
    if (!known.has(id)) {
      throw new Error(
        `Unknown pack "${id}". Expected: ${[...known].join(", ")}`,
      );
    }
  }
  return ids;
}

export interface PackSelectionOpts {
  yes: boolean;
  withOptionalPacks: boolean;
  /** Explicit pack IDs from --packs (takes precedence over withOptionalPacks). */
  packs?: string[];
}

/** Non-interactive pack resolution. Interactive path lives in init.ts. */
export function resolvePackSelection(
  opts: PackSelectionOpts,
  profiles: ProfilesFile,
): string[] {
  if (opts.packs !== undefined) {
    return [...opts.packs];
  }
  if (opts.withOptionalPacks) {
    return listOptionalPackIds(profiles);
  }
  return [];
}

export function loadRecommendedSkills(
  snapshotRoot: string,
): RecommendedSkillsFile {
  return JSON.parse(
    readFileSync(join(snapshotRoot, "recommended-skills.json"), "utf8"),
  ) as RecommendedSkillsFile;
}

export function findOptionalPack(
  recommended: RecommendedSkillsFile,
  id: string,
): RecommendedSkillEntry | undefined {
  const pools = [
    ...(recommended.optional ?? []),
    ...(recommended.recommended ?? []),
  ];
  return pools.find((e) => e.id === id);
}
