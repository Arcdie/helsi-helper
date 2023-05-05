import mongoose from 'mongoose';

import { IPatient, IPatientModel } from '../interfaces/IPatient';

const modelSchema: Record<keyof IPatient, any> = {
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

const Patient = new mongoose.Schema<IPatientModel>(modelSchema, { versionKey: false });
export default mongoose.model<IPatientModel>('Patient', Patient, 'patients');
