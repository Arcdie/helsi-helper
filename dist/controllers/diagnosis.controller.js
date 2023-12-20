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
exports.checkNewDiagnoses = exports.findManyByNames = void 0;
const helper_1 = require("../libs/helper");
const patientService = __importStar(require("../services/patient.service"));
const diagnosisService = __importStar(require("../services/diagnosis.service"));
const patientRepository = __importStar(require("../repositories/patient.repository"));
const expressResponses_1 = require("../libs/expressResponses");
const findManyByNames = async (req, res) => {
    const { names } = req.body;
    if (!names) {
        return (0, expressResponses_1.badRequestResponse)(res, 'No names in body');
    }
    const diagnoses = (await Promise.all(names
        .split(',')
        .map(name => diagnosisService.findManyByName(name.trim())))).flat();
    const patientIds = (0, helper_1.getUniqueArray)(diagnoses.map(e => e.patientId.toString()));
    const patients = await patientService.findManyByIds(patientIds);
    const returnData = patients.map((patient) => ({
        patient: patient._doc,
        diagnoses: diagnoses.filter((d) => d.patientId.toString() === patient._id.toString()),
    }));
    return (0, expressResponses_1.successResponse)(res, returnData);
};
exports.findManyByNames = findManyByNames;
const checkNewDiagnoses = async (req, res) => {
    const existPatients = await patientRepository.findManyBy({});
    if (!existPatients.length) {
        return (0, expressResponses_1.successResponse)(res, { status: true });
    }
    const result = await diagnosisService.checkNewDiagnoses(existPatients);
    return (0, expressResponses_1.successResponse)(res, result);
};
exports.checkNewDiagnoses = checkNewDiagnoses;
