import { readdirSync, statSync } from 'fs';
import { Router } from 'express';
import { Folder, SortBy } from 'vtv-models'
import log from './log.js';

// If you use process.env in file, you must import dotenv and call config()
// For some reason the config() isn't singleton, so you can call it wherever you use process.env
import { config } from 'dotenv';
config();

const router = Router();
const { MEDAL_PATH } = process.env;

export type MedalGetAllOptions = {
    friendGroup: string;
    game: string;
    sortBy?: SortBy;
}

router.get('/friendGroups', (req, res) => {
    // Get all friend groups
    const friendGroups = readdirSync(MEDAL_PATH).filter(file => !file.includes('.') && !file.includes('Launcher'));
    log(req, `${friendGroups.length} friend groups found.`)

    res.status(200).json(friendGroups);
});

router.get('/:friendGroup', (req, res) => {
    // Extract request information
    const { friendGroup } = req.params;

    // Find the friend group as you can't trust client casing
    // If found, continue processing, else return 404
    const friendGroupPath = readdirSync(MEDAL_PATH).find(file => file.toLowerCase() === friendGroup.toLowerCase());
    if (!friendGroupPath) return res.status(404).json({ error: `Friend group "${friendGroup}" not found.` });
    log(req, `Friend group "${friendGroupPath}" found from ${friendGroup}.`)

    // Process the path and return the folder
    const path = `${MEDAL_PATH}/${friendGroupPath}`;
    log(req, `Processing path: ${path}`)

    const files = readdirSync(path);
    log(req, `${files.length} files found.`)
    res.status(200).json(files);
});

router.get('/:friendGroup/:game', (req, res) => {
    // Extract request information
    const { friendGroup, game } = req.params;
    const { sortBy } = req.query;

    // Find the friend group and game as you can't trust client casing
    // If found, continue processing, else return 404
    const friendGroupPath = readdirSync(MEDAL_PATH).find(file => file.toLowerCase() === friendGroup.toLowerCase());
    if (!friendGroupPath) return res.status(404).json({ error: `Friend group "${friendGroup}" not found.` });
    log(req, `Friend group "${friendGroupPath}" found from ${friendGroup}.`)

    const gamePath = readdirSync(`${MEDAL_PATH}/${friendGroupPath}`).find(file => file.toLowerCase() === game.toLowerCase());
    if (!gamePath) return res.status(404).json({ error: `Game "${game}" not found.` });
    log(req, `Game "${gamePath}" found from ${game}.`)

    // Process the path and return the folder
    const path = `${MEDAL_PATH}/${friendGroupPath}/${gamePath}`;
    log(req, `Processing path: ${path}`)

    const files = readdirSync(path);
    const folder = processPath(path, files);
    log(req, `${folder.length} videos found.`)

    res.status(200).json(folder.sortBy(sortBy as SortBy));
});

router.get('*', (req, res) => {
    res.status(404).json({ error: 'Invalid request.', url: req.originalUrl });
})

export default router;

function processPath(path: string, files: Array<string>): Folder {
    // Create folder result
    const stats = statSync(path);
    const folder = new Folder(path, stats);

    for (const file of files) {
        const filePath = `${path}/${file}`;

        // If the file is a folder, process it
        if (!file.includes('.')) {
            folder.push(processPath(
                filePath, 
                readdirSync(filePath)
            ));
        }

        // If the file is a video, add it to the folder
        if (file.includes('.mp4')) {
            const { size, birthtime: createdAt, mtime: modifiedAt } = statSync(filePath);
            const [name, extension] = file.split('.');
            folder.push({
                name, extension, 
                size, createdAt, modifiedAt,
                path: filePath,
                folderPath: path
            });
        }
    }

    // Return the folder
    return folder;
}