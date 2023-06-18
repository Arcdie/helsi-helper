import puppeteer from 'puppeteer';

export const initBrowser = () => puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
