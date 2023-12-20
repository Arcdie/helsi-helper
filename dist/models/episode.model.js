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
    id: String,
    name: {
        type: String,
        index: true,
    },
    type: String,
    status: String,
    start: String,
    isRemoved: Boolean,
    createdAt: String,
    lastUpdatedAt: String,
    ehealthSync: {
        associationKey: String,
        isAssociated: Boolean,
        statusDate: String,
        lastCompletedAt: String,
        status: String,
    },
    managingOrganization: {
        organizationId: String,
        isHospital: Boolean,
        name: String,
        shortName: String,
        isActive: Boolean,
        isRemoved: Boolean,
        id: String,
        createdAt: String,
        lastUpdatedAt: String,
    },
    careManager: {
        lastName: String,
        firstName: String,
        middleName: String,
        birthDate: String,
        id: String,
        createdAt: String,
        lastUpdatedAt: String,
    },
    currentDiagnosis: {
        role: String,
        code: {
            text: String,
            icpc2: {
                id: String,
                code: String,
                name: String,
                shortName: String,
                inclusions: String,
                criteria: String,
                considerations: String,
                groups: [Number],
                icd10Am: [String],
                icd10: [String],
                isActive: Boolean,
                forbiddenGroups: [mongoose_1.Schema.Types.Mixed],
                isForbidden: Boolean,
                isAssistantAllowed: Boolean,
                isEvidenceRequired: Boolean,
                protocolOfCare: {
                    id: String,
                    displayName: String,
                    link: String,
                },
            },
            icd10Am: {
                id: String,
                code: String,
                name: String,
                isActive: Boolean,
                icpc2: [mongoose_1.Schema.Types.Mixed],
                isMainDiagnosis: Boolean,
                isAssistantAllowed: Boolean,
                forbiddenGroups: [mongoose_1.Schema.Types.Mixed],
                isForbidden: Boolean,
                isMedCoordinatorAllowed: Boolean,
            },
        },
        condition: {
            clinicalStatus: String,
            verificationStatus: String,
            severity: String,
            evidences: [mongoose_1.Schema.Types.Mixed],
            onsetDate: String,
            id: String,
            createdAt: String,
            lastUpdatedAt: String,
            ehealthSync: {
                associationKey: String,
                isAssociated: Boolean,
                statusDate: String,
                lastCompletedAt: String,
                status: String,
            },
            patient: {
                id: String,
                createdAt: String,
            },
            code: {
                text: String,
                icpc2: {
                    id: String,
                    code: String,
                    name: String,
                    shortName: String,
                    inclusions: String,
                    criteria: String,
                    considerations: String,
                    groups: [Number],
                    icd10Am: [mongoose_1.Schema.Types.Mixed],
                    icd10: [String],
                    isActive: Boolean,
                    forbiddenGroups: [mongoose_1.Schema.Types.Mixed],
                    isForbidden: Boolean,
                    isAssistantAllowed: Boolean,
                    isEvidenceRequired: Boolean,
                    protocolOfCare: [{
                            id: String,
                            displayName: String,
                            link: String,
                        }],
                },
                icd10Am: {
                    id: String,
                    code: String,
                    name: String,
                    isActive: Boolean,
                    icpc2: [mongoose_1.Schema.Types.Mixed],
                    isMainDiagnosis: Boolean,
                    isAssistantAllowed: Boolean,
                    forbiddenGroups: [mongoose_1.Schema.Types.Mixed],
                    isForbidden: Boolean,
                    isMedCoordinatorAllowed: Boolean,
                },
            },
        },
    },
};
const Episode = new mongoose_1.default.Schema(modelSchema, { versionKey: false });
exports.default = mongoose_1.default.model('Episode', Episode, 'episodes');
