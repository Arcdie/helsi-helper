import log from '../libs/winston';
import { sleep } from '../libs/helper';
import { makeRequest } from '../libs/axios';
import { getCheckFlag, changeCheckFlag, sendMessage } from '../libs/ws';

import { getCookie } from './auth.service';
import * as patientRepository from '../repositories/patient.repository';

import { IPatient } from '../interfaces/IPatient';
import { IGetPatientsResponse } from '../interfaces/responses/IGetPatientsResponse';

const getPatientsUrl = (skip: number = 0) => `https://helsi.pro/api/resources/ob_255/patients?dgd=&dld=&g=&limit=50&pebd=&pgbd=&plbd=&qn=&qp=&s=&skip=${skip}`;

const getPatientsFromHelsi = async (
  cookie: string,
  page: number,
  patients: IPatient[] = [],
  wasHandledGettingCookie: boolean = false,
): Promise<IPatient[]> => {
  const defaultHeaders = {
    cookie,
    "accept": "*/*",
    "accept-language": "uk",
    "callback-state": "/doctor/ob_255/patients/declaration",
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": "https://helsi.pro/doctor/ob_255/patients/declaration",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  const skip = 50 * page;

  try {
    const result = await makeRequest<IGetPatientsResponse>('GET', getPatientsUrl(skip), {
      headers: defaultHeaders,
    });

    patients.push(...result.data.data || []);
    log.info(`Got ${result.data.data.length} patients (left: ${result.data.meta.totalCount - (page * 50)})`);

    sendMessage({
      event: 'checkPatients',
      message: {
        error: false,
        isFinished: false,
        current: page * 50,
        totalCount: result.data.meta.totalCount,
      },
    });

    if (result.data.meta.hasNext) {
      await sleep(2000);
      return getPatientsFromHelsi(cookie, page + 1, patients, wasHandledGettingCookie);
    }

    return patients;
  } catch (err: any) {
    console.log('getPatientsFromHelsi', err);

    if (!wasHandledGettingCookie) {
      const newCookie = await getCookie(true);
      await sleep(2000);
      return getPatientsFromHelsi(newCookie, page, patients, true);
    } else {
      sendMessage({
        event: 'checkPatients',
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

export const checkNewPatients = async () => {
  const checkFlag = getCheckFlag();

  if (checkFlag) {
    return {
      status: false,
      message: 'Вже проводиться копіювання данних, будь ласка зачекайте',
    };
  }

  changeCheckFlag(true);

  const cookie = await getCookie();
  const existPatients = await patientRepository.findManyBy({});
  const helsiPatients = await getPatientsFromHelsi(cookie, 0);

  const newPatients = helsiPatients.filter(p => !existPatients.some(eP => eP.patientId === p.patientId));

  if (newPatients.length) {
    return {
      status: true,
      data: await patientRepository.createMany(newPatients),
    };
  }

  changeCheckFlag(false);

  sendMessage({
    event: 'checkPatients',
    message: {
      error: false,
      isFinished: true,
    },
  });

  return {
    status: true,
    data: [],
  };
};