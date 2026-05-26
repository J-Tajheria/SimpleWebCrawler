import { ContentParser } from "./ContentParser.js";
import { HtmlDownloader } from "./HTMLDownloader.js";
import { UrlFilter } from "./URLFilter.js";
import { UrlFrontier } from "./URLFrontier.js";
import { LinkExtractor } from "./LinkExtractor.js";
import { SeenStore } from "./SeenStore.js";
export class Crawler {
    frontier;
    urlFilter;
    downloader = new HtmlDownloader();
    parser = new ContentParser();
    linkExtractor = new LinkExtractor();
    seenUrls = new SeenStore();
    queuedUrls = new SeenStore();
    constructor(seedUrls) {
        this.frontier = new UrlFrontier(seedUrls);
        for (const seedUrl of seedUrls) {
            this.queuedUrls.add(seedUrl);
        }
        const firstSeed = new URL(seedUrls[0]);
        this.urlFilter = new UrlFilter(firstSeed.hostname);
    }
    async crawl(maxPages) {
        let pagesVisited = 0;
        while (!this.frontier.isEmpty() && pagesVisited < maxPages) {
            const url = this.frontier.next();
            if (!url) {
                continue;
            }
            if (this.seenUrls.has(url)) {
                continue;
            }
            this.seenUrls.add(url);
            console.log(`\nVisiting: ${url}`);
            const html = await this.downloader.download(url);
            if (!html) {
                console.log("Could not download HTML");
                continue;
            }
            if (!this.parser.isValid(html)) {
                console.log("Invalid HTML");
                continue;
            }
            const links = this.linkExtractor.extract(html, url);
            const uniqueLinks = new Set(links);
            console.log("Links found:");
            if (uniqueLinks.size === 0) {
                console.log("No links found");
            }
            for (const link of uniqueLinks) {
                console.log(` -${link}`);
                if (!this.urlFilter.shouldVisit(link)) {
                    console.log(`  Skipped : outside allowed hostname`);
                    continue;
                }
                if (this.seenUrls.has(link)) {
                    console.log(`  Skipped already visited: ${link}`);
                    continue;
                }
                if (this.queuedUrls.has(link)) {
                    console.log(`  Skipped already queued: ${link}`);
                    continue;
                }
                this.queuedUrls.add(link);
                this.frontier.add(link);
                console.log(`  Queued: ${link}`);
            }
            console.log(`Frontier size after page: ${this.frontier.size()}`);
            pagesVisited++;
        }
    }
}
