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
const mongoose_1 = __importStar(require("mongoose"));
const modelSchema = {
    patientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        index: true,
    },
    id: String,
    status: String,
    serviceRequestId: String,
    category: String,
    effectiveDateTime: String,
    issuedAt: String,
    conclusion: String,
    eventId: String,
    isRemoved: Boolean,
    diagnosticResult: String,
    primarySource: Boolean,
    reportOriginId: String,
    source: String,
    createdAt: String,
    lastUpdatedAt: String,
    ehealthSync: {
        associationKey: String,
        isAssociated: Boolean,
        statusDate: String,
        lastCompletedAt: String,
        status: String,
    },
    service: {
        achiId: String,
        achi: {
            id: String,
            name: String,
            code: String,
            forbiddenGroups: [mongoose_1.Schema.Types.Mixed],
            isForbidden: Boolean,
            createdAt: String,
            lastUpdatedAt: String,
        },
    },
    recorder: {
        displayName: String,
        entity: {
            id: String,
            lastName: String,
            firstName: String,
            middleName: String,
            birthDate: String,
            createdAt: String,
            lastUpdatedAt: String,
        },
    },
    performer: {
        displayName: String,
        entity: {
            id: String,
            lastName: String,
            firstName: String,
            middleName: String,
            birthDate: String,
            createdAt: String,
            lastUpdatedAt: String,
        },
    },
    interpreter: {
        displayName: String,
        entity: {
            id: String,
            lastName: String,
            firstName: String,
            middleName: String,
            birthDate: String,
            createdAt: String,
            lastUpdatedAt: String,
        },
    },
    organization: {
        displayName: String,
        entity: {
            id: String,
            organizationId: String,
            isHospital: Boolean,
            name: String,
            shortName: String,
            isActive: Boolean,
            isRemoved: Boolean,
            createdAt: String,
            lastUpdatedAt: String,
        },
    },
};
const Diagnosis = new mongoose_1.default.Schema(modelSchema, { versionKey: false });
exports.default = mongoose_1.default.model('Diagnosis', Diagnosis, 'diagnoses');
