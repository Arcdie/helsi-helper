import { Router } from 'express';

import * as patientController from '../controllers/patient.controller';

const router = Router();

router.get('/', patientController.getPatients);
router.get('/extended', patientController.getPatientsExtended);

router.get('/check', patientController.checkNewPatients);

export default router;
