"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCheckFlag = exports.getCheckFlag = exports.sendMessage = void 0;
const ws_1 = __importDefault(require("ws"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const winston_1 = __importDefault(require("./winston"));
const config_1 = __importDefault(require("../config"));
let isActiveCheck = false;
const wsSettings = {};
if (process.env.NODE_ENV !== 'production') {
    wsSettings.port = config_1.default.app.websocketPort;
}
else {
    const pathToFolder = `/etc/letsencrypt/live/${config_1.default.app.url}`;
    wsSettings.server = https_1.default.createServer({
        cert: fs_1.default.readFileSync(`${pathToFolder}/fullchain.pem`, 'utf8'),
        key: fs_1.default.readFileSync(`${pathToFolder}/privkey.pem`, 'utf8'),
    }).listen(config_1.default.app.websocketPort);
}
const websocketConnection = new ws_1.default.Server(wsSettings);
websocketConnection.on('open', () => {
    winston_1.default.info(`Websocket server running at :${config_1.default.app.websocketPort}`);
});
websocketConnection.on('error', () => {
    winston_1.default.error(`Can not run websocket server`);
});
const sendMessage = (data) => {
    websocketConnection.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(data));
        }
    });
};
exports.sendMessage = sendMessage;
const getCheckFlag = () => isActiveCheck;
exports.getCheckFlag = getCheckFlag;
const changeCheckFlag = (newValue) => {
    isActiveCheck = newValue;
};
exports.changeCheckFlag = changeCheckFlag;
