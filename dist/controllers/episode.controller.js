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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNewEpisodes = exports.findAll = exports.findEpisodesByName = void 0;
const helper_1 = require("../libs/helper");
const episodeService = __importStar(require("../services/episode.service"));
const episodeRepository = __importStar(require("../repositories/episode.repository"));
const patientRepository = __importStar(require("../repositories/patient.repository"));
const expressResponses_1 = require("../libs/expressResponses");
const findEpisodesByName = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return (0, expressResponses_1.badRequestResponse)(res, 'No name in body');
    }
    const episodes = await episodeService.findManyByName(name);
    const patientIds = episodes.map(e => e.patientId.toString());
    const patients = await patientRepository.findManyByIds(patientIds, {
        firstName: true,
        middleName: true,
        lastName: true,
        patientId: true,
    });
    return (0, expressResponses_1.successResponse)(res, episodes.map(e => ({
        ...e._doc,
        patient: patients.find(p => p._id.toString() === e.patientId.toString()),
    })));
};
exports.findEpisodesByName = findEpisodesByName;
const findAll = async (req, res) => {
    const episodes = await episodeRepository.findMany({}, {
        id: true,
        name: true,
        patientId: true,
        createdAt: true,
    });
    const patientIds = (0, helper_1.getUniqueArray)(episodes.map(e => e.patientId.toString()));
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
    return (0, expressResponses_1.successResponse)(res, returnData);
};
exports.findAll = findAll;
const checkNewEpisodes = async (req, res) => {
    const existPatients = await patientRepository.findManyBy({});
    if (!existPatients.length) {
        return (0, expressResponses_1.successResponse)(res, { status: true });
    }
    const result = await episodeService.checkNewEpisodes(existPatients);
    return (0, expressResponses_1.successResponse)(res, result);
};
exports.checkNewEpisodes = checkNewEpisodes;
