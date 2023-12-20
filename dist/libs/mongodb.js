"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const getCommonConnectLink = () => `mongodb://${config_1.default.mongodb.host}:${config_1.default.mongodb.port}/${config_1.default.mongodb.database}`;
const getClusterConnectLink = () => `mongodb+srv://${config_1.default.mongodb.username}:${config_1.default.mongodb.password}@${config_1.default.mongodb.host}/${config_1.default.mongodb.database}?retryWrites=true&w=majority`;
function default_1() {
    mongoose_1.default.set('strictQuery', false);
    return mongoose_1.default.connect(getClusterConnectLink(), config_1.default.mongodb.options);
}
exports.default = default_1;
