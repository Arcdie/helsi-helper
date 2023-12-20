import { Request, Response } from 'express';

import { getUniqueArray } from '../libs/helper';

import * as patientService from '../services/patient.service';
import * as diagnosisService from '../services/diagnosis.service';

import * as patientRepository from '../repositories/patient.repository';

import { badRequestResponse, successResponse } from '../libs/expressResponses';

export const findManyByNames = async (req: Request, res: Response) => {
  const { names }: { names: string } = req.body;

  if (!names) {
    return badRequestResponse(res, 'No names in body');
  }

  const diagnoses = (
    await Promise.all(
      names
        .split(',')
        .map(name => diagnosisService.findManyByName(name.trim()),
      )
    )
  ).flat();

  const patientIds = getUniqueArray(
    diagnoses.map(e => e.patientId.toString()),
  );
  
  const patients = await patientService.findManyByIds(patientIds);

  const returnData = patients.map((patient) => ({
    patient: patient._doc,
    diagnoses: diagnoses.filter((d) => d.patientId.toString() === patient._id.toString()),
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
