import { exec } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { Router, Request, Response } from 'express';
import { Folder, NewVideoNotification, SortBy } from 'vtv-models';
import log from './log.js';

// If you use process.env in file, you must import dotenv and call config()
// For some reason the config() isn't singleton, so you can call it wherever you use process.env
import { config } from 'dotenv';
config();

const router = Router();
const { MEDAL_PATH, NEW_CLIP_PATH } = process.env;

export type MedalGetAllOptions = {
    friendGroup: string;
    game: string;
    sortBy?: SortBy;
};

router.get('/friendGroups', (req, res) => {
    // Get all friend groups
    const friendGroups = readdirSync(MEDAL_PATH).filter(file => !file.includes('.') && !file.includes('Launcher'));
    if (NEW_CLIP_PATH) friendGroups.push('New');
    log(req, `${friendGroups.length} friend groups found.`);

    res.status(200).json(friendGroups);
});

router.get('/friendGroups/:friendGroup/games', (req, res) => {
    // Extract request information
    const { friendGroup } = req.params;

    // Find the friend group as you can't trust client casing
    // If found, continue processing, else return 404
    const basePath = getCorrectBasePath(friendGroup);
    const path = getCorrectPath(req, res, basePath, basePath == MEDAL_PATH ? friendGroup : undefined);
    if (typeof path !== 'string') return path;
    log(req, `Processing path: ${path}`);

    const friendGroupFolder = (() => {
        if (basePath === NEW_CLIP_PATH) {
            const [folder, ...splitPath] = path.split('/').reverse();
            return processPath(splitPath.reverse().join('/'), [folder])
        }

        return processPath(path, readdirSync(path));
    })().filter(folder => folder instanceof Folder && folder.videos.length) as Folder[];

    log(req, `${friendGroupFolder.length} files found.`);
    res.status(200).json(Array.from(friendGroupFolder).map(folder => folder.name));
});

router.get('/friendGroups/:friendGroup/games/:game', (req, res) => {
    const path = getPath(req, res);
    if (typeof path !== 'string') return path;
    log(req, `Processing path: ${path}`);

    const files = readdirSync(path);
    const folder = processPath(path, files);
    log(req, `${folder.length} videos found.`);

    res.status(200).json(folder.sortBy(req.query.sortBy as SortBy));
});

router.get('/friendGroups/:friendGroup/games/:game/open', (req, res) => {
    const { path } = req.query;
    if (typeof path !== 'string') return res.status(400).json({ error: 'Invalid path.' });
    log(req, `Video path: ${path}`);

    exec(`start "" "${path}"`);
    res.status(200).json({ message: 'Opened folder.' });
});

router.get('/friendGroups/:friendGroup/games/:game/play', (req, res) => {
    const { path } = req.query;
    if (typeof path !== 'string') return res.status(400).json({ error: 'Invalid path.' });
    log(req, `Video path: ${path}`);

    // Open file in read mode
    exec(`start "" "${path}"`);
    res.status(200).json({ message: 'Opened video.' });
});

router.get('/new', (req, res) => {
    const files = readdirSync(NEW_CLIP_PATH);
    log(req, `${files.length} files found from ${NEW_CLIP_PATH}.`);

    const newClipsFolder = processPath(NEW_CLIP_PATH, files);
    res.status(200).json(newClipsFolder);
});

router.get('*', (req, res) => {
    res.status(404).json({ error: 'Invalid request.', url: req.originalUrl });
});

export default router;

function getPath(req: Request, res: Response): string | Response {
    // Extract request information
    const { friendGroup, game } = req.params;

    // Find the friend group and game as you can't trust client casing
    // If found, continue processing, else return 404
    const friendGroupPath = getCorrectPath(req, res,
        getCorrectBasePath(friendGroup),
        getCorrectBasePath(friendGroup) == MEDAL_PATH ? friendGroup : undefined
    );
    if (typeof friendGroupPath !== 'string') return friendGroupPath;

    return getCorrectPath(req, res, friendGroupPath, game);
}

function getCorrectPath(req: Request, res: Response, path: string, search?: string): string | Response {
    const result = search
        ? readdirSync(path).find(file => file.toLowerCase() === search.replace('%20', ' ').toLowerCase())
        : "";

    if (!search) return path;
    if (!result) return res.status(404).json({ error: `File "${search}" not found from ${path}.` });

    log(req, `File "${result}" found from ${search}.`);
    return `${path}/${result}`;
}

function processPath(path: string, files: Array<string>): Folder {
    path = path.replace('//', '/');
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
        if (file.match(/\.(mp4|mkv|mov)$/)) {
            const { size, birthtime: createdAt, mtime: modifiedAt } = statSync(filePath);
            const [extension, ...name] = file.split('.').reverse();
            console.log({ extension, name: name.join('.'), folder: folder.name });
            folder.push({
                name: name.reverse().join('.'),
                extension,
                size, createdAt, modifiedAt,
                path: filePath,
                folderPath: path
            });
        }
    }

    // Return the folder
    return folder;
}

function getCorrectBasePath(friendGroup: string) {
    return friendGroup.toLowerCase() === 'new' ? NEW_CLIP_PATH : MEDAL_PATH;
}