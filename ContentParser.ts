/* 
* The ContentParser class is responsible for processing and validating HTML content.
* It provides methods to parse the HTML and check if the content is valid.
*/

export class ContentParser {
    parse(html: string): string{
        return html;
    }
    
    // For this simple crawler, consider a page valid if it has non-empty HTML
    isValid(html: string): boolean{
        return html.trim().length > 0;
    }
}