import path from 'path';
import dotenv from 'dotenv';

export const getEnvironment = () => process.env.NODE_ENV;

export const setEnvironment = () => {
  /*
  const fileEnv = process.env.PWD === `/home/ivalentyn/www/helsi-helper`
    ? 'production' : 'development';
  */

  const fileEnv = 'development';
  const envPath = path.join(__dirname, `../../.${fileEnv}.env`);
  dotenv.config({ path: envPath });
};
