"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnvironment = exports.getEnvironment = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const getEnvironment = () => process.env.NODE_ENV;
exports.getEnvironment = getEnvironment;
const setEnvironment = () => {
    const fileEnv = 'development';
    const envPath = path_1.default.join(__dirname, `../../.${fileEnv}.env`);
    dotenv_1.default.config({ path: envPath });
};
exports.setEnvironment = setEnvironment;
