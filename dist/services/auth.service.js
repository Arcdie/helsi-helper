"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = void 0;
const config_1 = __importDefault(require("../config"));
const winston_1 = __importDefault(require("../libs/winston"));
const puppeteer_1 = require("../libs/puppeteer");
const helsiCookie = {
    value: '',
    expireAt: new Date().getTime(),
};
const getAuthUrl = () => 'https://id.helsi.pro/account/login';
const getCookieFromHelsi = async () => {
    const browser = await (0, puppeteer_1.initBrowser)();
    const page = await browser.newPage();
    await page.goto(getAuthUrl(), {
        timeout: 0,
        waitUntil: 'networkidle0',
    });
    const idEmail = '#email';
    const idPassword = '#usercreds';
    const classLoginButton = '.btn.pull-right.btn-info';
    await page.focus(idEmail);
    await page.keyboard.type(config_1.default.helsi.login.toString());
    await page.focus(idPassword);
    await page.keyboard.type(config_1.default.helsi.password.toString());
    await page.focus(classLoginButton);
    await page.$eval(`input${classLoginButton}`, btn => btn.click());
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.waitForSelector('#app', { visible: true, timeout: 0 });
    const client = await page.target().createCDPSession();
    const cookies = (await client.send('Network.getAllCookies')).cookies
        .filter(c => ['helsi.pro', '.helsi.pro'].includes(c.domain));
    await browser.close();
    const inactive = cookies.find(c => c.name === 'inactive');
    if (!inactive) {
        throw new Error('No inactive cookie');
    }
    return {
        value: cookies.map(c => `${c.name}=${c.value}`).join('; '),
        expireAt: Number(inactive.value),
    };
};
const getCookie = async (isForced = false) => {
    const timeNow = new Date().getTime();
    if (isForced || !helsiCookie.value || helsiCookie.expireAt <= timeNow) {
        const { value, expireAt } = await getCookieFromHelsi();
        helsiCookie.value = value;
        helsiCookie.expireAt = expireAt;
    }
    winston_1.default.info(`${helsiCookie.value} ${helsiCookie.expireAt}`);
    return helsiCookie.value;
};
exports.getCookie = getCookie;
