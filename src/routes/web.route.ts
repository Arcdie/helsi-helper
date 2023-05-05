import { Router } from 'express';

import * as webController from '../controllers/web.controller';
import * as patientController from '../controllers/patient.controller';
import * as episodeController from '../controllers/episode.controller';
import * as diagnosisController from '../controllers/diagnosis.controller';

const router = Router();

router.get('/', webController.getIndexPage);
router.get('/patients', patientController.getPatientsPage);
router.get('/episodes', episodeController.getEpisodesPage);
router.get('/diagnoses', diagnosisController.getDiagnosesPage);

export default router;
