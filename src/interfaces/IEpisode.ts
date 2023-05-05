import { HydratedDocument, Types } from 'mongoose';

export interface IEpisode {
  patientId: Types.ObjectId;

  id: string; // f85d3f9d-7f99-4551-9769-c4092a2993e0,
  name: string; //D98 Холецистит / жовчнокам'яна хвороба,
  type: string; // TREATMENT,
  status: string; // Active,
  start: string;
  isRemoved: boolean;
  createdAt: string;
  lastUpdatedAt: string;

  ehealthSync: {
    associationKey: string; // e3ee3387-31e8-48c0-896c-ad14b99c019f,
    isAssociated: boolean;
    statusDate: string;
    lastCompletedAt: string;
    status: string; // Synchronized

    error: {
      errors: any[];
    },
  };

  managingOrganization: {
    organizationId: string; // org_6,
    isHospital: boolean;
    name: string; // КОМУНАЛЬНЕ НЕКОМЕРЦІЙНЕ ПІДПРИЄМСТВО \ЦЕНТР ПЕРВИННОЇ МЕДИКО-САНІТАРНОЇ ДОПОМОГИ №1\ ОБОЛОНСЬКОГО РАЙОНУ М. КИЄВА,
    shortName: string; //КНП \ЦПМСД №1\ ОБОЛОНСЬКОГО РАЙОНУ М. КИЄВА,
    isActive: boolean;
    isRemoved: boolean;
    id: string; // org_6,
    createdAt: string;
    lastUpdatedAt: string;
  };

  careManager: {
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    id: string; //ob_255,
    createdAt: string;
    lastUpdatedAt: string;
  };

  currentDiagnosis: {
    role: string; // Primary

    code: {
      text: string; // ""

      icpc2: {
        id: string; //cf38814b-d8e9-4aa9-a39d-5c4fdb86a2eb,
        code: string; // D98,
        name: string; // Холецистит / жовчнокам'яна хвороба,
        shortName: string; //Cholecystitis/cholelithiasis,
        inclusions: string; //жовчна коліка; холангіт; камені в жовчному міхурі,
        criteria: string; //холецистит: виявлення типової патології за допомогою ультразвуку або хірургічного втручання; або болючість при пальпації в правому верхньому квадранті і  жовтяниця або гарячка або камені в жовчевому в анамнезі; - жовчокам’яна хвороба: візуалізація або виявлення хірургічним втручанням каменів у жовчевому; - гостра жовчева коліка: гострі кольки в правому верхньому квадранті біль в животі без лихоманки; і жовтяниця або болючість в правому верхньому квадранті черевної порожнини, або камені в жовчевому в анамнезі,
        considerations: string; //локалізований біль у животі D06,
        groups: number[]; // [1, 2]
        icd10Am: any[];
        icd10: string[]; // [f4df3974-a3a4-48b2-ae1b-0fc89bde9738, f49b22d9 - 8084 - 4a65 - 8812 - 6298770b0ca5]
        isActive: boolean;
        forbiddenGroups: any[];
        isForbidden: boolean;
        isAssistantAllowed: boolean;
        isEvidenceRequired: boolean;

        protocolOfCare: {
          id: string; // 1ac8960c-d299-4725-9e2f-285fd51e489e,
          displayName: string; // 009.025 ebm00220 Первинний склерозуючий холангіт [ICPC-2 D97 D98],
          link: string; // 238.pdf
        };
      };

      icd10Am: {
        id: string; // 34dbabaf-a799-454e-ba23-3e6e9453181e,
        code: string; // K81.1,
        name: string; // Хронічний холецистит,
        isActive: boolean;
        icpc2: any[];
        isMainDiagnosis: boolean;
        isAssistantAllowed: boolean;
        forbiddenGroups: any[];
        isForbidden: boolean;
        isMedCoordinatorAllowed: boolean;
      };
    };

    condition: {
      clinicalStatus: string; // Active
      verificationStatus: string; // Confirmed
      severity: string; // Mild
      evidences: any[];
      onsetDate: string;
      id: string; // d59bd7cf-8e04-46ac-aaa8-2488c7016920
      createdAt: string;
      lastUpdatedAt: string;

      ehealthSync: {
        associationKey: string; // 9f77fe22-bfee-4989-aca8-799554a56d9f,
        isAssociated: boolean;
        statusDate: string;
        lastCompletedAt: string;
        status: string; // Synchronized

        error: {
          errors: any[];
        };
      };

      patient: {
        id: string; // afce4e30-d5ba-4815-a610-3e957c3e7f0b
        createdAt: string; // 2023-04-26T19:36:51+03:00
      };

      code: {
        text: string; // ""

        icpc2: {
          id: string; // cf38814b-d8e9-4aa9-a39d-5c4fdb86a2eb,
          code: string; // D98,
          name: string; //Холецистит / жовчнокам'яна хвороба,
          shortName: string; //Cholecystitis/cholelithiasis,
          inclusions: string; //жовчна коліка; холангіт; камені в жовчному міхурі,
          criteria: string; //холецистит: виявлення типової патології за допомогою ультразвуку або хірургічного втручання; або болючість при пальпації в правому верхньому квадранті і  жовтяниця або гарячка або камені в жовчевому в анамнезі; - жовчокам’яна хвороба: візуалізація або виявлення хірургічним втручанням каменів у жовчевому; - гостра жовчева коліка: гострі кольки в правому верхньому квадранті біль в животі без лихоманки; і жовтяниця або болючість в правому верхньому квадранті черевної порожнини, або камені в жовчевому в анамнезі,
          considerations: string; //локалізований біль у животі D06,
          groups: number[]; // [1, 2],
          icd10Am: any[];
          icd10: string[]; // [f4df3974-a3a4-48b2-ae1b-0fc89bde9738, f49b22d9-8084-4a65-8812-6298770b0ca5]
          isActive: boolean;
          forbiddenGroups: any[];
          isForbidden: boolean;
          isAssistantAllowed: boolean;
          isEvidenceRequired: boolean;
          protocolOfCare: [{
            id: string; // 1ac8960c-d299-4725-9e2f-285fd51e489e,
            displayName: string; // 009.025 ebm00220 Первинний склерозуючий холангіт [ICPC-2 D97 D98],
            link: string; //238.pdf
          }];
        };

        icd10Am: {
          id: string; // 34dbabaf-a799-454e-ba23-3e6e9453181e,
          code: string; //K81.1,
          name: string; //Хронічний холецистит,
          isActive: boolean;
          icpc2: any[];
          isMainDiagnosis: boolean;
          isAssistantAllowed: boolean;
          forbiddenGroups: any[];
          isForbidden: boolean;
          isMedCoordinatorAllowed: boolean;
        };
      };
    },
  };
}

export interface IEpisodeModel extends HydratedDocument<IEpisode> {
  _doc: IEpisode & { _id: Types.ObjectId };
}
