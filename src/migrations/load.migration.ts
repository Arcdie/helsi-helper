import fs from 'fs';

import EpisodeModel from '../models/episode.model';
import PatientModel from '../models/patient.model';
import DiagnosisModel from '../models/diagnosis.model';

export const loadMigration = async () => {
  console.log('Migration started');

  // const patients = JSON.parse(fs.readFileSync('./patients.json', 'utf-8'));
  // await PatientModel.insertMany(patients);

  // const diagnoses = JSON.parse(fs.readFileSync('./diagnoses.json', 'utf-8'));
  // await DiagnosisModel.insertMany(diagnoses);

  // const episodes = JSON.parse(fs.readFileSync('./episodes.json', 'utf-8'));
  // await EpisodeModel.insertMany(episodes);

  console.log('Migration finished');
};
