import { Request, Response } from 'express';

import { successResponse } from '../libs/expressResponses';
import * as patientService from '../services/patient.service';
import * as patientRepository from '../repositories/patient.repository';

export const getPatientsPage = (req: Request, res: Response) => {
  res.render('web/patients');
};

export const getPatients = async (req: Request, res: Response) => {
  const patients = await patientRepository.findManyBy({}, { _id: true });
  return successResponse(res, patients);
};

export const checkNewPatients = async (req: Request, res: Response) => {
  const result = await patientService.checkNewPatients();
  successResponse(res, result);
};
