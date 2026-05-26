/* The parser reads the downloaded HTML and turns it into something easier to inspect.
    Is this valid HTML?
    Can I extract useful data from it?
    Can I find links inside it?
*/
export class ContentParser {
    parse(html) {
        return html;
    }
    isValid(html) {
        return html.trim().length > 0;
    }
}
