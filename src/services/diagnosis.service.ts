import log from '../libs/winston';
import { sleep } from '../libs/helper';
import { makeRequest } from '../libs/axios';
import { getCheckFlag, changeCheckFlag, sendMessage } from '../libs/ws';

import * as diagnosisRepository from '../repositories/diagnosis.repository';

import { IDiagnosis } from '../interfaces/IDiagnosis';
import { IPatientModel } from '../interfaces/IPatient';
import { IGetDiagnosesResponse } from '../interfaces/responses/IGetDiagnosesResponse';
import { getCookie } from './auth.service';

const getDiagnosesUrl = (patientId: string, page: number) =>
  `https://helsi.pro/api/patients/${patientId}/diagnosticReports?limit=50&page=${page}&skip=${50 * (page - 1)}`;

const getDiagnosesFromHelsi = async (
  patientId: string,
  cookie: string,
  page: number,
  diagnoses: IDiagnosis[] = [],
  wasHandledGettingCookie: boolean = false,
): Promise<IDiagnosis[]> => {
  const defaultHeaders = {
    cookie,
    "accept": "*/*",
    "accept-language": "uk",
    "callback-state": `/emk/page/${patientId}/diagnosticReports`,
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": `https://helsi.pro/emk/page/${patientId}/diagnosticReports`,
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  try {
    const result = await makeRequest<IGetDiagnosesResponse>('GET', getDiagnosesUrl(patientId, page), {
      headers: defaultHeaders,
    });

    diagnoses.push(...result.data.data || []);
    log.info(`Got ${result.data.data.length} diagnoses for ${patientId}`);

    if (diagnoses.length >= 500) {
      log.info(`Diagnoses.length > 500 for ${patientId}`);
      return diagnoses;
    }

    if (result.data.meta.hasNext) {
      await sleep(1000);
      return getDiagnosesFromHelsi(patientId, cookie, page + 1, diagnoses, wasHandledGettingCookie);
    }

    return diagnoses;
  } catch (err: any) {
    console.log('getDiagnosesFromHelsi', err);

    if (!wasHandledGettingCookie) {
      const newCookie = await getCookie(true);
      await sleep(2000);
      return getDiagnosesFromHelsi(patientId, newCookie, page, diagnoses, true);
    } else {
      sendMessage({
        event: 'checkDiagnoses',
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
  return diagnosisRepository.findManyByName(name, {
    patientId: true,
    id: true,
    name: true,
    conclusion: true,
    diagnosticResult: true,
    createdAt: true,
  });
};

export const checkNewDiagnoses = async (patients: IPatientModel[]) => {
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
    const helsiDiagnoses = await getDiagnosesFromHelsi(patient.patientId, cookie, 1);
    const existDiagnoses = await diagnosisRepository.findMany({
      patientId: patient._id,
    });

    const newDiagnoses = helsiDiagnoses.filter(d => !existDiagnoses.some(eD => eD.id === d.id));

    if (newDiagnoses.length) {
      await diagnosisRepository.createMany(patient, newDiagnoses);
    }

    numberPatients -= 1;
    log.info(`Left ${numberPatients}`);

    sendMessage({
      event: 'checkDiagnoses',
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
    event: 'checkDiagnoses',
    message: {
      error: false,
      isFinished: true,
    },
  });

  return { status: true };
};
