import { Router } from 'express';

import * as excelController from '../controllers/excel.controller';

const router = Router();

router.post('/', excelController.createExelFile);

export default router;
