const wsConnectionPort = 3100;
const wsConnectionLink = location.host === 'localhost:3000' ? 'ws://localhost' : `wss://${location.hostname}`;

const wsClient = new WebSocket(`${wsConnectionLink}:${wsConnectionPort}`);

wsClient.onclose = event => {
  alert(`З'єднання розірвано, перезавантажте будь ласка сторінку`);
};

setInterval(() => {
  wsClient.send(JSON.stringify({ actionName: 'pong' }));
}, 1 * 60 * 1000); // 1 minute
