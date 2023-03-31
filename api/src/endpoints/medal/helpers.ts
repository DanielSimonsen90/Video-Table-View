import { Request, Response } from 'express';
import { readdirSync, statSync } from 'fs';
import { Folder } from 'vtv-models';

import { log, useEnv } from '../../helpers.js';

const { MEDAL_PATH } = useEnv();

export function getPath(req: Request, res: Response): string | Response {
  // Extract request information
  const { friendGroup, game } = req.params;

  // Find the friend group and game as you can't trust client casing
  // If found, continue processing, else return 404
  const friendGroupPath = getCorrectPath(req, res,MEDAL_PATH, friendGroup);
  if (typeof friendGroupPath !== 'string') return friendGroupPath;

  return getCorrectPath(req, res, friendGroupPath, game);
}

export function getCorrectPath(req: Request, res: Response, path: string, search?: string): string | Response {
  const result = search
    ? readdirSync(path).find(file => file.toLowerCase() === search.replace('%20', ' ').toLowerCase())
    : "";

  if (!search) return path;
  if (!result) return res.status(404).json({ error: `File "${search}" not found from ${path}.` });

  log(req, `File "${result}" found from ${search}.`);
  return `${path}/${result}`;
}

export function processPath(path: string, files: Array<string>): Folder {
  // Create folder result
  const stats = statSync(path);
  const folder = new Folder(path, stats);

  for (const file of files) {
    const filePath = `${path}\\${file}`;

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
      const video = {
        name: name.reverse().join('.'),
        extension,
        size, createdAt, modifiedAt,
        path: filePath,
        folderPath: path,
      };

      folder.push(video);
    }
  }

  // Return the folder
  return folder;
}