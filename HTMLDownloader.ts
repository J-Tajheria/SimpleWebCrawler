// This takes the URL and downloads the page.
export class HtmlDownloader {
    async download(url: string): Promise<string | null> {
        try{
            const response = await fetch(url);

            // Skip unsuccessful HTTP responses such as 404 or 500.
            if(!response.ok){
                return null;
            }

            const contentType = response.headers.get("content-type") ?? "";

            // Only process HTML pages.
            if(!contentType.includes("text/html")){
                return null;
            }

            return await response.text();

        } catch{
            // Any network failures should not crash the crawler.
            return null;
        }
    }
}