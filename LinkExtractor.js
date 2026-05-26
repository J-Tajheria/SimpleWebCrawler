// This component finds links inside the page. It should also convert relative links into full URLs.
export class LinkExtractor {
    extract(html, baseUrl) {
        const links = [];
        const regex = /href=["']([^"']+)["']/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
            try {
                const absoluteUrl = new URL(match[1], baseUrl).toString();
                links.push(absoluteUrl);
            }
            catch {
                continue;
            }
        }
        return links;
    }
}
