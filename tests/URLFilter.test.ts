import { describe, expect, it } from "vitest";
import { UrlFilter } from "../URLFilter.js"

describe("UrlFilter", () => {
  it("allows URLs on the same hostname", () => {
    const filter = new UrlFilter("crawlme.monzo.com");

    expect(filter.shouldVisit("https://crawlme.monzo.com/about.html")).toBe(true);
  });

  it("rejects external domains", () => {
    const filter = new UrlFilter("crawlme.monzo.com");

    expect(filter.shouldVisit("https://facebook.com")).toBe(false);
    expect(filter.shouldVisit("https://monzo.com")).toBe(false);
  });

  it("rejects different subdomains", () => {
    const filter = new UrlFilter("crawlme.monzo.com");

    expect(filter.shouldVisit("https://community.monzo.com")).toBe(false);
  });

  it("rejects non-http links", () => {
    const filter = new UrlFilter("crawlme.monzo.com");

    expect(filter.shouldVisit("mailto:test@example.com")).toBe(false);
    expect(filter.shouldVisit("tel:+441234567890")).toBe(false);
  });
});