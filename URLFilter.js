// The filter decides which links are allowed.
export class UrlFilter {
    allowedHost;
    constructor(allowedHost) {
        this.allowedHost = allowedHost;
    }
    shouldVisit(url) {
        try {
            const parsed = new URL(url);
            const isHttp = parsed.protocol === "http" || parsed.protocol === "https";
            const isSameHostname = parsed.hostname === this.allowedHost;
            return isHttp && isSameHostname;
        }
        catch {
            return false;
        }
    }
}
