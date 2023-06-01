import fs from 'fs';

import EpisodeModel from '../models/episode.model';
import PatientModel from '../models/patient.model';
import DiagnosisModel from '../models/diagnosis.model';

export const saveMigration = async () => {
  console.log('Migration started');

  // const patients = await PatientModel.find({}).exec();
  // fs.writeFileSync('./patients.json', JSON.stringify(patients.map(p => ({
  //   ...p._doc,
  //   _id: p._id,
  // }))));

  // const diagnosesDocs = await DiagnosisModel.find({}).exec();
  // fs.writeFileSync('./diagnoses.json', JSON.stringify(diagnosesDocs.map(p => p._doc)));

  // const episodesDocs = await EpisodeModel.find({}).exec();
  // fs.writeFileSync('./episodes.json', JSON.stringify(episodesDocs.map(p => p._doc)));

  console.log('Migration finished');
};
