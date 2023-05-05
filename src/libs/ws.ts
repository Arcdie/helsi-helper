import ws from 'ws';

import log from './winston';

import config from '../config';

let isActiveCheck = false;

const websocketConnection = new ws.Server({
  port: config.app.websocketPort,
});

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
