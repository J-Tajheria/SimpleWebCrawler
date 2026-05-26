// This will track seen URLs
export class SeenStore{
    private seen = new Set<string>();

    has(value: string): boolean{
        return this.seen.has(value);
    }

    add(value: string): void{
        this.seen.add(value);
    }
}