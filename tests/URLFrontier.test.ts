import { describe, expect, it } from "vitest";
import { UrlFrontier } from "../URLFrontier.js";

describe("UrlFrontier", () => {
    it("starts with seed URLs", () => {
        const frontier = new UrlFrontier(["https://crawlme.monzo.com/"])

        expect(frontier.size()).toBe(1);
    });

    it("returns URLs in queue order", () => {
        const frontier = new UrlFrontier(["https://a.com", "https://b.com"]);
    
        expect(frontier.next()).toBe("https://a.com");
        expect(frontier.next()).toBe("https://b.com");
      });

    it("adds new URLs", () => {
        const frontier = new UrlFrontier([]);

        frontier.add("https://crawlme.monzo.com/about.html");

        expect(frontier.size()).toBe(1);
        expect(frontier.next()).toBe("https://crawlme.monzo.com/about.html");
    });
    
    it("knows when empty", () => {
        const frontier = new UrlFrontier([]);
    
        expect(frontier.isEmpty()).toBe(true);
    });
})