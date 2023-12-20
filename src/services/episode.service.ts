import log from '../libs/winston';
import { sleep } from '../libs/helper';
import { makeRequest } from '../libs/axios';
import { getCheckFlag, changeCheckFlag, sendMessage } from '../libs/ws';

import { getCookie } from './auth.service';
import * as patientRepository from '../repositories/patient.repository';
import * as episodeRepository from '../repositories/episode.repository';

import { IEpisode } from '../interfaces/IEpisode';
import { IPatientModel } from '../interfaces/IPatient';
import { IGetEpisodesResponse } from '../interfaces/responses/IGetEpisodesResponse';

const getEpisodesUrl = (patientId: string, skip: number = 0) => `https://helsi.pro/api/patients/${patientId}/episodes?code=&limit=50&skip=${skip}&status=`;

const getEpisodesFromHelsi = async (
  patientId: string,
  cookie: string,
  page: number,
  episodes: IEpisode[] = [],
  wasHandledGettingCookie: boolean = false,
): Promise<IEpisode[]> => {
  const defaultHeaders = {
    cookie,
    "accept": "*/*",
    "accept-language": "uk",
    "callback-state": "/emk/page/afce4e30-d5ba-4815-a610-3e957c3e7f0b/medicalHistory/episodes",
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": `https://helsi.pro/emk/page/${patientId}/medicalHistory/episodes`,
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  const skip = 50 * page;

  try {
    const result = await makeRequest<IGetEpisodesResponse>('GET', getEpisodesUrl(patientId, skip), {
      headers: defaultHeaders,
    });

    episodes.push(...result.data.data || []);
    log.info(`Got ${result.data.data.length} episodes for ${patientId}`);

    if (result.data.meta.hasNext) {
      await sleep(1000);
      return getEpisodesFromHelsi(patientId, cookie, page + 1, episodes, wasHandledGettingCookie);
    }

    return episodes;
  } catch (err: any) {
    console.log('getEpisodesFromHelsi', err);

    if (!wasHandledGettingCookie) {
      const newCookie = await getCookie(true);
      await sleep(2000);
      return getEpisodesFromHelsi(patientId, newCookie, page, episodes, true);
    } else {
      sendMessage({
        event: 'checkEpisodes',
        message: {
          error: err.message || true,
          isFinished: true,
        },
      });

      changeCheckFlag(false);

      throw new Error(err.message);
    }
  }
};

export const findManyByName = async (name: string) => {
  const episodes = await episodeRepository.findManyByName(name, {
    id: true,
    name: true,
    patientId: true,
  });

  if (!episodes.length) {
    return [];
  }

  const patientIds = episodes.map(e => e.patientId.toString());
  const patients = await patientRepository.findManyByIds(patientIds, {
    firstName: true,
    middleName: true,
    lastName: true,
    patientId: true,
  });

  return episodes.map(e => ({
    ...e._doc,
    patient: patients.find(p => p._id.toString() === e.patientId.toString()),
  }));
};

export const checkNewEpisodes = async (patients: IPatientModel[]) => {
  const checkFlag = getCheckFlag();

  if (checkFlag) {
    return {
      status: false,
      message: 'Вже проводиться копіювання данних, будь ласка зачекайте',
    };
  }

  changeCheckFlag(true);

  const cookie = await getCookie();
  let numberPatients = patients.length;

  for await (const patient of patients) {
    const helsiEpisodes = await getEpisodesFromHelsi(patient.patientId, cookie, 0);
    const existEpisodes = await episodeRepository.findMany({
      patientId: patient._id,
    });

    const newEpisodes = helsiEpisodes.filter(e => !existEpisodes.some(eE => eE.id === e.id));

    if (newEpisodes.length) {
      await episodeRepository.createMany(patient, newEpisodes);
    }

    numberPatients -= 1;
    log.info(`Left ${numberPatients}`);

    sendMessage({
      event: 'checkEpisodes',
      message: {
        error: false,
        isFinished: false,
        current: patients.length - numberPatients,
        totalCount: patients.length,
      },
    });

    await sleep(1000);
  }

  changeCheckFlag(false);

  sendMessage({
    event: 'checkEpisodes',
    message: {
      error: false,
      isFinished: true,
    },
  });

  return { status: true };
};
