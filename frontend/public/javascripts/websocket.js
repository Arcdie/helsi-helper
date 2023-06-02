const wsConnectionPort = 3102;
const wsConnectionLink = location.host === 'localhost:3002' ? 'ws://localhost' : `wss://${location.hostname}`;

const wsClient = new WebSocket(`${wsConnectionLink}:${wsConnectionPort}`);

wsClient.onclose = event => {
  alert(`З'єднання розірвано, перезавантажте будь ласка сторінку`);
};

setInterval(() => {
  wsClient.send(JSON.stringify({ actionName: 'pong' }));
}, 1 * 60 * 1000); // 1 minute
