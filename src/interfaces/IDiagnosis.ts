import { HydratedDocument, Types } from 'mongoose';

export interface IDiagnosis {
  name?: string;
  patientId: Types.ObjectId;

  id: string; // c155ac7c-d9f7-47d2-b523-976aed549b6b,
  status: string; // Complete
  serviceRequestId: string; // ""
  category: string; // diagnostic_procedure,
  effectiveDateTime: string;
  issuedAt: string;
  conclusion: string; // Базальна нормоацидність.Селективна помірна гіперацидність.,
  eventId: string; // f97deff1-acc6-46e8-afca-911b56ddd6a9
  isRemoved: boolean;
  diagnosticResult: string; // ""
  primarySource: boolean;
  reportOriginId: string; // ""
  source: string; // His
  createdAt: string; // 2023-04-25T12:53:33+03:00,
  lastUpdatedAt: string; // 2023-04-25T12:56:45+03:00

  ehealthSync: {
    associationKey: string; // e3ee3387-31e8-48c0-896c-ad14b99c019f,
    isAssociated: boolean;
    statusDate: string;
    lastCompletedAt: string;
    status: string; // Synchronized

    error: {
      errors: any[];
    };
  };

  service: {
    achiId: string; // 9b41123b-8e76-4b9a-b3fa-b3579000ac7b,

    achi: {
      code: string; // 92091-00
      name: string; // Аналіз шлункового соку,
      forbiddenGroups: any[];
      isForbidden: boolean;
      id: string; //9b41123b-8e76-4b9a-b3fa-b3579000ac7b,
      createdAt: string; // 2021-09-24T19:08:40+03:00,
      lastUpdatedAt: string; // 2022-10-20T14:43:39+03:00
    };
  };

  recorder: {
    displayName: string;

    entity: {
      id: string;
      lastName: string;
      firstName: string;
      middleName: string;
      birthDate: string;
      createdAt: string;
      lastUpdatedAt: string;
    };
  };

  performer: {
    displayName: string;

    entity: {
      id: string;
      lastName: string;
      firstName: string;
      middleName: string;
      birthDate: string;
      createdAt: string;
      lastUpdatedAt: string;
    };
  };

  interpreter: {
    displayName: string;

    entity: {
      id: string;
      lastName: string;
      firstName: string;
      middleName: string;
      birthDate: string;
      createdAt: string;
      lastUpdatedAt: string;
    };
  };

  organization: {
    displayName: string; // КНП \КМКДЦ\

    entity: {
      organizationId: string; //ebb0d571-3310-46b8-bd35-2c7114ae01ec,
      isHospital: boolean;
      name: string; // КОМУНАЛЬНЕ НЕКОМЕРЦІЙНЕ ПІДПРИЄМСТВО \КИЇВСЬКИЙ МІСЬКИЙ КОНСУЛЬТАТИВНО-ДІАГНОСТИЧНИЙ ЦЕНТР\ ВИКОНАВЧОГО ОРГАНУ КИЇВСЬКОЇ МІСЬКОЇ РАДИ (КИЇВСЬКОЇ МІСЬКОЇ ДЕРЖАВНОЇ АДМІНІСТРАЦІЇ),
      shortName: string; // КНП \КМКДЦ\
      isActive: boolean;
      isRemoved: boolean;
      id: string; // ebb0d571-3310-46b8-bd35-2c7114ae01ec,
      createdAt: string; // 2018-07-16T10:40:14+03:00,
      lastUpdatedAt: string; // 2023-01-24T10:57:37+02:00
    };
  };
}

export interface IDiagnosisModel extends HydratedDocument<IDiagnosis> {
  _doc: IDiagnosis & { _id: Types.ObjectId };
}
