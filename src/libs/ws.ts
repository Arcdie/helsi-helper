import ws from 'ws';
import fs from 'fs';
import https from 'https';

import log from './winston';

import config from '../config';

let isActiveCheck = false;

const wsSettings: {
  port?: number;
  server?: https.Server,
} = {};

if (process.env.NODE_ENV !== 'production') {
  wsSettings.port = config.app.websocketPort;
} else {
  const pathToFolder = `/etc/letsencrypt/live/${config.app.url}`;

  wsSettings.server = https.createServer({
    cert: fs.readFileSync(`${pathToFolder}/fullchain.pem`, 'utf8'),
    key: fs.readFileSync(`${pathToFolder}/privkey.pem`, 'utf8'),
  }).listen(config.app.websocketPort);
}

const websocketConnection = new ws.Server(wsSettings);

/*
websocketConnection.on('connection', async (connection, req) => {
  const socketId = new Date().getTime().toString();
  connection.on('message', async message => {});
});
*/

websocketConnection.on('open', () => {
  log.info(`Websocket server running at :${config.app.websocketPort}`);
});

websocketConnection.on('error', () => {
  log.error(`Can not run websocket server`);
});

export const sendMessage = (data: { event: string; message: any; }) => {
  websocketConnection.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
};

export const getCheckFlag = () => isActiveCheck;

export const changeCheckFlag = (newValue: boolean) => {
  isActiveCheck = newValue;
};
