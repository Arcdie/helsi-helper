import { Router } from 'express';

import * as episodeController from '../controllers/episode.controller';

const router = Router();

router.get('/', episodeController.findAll);
router.post('/byName', episodeController.findEpisodesByName);

router.get('/check', episodeController.checkNewEpisodes);

export default router;
