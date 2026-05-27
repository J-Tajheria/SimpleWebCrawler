import { describe, expect, it } from "vitest";
import { SeenStore } from "../SeenStore.js";
import { UrlFrontier } from "../URLFrontier.js";

describe("SeenStore", () => {
  it("starts empty", () => {
    const store = new SeenStore();

    expect(store.has("https://crawlme.monzo.com/")).toBe(false);
  });

  it("tracks added values", () => {
    const store = new SeenStore();

    store.add("https://crawlme.monzo.com/");

    expect(store.has("https://crawlme.monzo.com/")).toBe(true);
  });

  it("does not duplicate values", () => {
    const store = new SeenStore();
    
    store.add("https://crawlme.monzo.com/");
    store.add("https://crawlme.monzo.com/");

    expect(store.size()).toBe(1);
  });
});