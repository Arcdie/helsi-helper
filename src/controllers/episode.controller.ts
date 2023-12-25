import { Request, Response } from 'express';

import { getUniqueArray } from '../libs/helper';

import * as episodeService from '../services/episode.service';
import * as episodeRepository from '../repositories/episode.repository';
import * as patientRepository from '../repositories/patient.repository';

import { badRequestResponse, successResponse } from '../libs/expressResponses';

export const findEpisodesByName = async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;

  if (!name) {
    return badRequestResponse(res, 'No name in body');
  }

  const episodes = await episodeService.findManyByName(name);

  const patientIds = episodes.map(e => e.patientId.toString());
  const patients = await patientRepository.findManyByIds(patientIds, {
    firstName: true,
    middleName: true,
    lastName: true,
    patientId: true,
  });

  return successResponse(res, episodes.map(e => ({
    ...e._doc,
    patient: patients.find(p => p._id.toString() === e.patientId.toString()),
  })));
};

export const findAll = async (req: Request, res: Response) => {
  const episodes = await episodeRepository.findMany({}, {
    id: true,
    name: true,
    patientId: true,
    createdAt: true,
  });

  const patientIds = getUniqueArray(
    episodes.map(e => e.patientId.toString()),
  );
  
  const patients = await patientRepository.findManyByIds(patientIds, {
    patientId: true,
    birthDate: true,
    firstName: true,
    lastName: true,
    middleName: true,
    phone: true,
    sex: true,
  });

  const returnData = patients.map((patient) => ({
    patient: patient._doc,
    episodes: episodes.filter((d) => d.patientId.toString() === patient._id.toString()),
  }));

  return successResponse(res, returnData);
};

export const checkNewEpisodes = async (req: Request, res: Response) => {
  const existPatients = await patientRepository.findManyBy({});

  if (!existPatients.length) {
    return successResponse(res, { status: true });
  }

  const result = await episodeService.checkNewEpisodes(existPatients);
  return successResponse(res, result);
};
