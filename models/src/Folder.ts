import Video from './Video.js';
import type { Stats } from 'fs';

export type SortBy = 'date' | 'name';

export class Folder extends Array<Video | Folder> {
    constructor()
    constructor(path: string, stats: Stats)
    constructor(path: string, createdAt: Date)
    constructor(path?: string, option?: Stats | Date) {
        super();

        if (path && option) {
            this.path = path;
            this.name = path.split('/').pop() ?? path;
            this.createdAt = option instanceof Date 
                ? option 
                : option.birthtime;

        }
    }

    public readonly path: string;
    public readonly name: string;
    public readonly createdAt: Date;

    public get folders(): Folder[] {
        return this.filter(item => item instanceof Folder) as Folder[];
    }
    public get videos(): Video[] {
        return this.filter(item => !(item instanceof Folder)) as Video[];
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

    public toJSON() {
        try {
            return {
                name: this.name,
                createdAt: this.createdAt,
                path: this.path,
                folders: [...this.folders],
                videos: [...this.videos]
            };
        } catch (error) {
            console.error(error);
            return {}
        }
    }
}

export default Folder;