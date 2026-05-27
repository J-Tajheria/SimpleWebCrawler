import { describe, expect, it } from "vitest";
import { LinkExtractor } from "../LinkExtractor.js";

describe("LinkExtractor", () => {
  it("extracts absolute links", () => {
    const extractor = new LinkExtractor();

    const html = `<a href="https://crawlme.monzo.com/about.html">About</a>`;

    expect(extractor.extract(html, "https://crawlme.monzo.com/")).toEqual([
      "https://crawlme.monzo.com/about.html",
    ]);
  });

  it("converts relative links to absolute URLs", () => {
    const extractor = new LinkExtractor();

    const html = `<a href="/about.html">About</a>`;

    expect(extractor.extract(html, "https://crawlme.monzo.com/")).toEqual([
      "https://crawlme.monzo.com/about.html",
    ]);
  });

  it("handles multiple links", () => {
    const extractor = new LinkExtractor();

    const html = `
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
    `;

    expect(extractor.extract(html, "https://crawlme.monzo.com/")).toEqual([
      "https://crawlme.monzo.com/about.html",
      "https://crawlme.monzo.com/contact.html",
    ]);
  });
});