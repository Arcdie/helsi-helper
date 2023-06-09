"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBrowser = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const initBrowser = () => puppeteer_1.default.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
exports.initBrowser = initBrowser;
