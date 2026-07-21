import { describe, expect, it } from "vitest";
import {
  expandPackIdsToEntryIds,
  listOptionalPackIds,
  loadProfiles,
  parsePackIdsFlag,
  resolvePackSelection,
} from "../src/profiles.js";
import { snapshotRoot } from "./helpers/temp-app.js";

describe("optional packs (profile depth × methodology)", () => {
  it("profiles.json lists product-value-loop and engineering-methods packs", () => {
    const profiles = loadProfiles(snapshotRoot());
    const ids = listOptionalPackIds(profiles);
    expect(ids).toEqual(["product-value-loop", "engineering-methods"]);
    const eng = profiles.optional_packs.packs.find(
      (p) => p.id === "engineering-methods",
    );
    expect(eng?.entry_ids).toEqual(["engineering-methods"]);
    expect(eng?.docs).toBe("docs/engineering-methods.md");
  });

  it("expandPackIdsToEntryIds flattens pack → recommended-skills entry ids", () => {
    const profiles = loadProfiles(snapshotRoot());
    expect(expandPackIdsToEntryIds(profiles, ["engineering-methods"])).toEqual([
      "engineering-methods",
    ]);
    expect(expandPackIdsToEntryIds(profiles, ["product-value-loop"])).toEqual([
      "product-value-loop-wondelai",
      "product-value-loop-deanpeters",
      "competitive-intelligence",
    ]);
  });

  it("parsePackIdsFlag splits comma list and rejects unknown ids", () => {
    const profiles = loadProfiles(snapshotRoot());
    expect(parsePackIdsFlag("engineering-methods", profiles)).toEqual([
      "engineering-methods",
    ]);
    expect(
      parsePackIdsFlag("product-value-loop, engineering-methods", profiles),
    ).toEqual(["product-value-loop", "engineering-methods"]);
    expect(() => parsePackIdsFlag("not-a-pack", profiles)).toThrow(/Unknown pack/);
  });

  it("resolvePackSelection: --yes defaults to none; --with-optional-packs = all; --packs wins", () => {
    const profiles = loadProfiles(snapshotRoot());
    expect(
      resolvePackSelection(
        { yes: true, withOptionalPacks: false, packs: undefined },
        profiles,
      ),
    ).toEqual([]);
    expect(
      resolvePackSelection(
        { yes: true, withOptionalPacks: true, packs: undefined },
        profiles,
      ),
    ).toEqual(["product-value-loop", "engineering-methods"]);
    expect(
      resolvePackSelection(
        {
          yes: true,
          withOptionalPacks: true,
          packs: ["engineering-methods"],
        },
        profiles,
      ),
    ).toEqual(["engineering-methods"]);
  });
});
