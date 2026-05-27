import { Crawler } from "./Crawler.js"
// The crawler starts from one seed URL.
// It will only follow links on this exact hostname.

async function main() {

    const crawler = new Crawler(["https://crawlme.monzo.com/"]);

    // Limit the crawl so the program cannot run forever.
    await crawler.crawl(50);
}

main();