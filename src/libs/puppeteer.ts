import puppeteer from 'puppeteer';

export const initBrowser = () => puppeteer.launch({
  headless: false,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
