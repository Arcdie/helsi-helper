import { Router } from 'express';

import * as diagnosisController from '../controllers/diagnosis.controller';

const router = Router();

router.post('/byNames', diagnosisController.findManyByNames);

router.get('/check', diagnosisController.checkNewDiagnoses);

export default router;
