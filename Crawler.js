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
    constructor(seedUrls) {
        this.frontier = new UrlFrontier(seedUrls);
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
            console.log(`Visiting: ${url}`);
            const html = await this.downloader.download(url);
            if (!html) {
                continue;
            }
            if (!this.parser.isValid(html)) {
                continue;
            }
            const links = this.linkExtractor.extract(html, url);
            for (const link of links) {
                if (!this.urlFilter.shouldVisit(link)) {
                    continue;
                }
                if (this.seenUrls.has(link)) {
                    continue;
                }
                this.frontier.add(link);
            }
            pagesVisited++;
        }
    }
}
