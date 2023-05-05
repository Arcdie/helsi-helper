import Episode from '../models/episode.model';

import { IEpisode } from '../interfaces/IEpisode';
import { IPatientModel } from '../interfaces/IPatient';

const createMany = async (patient: IPatientModel, episodes: IEpisode[]) =>
  Episode.insertMany(episodes.map(e => ({ ...e, patientId: patient._id })));

const findMany = async (filterOptions: any = {}) => Episode.find({ ...filterOptions }).exec();

const findManyByName = async (name: string, selectOptions: any = {}) => Episode.find({
  name: { $regex: name, $options: 'i' },
}, selectOptions).exec();

export {
  createMany,
  findMany,
  findManyByName,
};
