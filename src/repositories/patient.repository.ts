import { Types } from 'mongoose';

import Patient from '../models/patient.model';

import { IPatient } from '../interfaces/IPatient';

const createMany = async (patients: IPatient[]) => Patient.insertMany(patients);

const findManyBy = async (filterOptions: any = {}, selectOptions: any = {}) =>
  Patient.find(filterOptions, selectOptions).exec();

const findManyByIds = async (ids: string[], selectOptions: any = {}) =>
  Patient.find({ _id: { $in: ids } }, selectOptions).exec();

export {
  createMany,
  findManyBy,
  findManyByIds,
};
