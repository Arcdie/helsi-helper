"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findManyByName = exports.findMany = exports.createMany = void 0;
const episode_model_1 = __importDefault(require("../models/episode.model"));
const createMany = async (patient, episodes) => episode_model_1.default.insertMany(episodes.map(e => ({ ...e, patientId: patient._id })));
exports.createMany = createMany;
const findMany = async (filterOptions = {}) => episode_model_1.default.find({ ...filterOptions }).exec();
exports.findMany = findMany;
const findManyByName = async (name, selectOptions = {}) => episode_model_1.default.find({
    name: { $regex: name, $options: 'i' },
}, selectOptions).exec();
exports.findManyByName = findManyByName;
