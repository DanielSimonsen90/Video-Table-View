import { Router } from "express";
import { readdirSync } from 'fs';
import { exec } from 'child_process';

import { Folder, SortBy } from "vtv-models";

import { getCorrectBasePath, getCorrectPath, getPath, processPath } from "./helpers";
import { log, useEnv } from '../../helpers.js';

const { MEDAL_PATH, NEW_CLIP_PATH } = useEnv();

// /friendGroups
export default function (router: Router) {
  router.get('/', (req, res) => {
    // Get all friend groups
    const friendGroups = readdirSync(MEDAL_PATH).filter(file => !file.includes('.') && !file.includes('Launcher'));
    if (NEW_CLIP_PATH) friendGroups.push('New');
    log(req, `${friendGroups.length} friend groups found.`);

    res.status(200).json(friendGroups);
  });

  router.get('/:friendGroup/games', (req, res) => {
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
        return processPath(splitPath.reverse().join('/'), [folder]);
      }

      return processPath(path, readdirSync(path));
    })().filter(folder => folder instanceof Folder && folder.videos.length) as Folder[];

    log(req, `${friendGroupFolder.length} files found.`);
    res.status(200).json(Array.from(friendGroupFolder).map(folder => folder.name));
  });

  router.get('/:friendGroup/games/:game', (req, res) => {
    const path = getPath(req, res);
    if (typeof path !== 'string') return path;
    log(req, `Processing path: ${path}`);

    const files = readdirSync(path);
    const folder = processPath(path, files);
    log(req, `${folder.length} videos found.`);

    res.status(200).json(folder.sortBy(req.query.sortBy as SortBy));
  });

  router.get('/:friendGroup/games/:game/open', (req, res) => {
    const { path } = req.query;
    if (typeof path !== 'string') return res.status(400).json({ error: 'Invalid path.' });
    log(req, `Video path: ${path}`);

    exec(`start "" "${path}"`);
    res.status(200).json({ message: 'Opened folder.' });
  });

  router.get('/:friendGroup/games/:game/play', (req, res) => {
    const { path } = req.query;
    if (typeof path !== 'string') return res.status(400).json({ error: 'Invalid path.' });
    log(req, `Video path: ${path}`);

    // Open file in read mode
    exec(`start "" "${path}"`);
    res.status(200).json({ message: 'Opened video.' });
  });

  return router;
}