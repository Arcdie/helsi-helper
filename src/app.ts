import log from './libs/winston';
import { setEnvironment } from './services/app.service';

setEnvironment();

import { execSync } from 'child_process';
import migrations from './migrations';
import './libs/ws';
import mongoDBConnector from './libs/mongodb';
import expressInitializer from './libs/express';

import config from './config';

(async () => {
  await expressInitializer()
    .then(() => log.info(`Express server running at ${config.app.host}:${config.app.port}`));

  await mongoDBConnector()
    .then(() => log.info('Connection to mongoDB is successful'));

  execSync(`${process.platform === 'win32' ? 'start' : 'open'} http://${config.app.host}:${config.app.port}`);

  // await migrations();
})()
  .catch(err => {
    log.error(err);
    process.exit(1);
  });

process.on('uncaughtException', err => {
  log.error(err.message);
  process.exit(1);
});
