"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNewDiagnoses = exports.findManyByName = void 0;
const winston_1 = __importDefault(require("../libs/winston"));
const helper_1 = require("../libs/helper");
const axios_1 = require("../libs/axios");
const ws_1 = require("../libs/ws");
const diagnosisRepository = __importStar(require("../repositories/diagnosis.repository"));
const auth_service_1 = require("./auth.service");
const getDiagnosesUrl = (patientId, page) => `https://helsi.pro/api/patients/${patientId}/diagnosticReports?limit=50&page=${page}&skip=${50 * (page - 1)}`;
const getDiagnosesFromHelsi = async (patientId, cookie, page, diagnoses = [], wasHandledGettingCookie = false) => {
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
        const result = await (0, axios_1.makeRequest)('GET', getDiagnosesUrl(patientId, page), {
            headers: defaultHeaders,
        });
        diagnoses.push(...result.data.data || []);
        winston_1.default.info(`Got ${result.data.data.length} diagnoses for ${patientId}`);
        if (diagnoses.length >= 500) {
            winston_1.default.info(`Diagnoses.length > 500 for ${patientId}`);
            return diagnoses;
        }
        if (result.data.meta.hasNext) {
            await (0, helper_1.sleep)(1000);
            return getDiagnosesFromHelsi(patientId, cookie, page + 1, diagnoses, wasHandledGettingCookie);
        }
        return diagnoses;
    }
    catch (err) {
        console.log('getDiagnosesFromHelsi', err);
        if (!wasHandledGettingCookie) {
            const newCookie = await (0, auth_service_1.getCookie)(true);
            await (0, helper_1.sleep)(2000);
            return getDiagnosesFromHelsi(patientId, newCookie, page, diagnoses, true);
        }
        else {
            (0, ws_1.sendMessage)({
                event: 'checkDiagnoses',
                message: {
                    error: err.message || true,
                    isFinished: true,
                },
            });
            (0, ws_1.changeCheckFlag)(false);
            throw new Error(err.message);
        }
    }
};
const findManyByName = async (name) => {
    return diagnosisRepository.findManyByName(name, {
        patientId: true,
        id: true,
        name: true,
        conclusion: true,
        diagnosticResult: true,
        createdAt: true,
    });
};
exports.findManyByName = findManyByName;
const checkNewDiagnoses = async (patients) => {
    const checkFlag = (0, ws_1.getCheckFlag)();
    if (checkFlag) {
        return {
            status: false,
            message: 'Вже проводиться копіювання данних, будь ласка зачекайте',
        };
    }
    (0, ws_1.changeCheckFlag)(true);
    const cookie = await (0, auth_service_1.getCookie)();
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
        winston_1.default.info(`Left ${numberPatients}`);
        (0, ws_1.sendMessage)({
            event: 'checkDiagnoses',
            message: {
                error: false,
                isFinished: false,
                current: patients.length - numberPatients,
                totalCount: patients.length,
            },
        });
        await (0, helper_1.sleep)(1000);
    }
    (0, ws_1.changeCheckFlag)(false);
    (0, ws_1.sendMessage)({
        event: 'checkDiagnoses',
        message: {
            error: false,
            isFinished: true,
        },
    });
    return { status: true };
};
exports.checkNewDiagnoses = checkNewDiagnoses;
