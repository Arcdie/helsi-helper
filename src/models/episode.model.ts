import mongoose, { Schema } from 'mongoose';

import { IEpisode, IEpisodeModel } from '../interfaces/IEpisode';

const modelSchema: Record<keyof IEpisode, any> = {
  patientId: {
    type: Schema.Types.ObjectId,
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
        forbiddenGroups: [Schema.Types.Mixed],
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
        icpc2: [Schema.Types.Mixed],
        isMainDiagnosis: Boolean,
        isAssistantAllowed: Boolean,
        forbiddenGroups: [Schema.Types.Mixed],
        isForbidden: Boolean,
        isMedCoordinatorAllowed: Boolean,
      },
    },

    condition: {
      clinicalStatus: String,
      verificationStatus: String,
      severity: String,
      evidences: [Schema.Types.Mixed],
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
          icd10Am: [Schema.Types.Mixed],
          icd10: [String],
          isActive: Boolean,
          forbiddenGroups: [Schema.Types.Mixed],
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
          icpc2: [Schema.Types.Mixed],
          isMainDiagnosis: Boolean,
          isAssistantAllowed: Boolean,
          forbiddenGroups: [Schema.Types.Mixed],
          isForbidden: Boolean,
          isMedCoordinatorAllowed: Boolean,
        },
      },
    },
  },
};

const Episode = new mongoose.Schema<IEpisodeModel>(modelSchema, { versionKey: false });
export default mongoose.model<IEpisodeModel>('Episode', Episode, 'episodes');
