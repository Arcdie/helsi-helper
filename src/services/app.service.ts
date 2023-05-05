import path from 'path';
import dotenv from 'dotenv';

export const getEnvironment = () => process.env.NODE_ENV;

export const setEnvironment = () => {
  const env = getEnvironment();
  const envPath = path.join(__dirname, `../../.${env}.env`);
  dotenv.config({ path: envPath });
};
