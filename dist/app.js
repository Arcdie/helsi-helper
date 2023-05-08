"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("./libs/winston"));
const app_service_1 = require("./services/app.service");
(0, app_service_1.setEnvironment)();
const child_process_1 = require("child_process");
require("./libs/ws");
const mongodb_1 = __importDefault(require("./libs/mongodb"));
const express_1 = __importDefault(require("./libs/express"));
const config_1 = __importDefault(require("./config"));
(async () => {
    await (0, express_1.default)()
        .then(() => winston_1.default.info(`Express server running at ${config_1.default.app.host}:${config_1.default.app.port}`));
    await (0, mongodb_1.default)()
        .then(() => winston_1.default.info('Connection to mongoDB is successful'));
    (0, child_process_1.execSync)(`${process.platform === 'win32' ? 'start' : 'open'} http://${config_1.default.app.host}:${config_1.default.app.port}`);
})()
    .catch(err => {
    winston_1.default.error(err);
    process.exit(1);
});
process.on('uncaughtException', err => {
    winston_1.default.error(err.message);
    process.exit(1);
});
