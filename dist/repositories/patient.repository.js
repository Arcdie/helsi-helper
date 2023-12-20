"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findManyByIds = exports.findManyBy = exports.createMany = void 0;
const patient_model_1 = __importDefault(require("../models/patient.model"));
const createMany = async (patients) => patient_model_1.default.insertMany(patients);
exports.createMany = createMany;
const findManyBy = async (filterOptions = {}, selectOptions = {}) => patient_model_1.default.find(filterOptions, selectOptions).exec();
exports.findManyBy = findManyBy;
const findManyByIds = async (ids, selectOptions = {}) => patient_model_1.default.find({ _id: { $in: ids } }, selectOptions).exec();
exports.findManyByIds = findManyByIds;
