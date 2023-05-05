import { Router } from 'express';

import webRoute from './web.route';
import patientRoute from './patient.route';
import episodeRoute from './episode.route';
import diagnosisRoute from './diagnosis.route';

const router = Router();

router.use('/', webRoute);

router.use('/api/patients', patientRoute);
router.use('/api/episodes', episodeRoute);
router.use('/api/diagnoses', diagnosisRoute);

export default router;
