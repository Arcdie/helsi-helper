"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueue = exports.getRandStr = exports.getRandomNumber = exports.getUnix = exports.getUniqueArray = exports.getEnv = exports.isDefined = exports.sleep = void 0;
const crypto_1 = __importDefault(require("crypto"));
const sleep = (ms) => new Promise(resolve => { setTimeout(resolve, ms); });
exports.sleep = sleep;
const isDefined = (argument) => argument !== null && argument !== undefined;
exports.isDefined = isDefined;
const getEnv = () => process.env.NODE_ENV || 'development';
exports.getEnv = getEnv;
const getUniqueArray = (arr) => [...new Set(arr)];
exports.getUniqueArray = getUniqueArray;
const getUnix = (targetDate) => {
    const time = (targetDate ? new Date(targetDate) : new Date()).getTime();
    return parseInt((time / 1000).toString(), 10);
};
exports.getUnix = getUnix;
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
exports.getRandomNumber = getRandomNumber;
const getRandStr = (limit) => crypto_1.default.randomBytes(20).toString('hex').substring(0, limit);
exports.getRandStr = getRandStr;
const getQueue = (arr, limiter) => {
    const queues = [];
    const lArr = arr.length;
    let targetIndex = 0;
    const numberIterations = Math.ceil(lArr / limiter);
    for (let i = 0; i < numberIterations; i += 1) {
        const newQueue = [];
        let conditionValue = limiter;
        if (i === (numberIterations - 1)) {
            conditionValue = lArr - targetIndex;
        }
        for (let j = 0; j < conditionValue; j += 1) {
            newQueue.push(arr[targetIndex]);
            targetIndex += 1;
        }
        queues.push(newQueue);
    }
    return queues;
};
exports.getQueue = getQueue;
