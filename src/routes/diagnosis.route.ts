import { Router } from 'express';

import * as diagnosisController from '../controllers/diagnosis.controller';

const router = Router();

router.post('/byName', diagnosisController.findManyByName);

router.get('/check', diagnosisController.checkNewDiagnoses);

export default router;
