import { readdirSync, statSync } from 'fs';
import Folder, { SortBy } from '../models/Folder.js';

const { MEDAL_PATH } = process.env;

export type MedalGetAllOptions = {
    friendGroup: string;
    game: string;
    sortBy?: SortBy;
}

export function getAll(options: MedalGetAllOptions): Folder {
    const { friendGroup, game, sortBy } = options;
    const path = `${MEDAL_PATH}/${friendGroup}/${game}`;

    const files = readdirSync(path);
    const folder = processPath(path, files);
    return folder.sortBy(sortBy);
}

export const Medal = {
    getAll,
}
export default Medal;

function processPath(path: string, files: Array<string>): Folder {
    const videos = new Folder(path);

    for (const file of files) {
        const filePath = `${path}/${file}`;

        if (!file.includes('.')) {
            videos.push(...processPath(
                filePath, 
                readdirSync(filePath)
            ));
        }

        if (file.includes('.mp4')) {
            const info = statSync(filePath);
            videos.push({
                name: file,
                path: filePath,
                extension: file.split('.').pop(),
                size: info.size,
                createdAt: info.birthtime,
                modifiedAt: info.mtime,
            });
        }
    }

    return videos;
}