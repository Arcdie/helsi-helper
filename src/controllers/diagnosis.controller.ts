import { Request, Response } from 'express';

import * as diagnosisService from '../services/diagnosis.service';

import * as patientRepository from '../repositories/patient.repository';

import { badRequestResponse, successResponse } from '../libs/expressResponses';

export const getDiagnosesPage = (req: Request, res: Response) => {
  res.render('web/diagnoses');
};

export const findManyByName = async (req: Request, res: Response) => {
  const { names }: { names: string } = req.body;

  if (!names) {
    return badRequestResponse(res, 'No names in body');
  }

  const results = (await Promise.all(names.split(',').map(async name => {
    return diagnosisService.findManyByName(name.trim());
  }))).flat();

  const uniquePatientIds = [...new Set(results.map(r => r.patientId.toString()))];
  const returnData = uniquePatientIds.map(patientId => ({
    patient: results.find(r => r.patientId.toString() === patientId)?.patient,
    diagnoses: results.filter(r => r.patientId.toString() === patientId),
  }));

  return successResponse(res, returnData);
};

export const checkNewDiagnoses = async (req: Request, res: Response) => {
  const existPatients = await patientRepository.findManyBy({});

  if (!existPatients.length) {
    return successResponse(res, { status: true });
  }

  const result = await diagnosisService.checkNewDiagnoses(existPatients);
  return successResponse(res, result);
};
