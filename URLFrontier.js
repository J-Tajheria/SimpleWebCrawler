/* It stores the URLs thaat still need to be visited.
    It will also support adding a URL
    getting the next URL
    checking if the list is empty.
*/
export class UrlFrontier {
    queue = [];
    constructor(seedUrls) {
        this.queue = [...seedUrls];
    }
    add(url) {
        this.queue.push(url);
    }
    next() {
        return this.queue.shift();
    }
    isEmpty() {
        return this.queue.length === 0;
    }
    size() {
        return this.queue.length;
    }
}
