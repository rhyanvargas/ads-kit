export type ProfileId = "core" | "delivery" | "maintainer" | "skills-only";
export type CursorMode = "commands" | "none";
export type RulesMode = "stock" | "none";
export type Scope = "project" | "global";

export interface ProfileDef {
  description: string;
  skills: string[];
  cursor: CursorMode;
  rules: RulesMode;
}

export interface ProfilesFile {
  version: number;
  product: string;
  kit_source: string;
  profiles: Record<ProfileId, ProfileDef>;
  optional_packs: {
    prompt_default: boolean;
    description: string;
    ids: string[];
    source_file: string;
    docs: string;
  };
  config_marker: {
    path: string;
    fields: string[];
  };
}

export interface AdskConfig {
  version: 1;
  profile: ProfileId;
  cursor: CursorMode;
  rules: RulesMode;
  scope: Scope;
  kitRef: string;
  optionalPacks: string[];
}

export interface RecommendedSkillEntry {
  id: string;
  install?: string;
  install_global?: string;
}

export interface RecommendedSkillsFile {
  optional?: RecommendedSkillEntry[];
  recommended?: RecommendedSkillEntry[];
}
