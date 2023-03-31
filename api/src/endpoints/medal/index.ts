import { Router } from 'express';
import { readdirSync } from 'fs';
import { exec } from 'child_process';

import { processPath } from './helpers.js';
import { log, useEnv } from '../../helpers.js';

const { NEW_CLIP_PATH } = useEnv();
const router = Router();

import friendGroups from './friendGroups.js';
router.use('/friendGroups', friendGroups(router));

router.get('/new', (req, res) => {
  const files = readdirSync(NEW_CLIP_PATH);
  log(req, `${files.length} files found from ${NEW_CLIP_PATH}.`);

  const newClipsFolder = processPath(NEW_CLIP_PATH, files);
  res.status(200).json(newClipsFolder);
});

router.get('/play', (req, res) => {
  const { path } = req.query;
  if (typeof path !== 'string') return res.status(400).json({ error: 'Invalid path.' });
  log(req, `Video path: ${path}`);

  // Open file in read mode
  exec(`start "" "${path}"`);
  res.status(200).json({ message: 'Opened video.' });
});

router.get('/open', (req, res) => {
  const { path } = req.query;
  if (typeof path !== 'string') return res.status(400).json({ error: 'Invalid path.' });
  log(req, `Video path: ${path}`);

  exec(`start "" "${path}"`);
  res.status(200).json({ message: 'Opened folder.' });
});

router.get('*', (req, res) => {
  res.status(404).json({ error: 'Invalid request.', url: req.originalUrl });
});

export default router;