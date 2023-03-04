import Video from './Video.js';

export type SortBy = 'date' | 'name' | string;

export default class Folder extends Array<Video> {
    constructor(public path: string) {
        super();
    }

    get name(): string {
        return this.path.split('/').pop();
    }

    public sortByDate(): this {
        return this.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
    public sortByName(): this {
        return this.sort((a, b) => a.name.localeCompare(b.name));
    }

    public sortBy(sortBy: SortBy): this {
        switch (sortBy) {
            case 'date': return this.sortByDate();
            case 'name': return this.sortByName();
            default: return this;
        }
    }
}