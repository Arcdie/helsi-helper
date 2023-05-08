"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = exports.getCancelToken = void 0;
const axios_1 = __importDefault(require("axios"));
const getCancelToken = (ms) => {
    const CancelToken = axios_1.default.CancelToken;
    const source = CancelToken.source();
    setTimeout(() => source.cancel(), ms);
    return source.token;
};
exports.getCancelToken = getCancelToken;
const makeRequest = (method, url, settings = {}) => (0, axios_1.default)({
    method,
    url,
    ...settings,
});
exports.makeRequest = makeRequest;
