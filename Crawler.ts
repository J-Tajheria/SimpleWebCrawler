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
    private seenUrls = new SeenStore();
    private queuedUrls = new SeenStore();

    constructor(seedUrls: string[]){
        this.frontier = new UrlFrontier(seedUrls);

        for (const seedUrl of seedUrls){
            this.queuedUrls.add(seedUrl);
        }

        const firstSeed = new URL(seedUrls[0]);
        this.urlFilter = new UrlFilter(firstSeed.hostname)
    }

    async crawl(maxPages: number): Promise<void> {
        let pagesVisited = 0;

        while (!this.frontier.isEmpty() && pagesVisited < maxPages){
            const url = this.frontier.next()

            if(!url){
                continue;
            }

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

            const links = this.linkExtractor.extract(html, url);

            console.log("Links found:");

            if(links.length === 0){
                console.log("No links found")
            }

            const uniqueLinks = new Set();

            for(const link of links){

                if(uniqueLinks.has(link)){
                    continue;
                }

                uniqueLinks.add(link);
                
                console.log(` -${link}`);
                
                if (!this.urlFilter.shouldVisit(link)) {
                    continue;
                }
                
                if (this.seenUrls.has(link)) {
                continue;
                }

                if (this.queuedUrls.has(link)) {
                    continue;
                }
          
                this.queuedUrls.add(link);
                this.frontier.add(link);
            }

            pagesVisited++;
        }
    }
}
