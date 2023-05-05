import { IDiagnosis } from '../IDiagnosis';

export interface IGetDiagnosesResponse {
  data: IDiagnosis[],
  meta: {
    hasNext: boolean;
  }
}
