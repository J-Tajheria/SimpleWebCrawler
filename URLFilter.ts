// The filter decides which links are allowed.
export class UrlFilter{
    constructor(private allowedHost: string){}

    shouldVisit(url: string): boolean {
        try{
            const parsed = new URL(url);

            const isHttp = parsed.protocol === "http" || parsed.protocol === "https";
            const isSameHostname = parsed.hostname === this.allowedHost;

            return isHttp && isSameHostname;
        } catch{
            return false;
        }
    }
}