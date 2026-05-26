import { Crawler } from "./Crawler.js";
async function main() {
    const crawler = new Crawler(["https://crawlme.monzo.com/"]);
    await crawler.crawl(10);
}
main();
