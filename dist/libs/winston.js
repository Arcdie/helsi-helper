"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const { Console } = winston_1.transports;
const { combine, colorize, label, timestamp, printf } = winston_1.format;
const createConsoleTransport = () => {
    const consoleFormat = winston_1.format.combine(colorize({ all: true }), label({ label: '[LOGGER]' }), timestamp({ format: 'YY-MM-DD HH:mm:ss.SSS' }), printf((info) => `${info.timestamp} ${info.level} : ${info.message}`));
    (0, winston_1.addColors)({
        info: 'bold blue',
        warn: 'italic yellow',
        error: 'bold red',
        debug: 'green',
    });
    return new Console({ format: combine(consoleFormat) });
};
winston_1.default.configure({
    transports: [createConsoleTransport()],
});
exports.default = winston_1.default;
