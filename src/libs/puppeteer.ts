import puppeteer from 'puppeteer';

export const initBrowser = () => puppeteer.launch({
  headless: false,
});
