import { readFileSync } from "node:fs";
import { join } from "node:path";
import type {
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
  return raw;
}

export function getProfile(profiles: ProfilesFile, id: ProfileId): ProfileDef {
  const def = profiles.profiles[id];
  if (!def) throw new Error(`Unknown profile: ${id}`);
  return def;
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
