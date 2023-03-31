import { Router } from 'express';
import { readdirSync } from 'fs';

import { processPath } from './helpers.js';
import { log, useEnv } from '../../helpers.js';

const { NEW_CLIP_PATH } = useEnv();
const router = Router();

import friendGroups from './friendGroups.js';
router.use('/friendGroup', friendGroups);

router.get('/new', (req, res) => {
  const files = readdirSync(NEW_CLIP_PATH);
  log(req, `${files.length} files found from ${NEW_CLIP_PATH}.`);

  const newClipsFolder = processPath(NEW_CLIP_PATH, files);
  res.status(200).json(newClipsFolder);
});

router.get('*', (req, res) => {
  res.status(404).json({ error: 'Invalid request.', url: req.originalUrl });
});