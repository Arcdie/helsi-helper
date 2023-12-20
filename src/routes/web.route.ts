import { Router } from 'express';

import * as webController from '../controllers/web.controller';

const router = Router();

router.get('/', webController.getIndexPage);
router.get('/report', webController.getReportPage);
router.get('/patients', webController.getPatientsPage);
router.get('/episodes', webController.getEpisodesPage);
router.get('/diagnoses', webController.getDiagnosesPage);

export default router;
