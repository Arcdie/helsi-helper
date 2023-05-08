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
exports.checkNewPatients = void 0;
const winston_1 = __importDefault(require("../libs/winston"));
const helper_1 = require("../libs/helper");
const axios_1 = require("../libs/axios");
const ws_1 = require("../libs/ws");
const auth_service_1 = require("./auth.service");
const patientRepository = __importStar(require("../repositories/patient.repository"));
const getPatientsUrl = (skip = 0) => `https://helsi.pro/api/resources/ob_255/patients?dgd=&dld=&g=&limit=50&pebd=&pgbd=&plbd=&qn=&qp=&s=&skip=${skip}`;
const getPatientsFromHelsi = async (cookie, page, patients = [], wasHandledGettingCookie = false) => {
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
        const result = await (0, axios_1.makeRequest)('GET', getPatientsUrl(skip), {
            headers: defaultHeaders,
        });
        patients.push(...result.data.data || []);
        winston_1.default.info(`Got ${result.data.data.length} patients (left: ${result.data.meta.totalCount - (page * 50)})`);
        (0, ws_1.sendMessage)({
            event: 'checkPatients',
            message: {
                error: false,
                isFinished: false,
                current: page * 50,
                totalCount: result.data.meta.totalCount,
            },
        });
        if (result.data.meta.hasNext) {
            await (0, helper_1.sleep)(2000);
            return getPatientsFromHelsi(cookie, page + 1, patients, wasHandledGettingCookie);
        }
        return patients;
    }
    catch (err) {
        console.log('getPatientsFromHelsi', err);
        if (!wasHandledGettingCookie) {
            const newCookie = await (0, auth_service_1.getCookie)(true);
            await (0, helper_1.sleep)(2000);
            return getPatientsFromHelsi(newCookie, page, patients, true);
        }
        else {
            (0, ws_1.sendMessage)({
                event: 'checkPatients',
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
const checkNewPatients = async () => {
    const checkFlag = (0, ws_1.getCheckFlag)();
    if (checkFlag) {
        return {
            status: false,
            message: 'Вже проводиться копіювання данних, будь ласка зачекайте',
        };
    }
    (0, ws_1.changeCheckFlag)(true);
    const cookie = await (0, auth_service_1.getCookie)();
    const existPatients = await patientRepository.findManyBy({});
    const helsiPatients = await getPatientsFromHelsi(cookie, 0);
    const newPatients = helsiPatients.filter(p => !existPatients.some(eP => eP.patientId === p.patientId));
    if (newPatients.length) {
        return {
            status: true,
            data: await patientRepository.createMany(newPatients),
        };
    }
    (0, ws_1.changeCheckFlag)(false);
    (0, ws_1.sendMessage)({
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
exports.checkNewPatients = checkNewPatients;
