import DiagnosisModel from '../models/diagnosis.model';

export const diagnosisNameMigration = async () => {
  console.log('Migration started');
  const diagnosesDocs = await DiagnosisModel.find({}).exec();

  await Promise.all(diagnosesDocs.map(async doc => {
    doc.name = doc.service.achi.name;
    await doc.save();
  }));

  console.log('Migration finished');
};
