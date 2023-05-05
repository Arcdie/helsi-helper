import { IPatient } from '../IPatient';

export interface IGetPatientsResponse {
  data: IPatient[],
  meta: {
    hasNext: boolean;
    totalCount: number;
  }
}
