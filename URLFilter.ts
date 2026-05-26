// The filter decides which links are allowed.
export class UrlFilter{
    constructor(private allowedHost: string){}

    shouldVisit(url: string): boolean {
        try{
            const parsed = new URL(url);

            if (parsed.protocol !== "http:" && parsed.protocol !== "https:"){
                return false;
            }

            if(parsed.hostname !== this.allowedHost){
                return false
            }

            return true;
        } catch{
            return false;
        }
    }
}