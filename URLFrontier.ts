/* It stores the URLs thaat still need to be visited.
    It will also support adding a URL
    getting the next URL
    checking if the list is empty.
*/
class URLFrontier{
    private queue: string[] = [];

    constructor(seedUrls: string[]){
        this.queue = [...seedUrls]
    }

    add(url: string) {
        this.queue.push(url);
    }

    next(): string | undefined{
        return this.queue.shift();
    }

    isEmpty(): boolean{
        return this.queue.length === 0;
    }

    size(): number{
        return this.queue.length;
    }
}

const frontier = new URLFrontier(['https://crawlme.monzo.com/*']);
