import mongoose, { Schema } from 'mongoose';

import { IDiagnosis, IDiagnosisModel } from '../interfaces/IDiagnosis';

const modelSchema: Record<keyof IDiagnosis, any> = {
  patientId: {
    type: Schema.Types.ObjectId,
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
      forbiddenGroups: [Schema.Types.Mixed],
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

const Diagnosis = new mongoose.Schema<IDiagnosisModel>(modelSchema, { versionKey: false });
export default mongoose.model<IDiagnosisModel>('Diagnosis', Diagnosis, 'diagnoses');
