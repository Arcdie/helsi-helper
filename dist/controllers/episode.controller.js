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
exports.checkNewEpisodes = exports.findEpisodesByName = exports.getEpisodesPage = void 0;
const episodeService = __importStar(require("../services/episode.service"));
const patientRepository = __importStar(require("../repositories/patient.repository"));
const expressResponses_1 = require("../libs/expressResponses");
const getEpisodesPage = (req, res) => {
    res.render('web/episodes');
};
exports.getEpisodesPage = getEpisodesPage;
const findEpisodesByName = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return (0, expressResponses_1.badRequestResponse)(res, 'No name in body');
    }
    const results = await episodeService.findManyByName(name);
    return (0, expressResponses_1.successResponse)(res, results);
};
exports.findEpisodesByName = findEpisodesByName;
const checkNewEpisodes = async (req, res) => {
    const existPatients = await patientRepository.findManyBy({});
    if (!existPatients.length) {
        return (0, expressResponses_1.successResponse)(res, { status: true });
    }
    const result = await episodeService.checkNewEpisodes(existPatients);
    return (0, expressResponses_1.successResponse)(res, result);
};
exports.checkNewEpisodes = checkNewEpisodes;
