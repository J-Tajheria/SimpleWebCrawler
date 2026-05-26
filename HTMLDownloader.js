// This takes the URL and downloads the page.
export class HtmlDownloader {
    async download(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                return null;
            }
            const contentType = response.headers.get("content-type") ?? "";
            if (!contentType.includes("text/html")) {
                return null;
            }
            return await response.text();
        }
        catch {
            return null;
        }
    }
}
