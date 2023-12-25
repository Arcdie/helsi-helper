import { Router } from 'express';

import * as webController from '../controllers/web.controller';

const router = Router();

router.get('/', webController.getIndexPage);
router.get('/patients', webController.getPatientsPage);
router.get('/episodes', webController.getEpisodesPage);
router.get('/diagnoses', webController.getDiagnosesPage);

router.get('/reports/episodes', webController.getReportEpisodesPage);
router.get('/reports/diagnoses', webController.getReportDiagnosesPage);

export default router;
