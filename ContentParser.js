/* 
* The ContentParser class is responsible for processing and validating HTML content.
* It provides methods to parse the HTML and check if the content is valid.
*/
export class ContentParser {
    parse(html) {
        return html;
    }
    isValid(html) {
        return html.trim().length > 0;
    }
}
