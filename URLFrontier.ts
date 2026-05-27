/* It stores the URLs that still need to be visited.
    It will also support adding a URL
    getting the next URL
    checking if the list is empty.
*/
export class UrlFrontier{
    private queue: string[] = [];

    constructor(seedUrls: string[]){
        // Start the queue with the initial URLs provided by the user.
        this.queue = [...seedUrls]
    }

    add(url: string) {
        // Add a newly discovered URL to the back of the queue.
        this.queue.push(url);
    }

    next(): string | undefined{
        // Remove and return the next URL to crawl.
        return this.queue.shift();
    }

    isEmpty(): boolean{
        return this.queue.length === 0;
    }

    size(): number{
        return this.queue.length;
    }
}

