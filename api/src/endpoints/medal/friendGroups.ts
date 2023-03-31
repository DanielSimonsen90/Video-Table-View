import { Router } from "express";
import { readdirSync, statSync } from 'fs';

import type { SortBy } from "vtv-models";

import { getCorrectPath, getPath, processPath } from "./helpers.js";
import { log, useEnv } from '../../helpers.js';

const { MEDAL_PATH } = useEnv();

// /friendGroups
export default function (router: Router) {
  router.get('/', (req, res) => {
    // Get all friend groups
    const friendGroups = readdirSync(MEDAL_PATH).filter(file => !file.includes('.') && !file.includes('Launcher'));
    log(req, `${friendGroups.length} friend groups found.`);

    res.status(200).json(friendGroups);
  });

  router.get('/:friendGroup/games', (req, res) => {
    // Extract request information
    const { friendGroup } = req.params;

    // Find the friend group as you can't trust client casing
    // If found, continue processing, else return 404
    const path = getCorrectPath(req, res, MEDAL_PATH, friendGroup);
    if (typeof path !== 'string') return path;
    log(req, `Processing path: ${path}`);

    const games = readdirSync(path)
      .filter(name => statSync(`${path}\\${name}`).isDirectory());

    log(req, `${games.length} folders found.`);
    res.status(200).json(games);
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

  return router;
}