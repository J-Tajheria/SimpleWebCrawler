import { ContentParser } from "./ContentParser.js";
import { HtmlDownloader } from "./HTMLDownloader.js";
import { UrlFilter } from "./URLFilter.js";
import { UrlFrontier } from "./URLFrontier.js";
import { LinkExtractor } from "./LinkExtractor.js";
import { SeenStore } from "./SeenStore.js";

export class Crawler{
    private frontier: UrlFrontier;
    private urlFilter: UrlFilter;
    private downloader = new HtmlDownloader();
    private parser = new ContentParser();
    private linkExtractor = new LinkExtractor();

    // Tracks URLs that already been crawled.
    private seenUrls = new SeenStore();

    // Tracks URLs that have already been found and added to the frontier.
    // This prevents the same URL being queued multiple times before it is visited.
    private queuedUrls = new SeenStore();

    constructor(seedUrls: string[]){
        this.frontier = new UrlFrontier(seedUrls);

        // Seed URLs are already in the frontier, so mark them as queued.
        for (const seedUrl of seedUrls){
            this.queuedUrls.add(seedUrl);
        }

        // The crawler is restricted to the exact hostname of the first seed URL.
        const firstSeed = new URL(seedUrls[0]);
        this.urlFilter = new UrlFilter(firstSeed.hostname)
    }

    async crawl(maxPages: number): Promise<void> {
        let pagesVisited = 0;

        // Keep crawling while there are URLs waiting and the max page limit is not reached.
        while (!this.frontier.isEmpty() && pagesVisited < maxPages){
            const url = this.frontier.next()

            if(!url){
                continue;
            }

            // Skip URLs that have already been crawled.
            if(this.seenUrls.has(url)){
                continue;
            }

            this.seenUrls.add(url);

            console.log(`\nVisiting: ${url}`)

            const html = await this.downloader.download(url);

            if (!html){
                console.log("Could not download HTML")
                continue;
            }

            if(!this.parser.isValid(html)){
                console.log("Invalid HTML")
                continue;
            }

            // Extract and deduplicate links found on the current page.
            const links = this.linkExtractor.extract(html, url);
            const uniqueLinks = new Set(links);

            console.log("Links found:");

            if(uniqueLinks.size === 0){
                console.log("No links found")
            }

            for(const link of uniqueLinks){
                console.log(` -${link}`);

                // Do not follow links outside the allowed hostname.
                if (!this.urlFilter.shouldVisit(link)) {
                    continue;
                }

                // Do not recrawl URLs thatt havve already been visited.
                if (this.seenUrls.has(link)) {
                    continue;
                }

                // Do not add duplicate URLs to the frontier.
                if (this.queuedUrls.has(link)) {
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
