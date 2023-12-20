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
exports.checkNewEpisodes = exports.findManyByName = void 0;
const winston_1 = __importDefault(require("../libs/winston"));
const helper_1 = require("../libs/helper");
const axios_1 = require("../libs/axios");
const ws_1 = require("../libs/ws");
const auth_service_1 = require("./auth.service");
const patientRepository = __importStar(require("../repositories/patient.repository"));
const episodeRepository = __importStar(require("../repositories/episode.repository"));
const getEpisodesUrl = (patientId, skip = 0) => `https://helsi.pro/api/patients/${patientId}/episodes?code=&limit=50&skip=${skip}&status=`;
const getEpisodesFromHelsi = async (patientId, cookie, page, episodes = [], wasHandledGettingCookie = false) => {
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
        const result = await (0, axios_1.makeRequest)('GET', getEpisodesUrl(patientId, skip), {
            headers: defaultHeaders,
        });
        episodes.push(...result.data.data || []);
        winston_1.default.info(`Got ${result.data.data.length} episodes for ${patientId}`);
        if (result.data.meta.hasNext) {
            await (0, helper_1.sleep)(1000);
            return getEpisodesFromHelsi(patientId, cookie, page + 1, episodes, wasHandledGettingCookie);
        }
        return episodes;
    }
    catch (err) {
        console.log('getEpisodesFromHelsi', err);
        if (!wasHandledGettingCookie) {
            const newCookie = await (0, auth_service_1.getCookie)(true);
            await (0, helper_1.sleep)(2000);
            return getEpisodesFromHelsi(patientId, newCookie, page, episodes, true);
        }
        else {
            (0, ws_1.sendMessage)({
                event: 'checkEpisodes',
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
exports.findManyByName = findManyByName;
const checkNewEpisodes = async (patients) => {
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
        const helsiEpisodes = await getEpisodesFromHelsi(patient.patientId, cookie, 0);
        const existEpisodes = await episodeRepository.findMany({
            patientId: patient._id,
        });
        const newEpisodes = helsiEpisodes.filter(e => !existEpisodes.some(eE => eE.id === e.id));
        if (newEpisodes.length) {
            await episodeRepository.createMany(patient, newEpisodes);
        }
        numberPatients -= 1;
        winston_1.default.info(`Left ${numberPatients}`);
        (0, ws_1.sendMessage)({
            event: 'checkEpisodes',
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
        event: 'checkEpisodes',
        message: {
            error: false,
            isFinished: true,
        },
    });
    return { status: true };
};
exports.checkNewEpisodes = checkNewEpisodes;
