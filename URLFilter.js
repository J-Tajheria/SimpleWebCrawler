// The filter decides which links are allowed.
export class UrlFilter {
    allowedHostname;
    constructor(allowedHostname) {
        this.allowedHostname = allowedHostname;
    }
    shouldVisit(url) {
        try {
            const parsedUrl = new URL(url);
            const isHttp = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
            const isSameHostname = parsedUrl.hostname === this.allowedHostname;
            return isHttp && isSameHostname;
        }
        catch {
            return false;
        }
    }
}
