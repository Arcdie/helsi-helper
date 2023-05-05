import { Request, Response } from 'express';

import * as episodeService from '../services/episode.service';

import * as patientRepository from '../repositories/patient.repository';

import { badRequestResponse, successResponse } from '../libs/expressResponses';

export const getEpisodesPage = (req: Request, res: Response) => {
  res.render('web/episodes');
};

export const findEpisodesByName = async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;

  if (!name) {
    return badRequestResponse(res, 'No name in body');
  }

  const results = await episodeService.findManyByName(name);
  return successResponse(res, results);
};

export const checkNewEpisodes = async (req: Request, res: Response) => {
  const existPatients = await patientRepository.findManyBy({});

  if (!existPatients.length) {
    return successResponse(res, { status: true });
  }

  const result = await episodeService.checkNewEpisodes(existPatients);
  return successResponse(res, result);
};
