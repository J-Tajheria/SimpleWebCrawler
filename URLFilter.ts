// The filter decides which links are allowed.
export class UrlFilter {
    constructor(private allowedHostname: string) {}
  
    shouldVisit(url: string): boolean {
      try {
        const parsedUrl = new URL(url);
  
        const isHttp = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        const isSameHostname = parsedUrl.hostname === this.allowedHostname;
  
        return isHttp && isSameHostname;
      } catch {
        return false;
      }
    }
  }