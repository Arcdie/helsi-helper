"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnosisNameMigration = void 0;
const diagnosis_model_1 = __importDefault(require("../models/diagnosis.model"));
const diagnosisNameMigration = async () => {
    console.log('Migration started');
    const diagnosesDocs = await diagnosis_model_1.default.find({}).exec();
    await Promise.all(diagnosesDocs.map(async (doc) => {
        doc.name = doc.service.achi.name;
        await doc.save();
    }));
    console.log('Migration finished');
};
exports.diagnosisNameMigration = diagnosisNameMigration;
