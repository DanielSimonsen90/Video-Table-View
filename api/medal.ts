import { Router } from 'express';
import { readdirSync, statSync } from 'fs';
import Folder from '../models/Folder.js';

const { MEDAL_PATH } = process.env;
const Route = '/:friendGroup/:game';
const router = Router();

router.get(Route, (req, res) => {
    console.log('GET', Route);
    const { friendGroup, game } = req.params;
    const { sortBy } = req.query;

    const path = `${MEDAL_PATH}/${friendGroup}/${game}`;

    const files = readdirSync(path);
    const folder = processPath(path, files);

    return res.status(200).json(
        typeof sortBy === 'string' 
            ? folder.sortBy(sortBy) 
            : folder
    );
});

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

export default router;