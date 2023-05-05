import Diagnosis from '../models/diagnosis.model';

import { IDiagnosis } from '../interfaces/IDiagnosis';
import { IPatientModel } from '../interfaces/IPatient';

const createMany = async (patient: IPatientModel, diagnoses: IDiagnosis[]) =>
  Diagnosis.insertMany(diagnoses.map(e => ({
    ...e,
    name: e.service.achi.name,
    patientId: patient._id,
  })));

const findMany = async (filterOptions: any = {}) => Diagnosis.find({ ...filterOptions }).exec();

const findManyByName = async (name: string, selectOptions: any = {}) => Diagnosis.find({
  name: { $regex: name, $options: 'i' },
}, selectOptions).exec();

export {
  createMany,
  findMany,
  findManyByName,
};
