import { HydratedDocument, Types } from 'mongoose';

export interface IPatient {
  status: string; // Active
  patientId: string;
  balance: number;
  firstName: string;
  middleName: string;
  lastName: string;
  isAutoPhone: boolean,
  phone: string;
  birthDate: Date;
  sex: boolean;
  isVerificateEmail: boolean;
  addresses: [],
  isVerificate: boolean;
  personalDataStatus: string; // NEED_CONSENT
  hasNoTaxId: boolean;
  communicationChannel: string; // NONE
  hasVisitedEvents: boolean;
  isDeclarationExist: boolean;
  duplicateState: number;
  isPreperson: boolean;
  isTechPatient: boolean;
  alternativelyIdentified: boolean;
  isIdentified: boolean;
  hasFcm: boolean;

  age: {
    years: number;
  };

  ehealthSync: {
    isAssociated: boolean;
    status: string; // ReadyToSync

    error: {
      errors: any[];
    };
  };

  declaration: {
    number: string; // 0001-7X86-56A0
    phone: string,
    beginDate: string;
    endDate: string;
    insertDate: string;
    signDate: string;
    statusId: string; // Active
  };
}

export interface IPatientModel extends HydratedDocument<IPatient> {
  _doc: IPatient & { _id: Types.ObjectId };
}
