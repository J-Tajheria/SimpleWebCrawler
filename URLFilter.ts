// This class decides which links are allowed.
export class UrlFilter {
    constructor(private allowedHostname: string) {}
  
    shouldVisit(url: string): boolean {
      try {
        const parsedUrl = new URL(url);
  
        // Only crawl normal web links.
        const isHttp = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        
        // Restrict crawling to the exact hostname of the seed URL.
        // This allows for "crawlme.monzo.com", but will reject "monzo.com" and "community.monzo.com"
        const isSameHostname = parsedUrl.hostname === this.allowedHostname;
  
        return isHttp && isSameHostname;
      } catch {
        //  Invalid URLs should not be crawled.
        return false;
      }
    }
  }