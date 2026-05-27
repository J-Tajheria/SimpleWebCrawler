// This component finds links inside the page. It should also convert relative links into full URLs.
export class LinkExtractor {
    extract(html: string, baseUrl: string): string[]{
        const links: string[] = [];

        // Finds href attributes in anchor tags.
        const regex = /href=["']([^"']+)["']/g;

        let match: RegExpExecArray | null;

        while((match = regex.exec(html)) !== null){
            try{
                // Convert relative URLs into absolute URLs.
                const absoluteUrl = new URL(match[1], baseUrl).toString();
                links.push(absoluteUrl);
            } catch{
                // Ignore malformed href values.
                continue;
            }
        }
        return links;
    }
}