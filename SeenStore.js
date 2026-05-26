// This will track seen URLs
export class SeenStore {
    seen = new Set();
    has(value) {
        return this.seen.has(value);
    }
    add(value) {
        this.seen.add(value);
    }
}
