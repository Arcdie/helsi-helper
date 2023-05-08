"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const modelSchema = {
    status: String,
    patientId: String,
    balance: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    isAutoPhone: Boolean,
    phone: String,
    birthDate: Date,
    sex: Boolean,
    isVerificateEmail: Boolean,
    isVerificate: Boolean,
    personalDataStatus: String,
    hasNoTaxId: Boolean,
    communicationChannel: String,
    hasVisitedEvents: Boolean,
    addresses: [String],
    isDeclarationExist: Boolean,
    duplicateState: Number,
    isPreperson: Boolean,
    isTechPatient: Boolean,
    alternativelyIdentified: Boolean,
    isIdentified: Boolean,
    hasFcm: Boolean,
    age: {
        years: Number,
    },
    ehealthSync: {
        isAssociated: String,
        status: String,
    },
    declaration: {
        number: String,
        phone: String,
        beginDate: String,
        endDate: String,
        insertDate: String,
        signDate: String,
        statusId: String,
    },
};
const Patient = new mongoose_1.default.Schema(modelSchema, { versionKey: false });
exports.default = mongoose_1.default.model('Patient', Patient, 'patients');
