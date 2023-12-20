"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findManyByName = exports.findMany = exports.createMany = void 0;
const diagnosis_model_1 = __importDefault(require("../models/diagnosis.model"));
const createMany = async (patient, diagnoses) => diagnosis_model_1.default.insertMany(diagnoses.map(e => ({
    ...e,
    name: e.service.achi.name,
    patientId: patient._id,
})));
exports.createMany = createMany;
const findMany = async (filterOptions = {}) => diagnosis_model_1.default.find({ ...filterOptions }).exec();
exports.findMany = findMany;
const findManyByName = async (name, selectOptions = {}) => diagnosis_model_1.default.find({
    name: { $regex: name, $options: 'i' },
}, selectOptions).exec();
exports.findManyByName = findManyByName;
