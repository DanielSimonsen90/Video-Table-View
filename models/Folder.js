export default class Folder extends Array {
    constructor(path) {
        super();
        this.path = path;
    }
    get name() {
        return this.path.split('/').pop();
    }
    sortByDate() {
        return this.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
    sortByName() {
        return this.sort((a, b) => a.name.localeCompare(b.name));
    }
    sortBy(sortBy) {
        switch (sortBy) {
            case 'date': return this.sortByDate();
            case 'name': return this.sortByName();
            default: return this;
        }
    }
}
